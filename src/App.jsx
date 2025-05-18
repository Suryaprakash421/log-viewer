import { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import LogViewer from "./components/LogViewer";
import TailwindTest from "./components/TailwindTest";

function App() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogsLoaded = (parsedLogs) => {
    setLogs(parsedLogs);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
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
          <div className="flex space-x-2">
            <span className="bg-white/10 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
              <span className="text-blue-200">Version</span>{" "}
              <span className="text-white">1.0</span>
            </span>
            <span className="bg-white/10 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
              <span className="text-blue-200">React</span>{" "}
              <span className="text-white">19.1.0</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:px-6">
        <TailwindTest />

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
          <LogViewer logs={logs} />
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

      <footer className="bg-gray-800 text-gray-300 py-3 mt-8">
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
