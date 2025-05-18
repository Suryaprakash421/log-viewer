import { useState, useEffect } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import LogViewer from "./components/LogViewer";
import {
  saveLogs,
  loadLogs,
  saveFilters,
  loadFilters,
  saveSortOrder,
  loadSortOrder,
  clearStoredData,
} from "./utils/localStorage";

function App() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending order
  const [filters, setFilters] = useState({
    level: [],
    tag: "",
    message: "",
  });

  // Load logs, filters, and sort order from localStorage on component mount
  useEffect(() => {
    const savedLogs = loadLogs();
    if (savedLogs && savedLogs.length > 0) {
      setLogs(savedLogs);
    }

    const savedFilters = loadFilters();
    if (savedFilters) {
      setFilters(savedFilters);
    }

    const savedSortOrder = loadSortOrder();
    setSortOrder(savedSortOrder);
  }, []);

  // Save logs to localStorage when they change
  useEffect(() => {
    if (logs.length > 0) {
      saveLogs(logs);
    }
  }, [logs]);

  // Save filters to localStorage when they change
  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  // Save sort order to localStorage when it changes
  useEffect(() => {
    saveSortOrder(sortOrder);
  }, [sortOrder]);

  const handleLogsLoaded = (parsedLogs) => {
    setLogs(parsedLogs);
  };

  const handleClearLogs = () => {
    setLogs([]);
    setFilters({
      level: [],
      tag: "",
      message: "",
    });
    clearStoredData();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <header className="bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-800 text-white p-5 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="bg-white/10 p-1.5 rounded-lg mr-3 backdrop-blur-sm">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Log Viewer</h1>
              <p className="text-xs text-blue-200 font-bold">
                Analyze and filter application logs
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:px-6 flex-grow">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 transition-all hover:shadow-md">
          <FileUpload
            onLogsLoaded={handleLogsLoaded}
            setIsLoading={setIsLoading}
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center mt-6 p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Processing log file...</p>
          </div>
        ) : logs.length > 0 ? (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClearLogs}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors duration-150"
              >
                <svg
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Logs
              </button>
            </div>
            <LogViewer
              logs={logs}
              filters={filters}
              setFilters={setFilters}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        ) : (
          <div className="mt-6 text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg
              className="h-8 w-8 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 text-lg">
              Upload a log file to get started
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Supported format: .txt log files
            </p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 py-3 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-2 sm:mb-0">
              <svg
                className="h-3.5 w-3.5 mr-1.5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-medium">Log Viewer</span>
            </div>

            <div className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Log Viewer Application
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
