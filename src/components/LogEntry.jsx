import React from "react";

const LogEntry = ({ log, serialNumber }) => {
  // Determine background color based on log level
  const getBgColor = () => {
    switch (log.level) {
      case "E": // Error
        return "bg-red-50 border-red-200";
      case "W": // Warning
        return "bg-yellow-50 border-yellow-200";
      case "I": // Info
        return "bg-blue-50 border-blue-200";
      case "D": // Debug
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  // Determine text color based on log level
  const getTextColor = () => {
    switch (log.level) {
      case "E": // Error
        return "text-red-800";
      case "W": // Warning
        return "text-yellow-800";
      case "I": // Info
        return "text-blue-800";
      case "D": // Debug
        return "text-green-800";
      default:
        return "text-gray-800";
    }
  };

  // Determine badge color based on log level
  const getBadgeColor = () => {
    switch (log.level) {
      case "E": // Error
        return "bg-red-200 text-red-800";
      case "W": // Warning
        return "bg-yellow-200 text-yellow-800";
      case "I": // Info
        return "bg-blue-200 text-blue-800";
      case "D": // Debug
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Get level name
  const getLevelName = () => {
    switch (log.level) {
      case "E":
        return "ERROR";
      case "W":
        return "WARN";
      case "I":
        return "INFO";
      case "D":
        return "DEBUG";
      case "":
        return ""; // Don't show anything if level is empty
      default:
        return log.level;
    }
  };

  return (
    <div
      className={`p-3 border rounded mb-2 transition-all duration-150 hover:shadow-sm ${getBgColor()}`}
    >
      <div className="flex flex-wrap items-start gap-2 mb-2">
        {/* Serial Number */}
        <div className="inline-flex items-center text-xs font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded-md border border-gray-300">
          <svg
            className="h-3 w-3 mr-1 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          {serialNumber}
        </div>
        <div className="inline-flex items-center text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
          <svg
            className="h-3 w-3 mr-1 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {log.timestamp}
        </div>

        <div
          className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-md ${getBadgeColor()}`}
        >
          <svg
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {log.level === "E" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            )}
            {log.level === "W" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            )}
            {log.level === "I" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
            {log.level === "D" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            )}
          </svg>
          {getLevelName()}
        </div>

        <div className="inline-flex items-center text-sm font-medium bg-gray-100 px-2 py-1 rounded-md">
          <svg
            className="h-3 w-3 mr-1 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          {log.tag}
        </div>
      </div>

      <div
        className={`text-sm font-mono ${getTextColor()} whitespace-pre-wrap break-words p-2 bg-white/80 rounded border border-gray-100 hover:border-gray-200`}
      >
        <div className="flex items-start">
          <svg
            className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{log.message}</span>
        </div>
      </div>
    </div>
  );
};

export default LogEntry;
