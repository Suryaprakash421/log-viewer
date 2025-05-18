/**
 * Constants for localStorage keys
 */
const STORAGE_KEYS = {
  LOGS: 'logviewer_logs',
  FILTERS: 'logviewer_filters'
};

/**
 * Save logs to localStorage
 * @param {Array} logs - Array of log entries to save
 */
export const saveLogs = (logs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving logs to localStorage:', error);
  }
};

/**
 * Load logs from localStorage
 * @returns {Array|null} - Array of log entries or null if not found
 */
export const loadLogs = () => {
  try {
    const savedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    return savedLogs ? JSON.parse(savedLogs) : null;
  } catch (error) {
    console.error('Error loading logs from localStorage:', error);
    return null;
  }
};

/**
 * Save filters to localStorage
 * @param {Object} filters - Filter criteria to save
 */
export const saveFilters = (filters) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  } catch (error) {
    console.error('Error saving filters to localStorage:', error);
  }
};

/**
 * Load filters from localStorage
 * @returns {Object|null} - Filter criteria or null if not found
 */
export const loadFilters = () => {
  try {
    const savedFilters = localStorage.getItem(STORAGE_KEYS.FILTERS);
    return savedFilters ? JSON.parse(savedFilters) : null;
  } catch (error) {
    console.error('Error loading filters from localStorage:', error);
    return null;
  }
};

/**
 * Clear all stored data from localStorage
 */
export const clearStoredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.FILTERS);
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
  }
};
