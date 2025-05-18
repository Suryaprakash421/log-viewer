/**
 * Constants for localStorage keys
 */
const STORAGE_KEYS = {
  LOGS: "logviewer_logs",
  FILTERS: "logviewer_filters",
};

/**
 * Check if localStorage is available
 * @returns {boolean} - Whether localStorage is available
 */
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test_storage__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Memory fallback when localStorage is not available
const memoryStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  },
};

// Use localStorage if available, otherwise use memory storage
const storage = isLocalStorageAvailable() ? localStorage : memoryStorage;

/**
 * Save logs to storage
 * @param {Array} logs - Array of log entries to save
 */
export const saveLogs = (logs) => {
  try {
    // Limit the size of logs to prevent storage quota errors
    const logsToSave = logs.slice(0, 10000); // Limit to 10,000 logs
    storage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logsToSave));
  } catch (error) {
    console.error("Error saving logs to storage:", error);
    // If JSON stringify fails, try saving a smaller subset
    try {
      const reducedLogs = logs.slice(0, 1000); // Try with only 1,000 logs
      storage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(reducedLogs));
    } catch (fallbackError) {
      console.error("Fallback error saving logs:", fallbackError);
    }
  }
};

/**
 * Load logs from storage
 * @returns {Array|null} - Array of log entries or null if not found
 */
export const loadLogs = () => {
  try {
    const savedLogs = storage.getItem(STORAGE_KEYS.LOGS);
    return savedLogs ? JSON.parse(savedLogs) : null;
  } catch (error) {
    console.error("Error loading logs from storage:", error);
    return null;
  }
};

/**
 * Save filters to storage
 * @param {Object} filters - Filter criteria to save
 */
export const saveFilters = (filters) => {
  try {
    storage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  } catch (error) {
    console.error("Error saving filters to storage:", error);
  }
};

/**
 * Load filters from storage
 * @returns {Object|null} - Filter criteria or null if not found
 */
export const loadFilters = () => {
  try {
    const savedFilters = storage.getItem(STORAGE_KEYS.FILTERS);
    return savedFilters ? JSON.parse(savedFilters) : null;
  } catch (error) {
    console.error("Error loading filters from storage:", error);
    return null;
  }
};

/**
 * Clear all stored data from storage
 */
export const clearStoredData = () => {
  try {
    storage.removeItem(STORAGE_KEYS.LOGS);
    storage.removeItem(STORAGE_KEYS.FILTERS);
  } catch (error) {
    console.error("Error clearing data from storage:", error);
  }
};
