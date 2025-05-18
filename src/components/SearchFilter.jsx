import React from "react";

const SearchFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLevelChange = (level) => {
    setFilters((prev) => {
      // Check if the level is already in the array
      const isSelected = prev.level.includes(level);

      // If it's selected, remove it; otherwise, add it
      const newLevels = isSelected
        ? prev.level.filter((l) => l !== level)
        : [...prev.level, level];

      return {
        ...prev,
        level: newLevels,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      level: [],
      tag: "",
      message: "",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <svg
            className="h-3.5 w-3.5 mr-1.5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter Logs
        </h2>

        {/* Clear Filters Button */}
        <button
          type="button"
          onClick={clearFilters}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors duration-150 flex items-center text-xs font-medium"
        >
          <svg
            className="h-3.5 w-3.5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Level Filter */}
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <svg
              className="h-3.5 w-3.5 mr-1 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Log Level
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Debug Checkbox */}
            <button
              type="button"
              onClick={() => handleLevelChange("D")}
              className={`flex items-center px-2 py-1 rounded cursor-pointer border focus:outline-none focus:ring-1 focus:ring-green-500 ${
                filters.level.includes("D")
                  ? "bg-green-100 border-green-300 text-green-800"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`h-3.5 w-3.5 mr-1.5 ${
                  filters.level.includes("D")
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {filters.level.includes("D") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6h12v12H6z"
                  />
                )}
              </svg>
              <span className="text-xs font-medium">Debug (D)</span>
            </button>

            {/* Info Checkbox */}
            <button
              type="button"
              onClick={() => handleLevelChange("I")}
              className={`flex items-center px-2 py-1 rounded cursor-pointer border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                filters.level.includes("I")
                  ? "bg-blue-100 border-blue-300 text-blue-800"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`h-3.5 w-3.5 mr-1.5 ${
                  filters.level.includes("I")
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {filters.level.includes("I") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6h12v12H6z"
                  />
                )}
              </svg>
              <span className="text-xs font-medium">Info (I)</span>
            </button>

            {/* Warning Checkbox */}
            <button
              type="button"
              onClick={() => handleLevelChange("W")}
              className={`flex items-center px-2 py-1 rounded cursor-pointer border focus:outline-none focus:ring-1 focus:ring-yellow-500 ${
                filters.level.includes("W")
                  ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`h-3.5 w-3.5 mr-1.5 ${
                  filters.level.includes("W")
                    ? "text-yellow-600"
                    : "text-gray-400"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {filters.level.includes("W") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6h12v12H6z"
                  />
                )}
              </svg>
              <span className="text-xs font-medium">Warning (W)</span>
            </button>

            {/* Error Checkbox */}
            <button
              type="button"
              onClick={() => handleLevelChange("E")}
              className={`flex items-center px-2 py-1 rounded cursor-pointer border focus:outline-none focus:ring-1 focus:ring-red-500 ${
                filters.level.includes("E")
                  ? "bg-red-100 border-red-300 text-red-800"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`h-3.5 w-3.5 mr-1.5 ${
                  filters.level.includes("E") ? "text-red-600" : "text-gray-400"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {filters.level.includes("E") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6h12v12H6z"
                  />
                )}
              </svg>
              <span className="text-xs font-medium">Error (E)</span>
            </button>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
          >
            <svg
              className="h-3.5 w-3.5 mr-1 text-blue-500"
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
            Tags
            <span className="ml-1 text-xs text-blue-600 font-normal">
              (comma-separated)
            </span>
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={filters.tag}
            onChange={handleChange}
            placeholder="Filter by multiple tags"
            className="w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1.5 bg-white text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter multiple tags separated by commas to match any of them
          </p>
        </div>

        {/* Message Filter */}
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
          >
            <svg
              className="h-3.5 w-3.5 mr-1 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={filters.message}
            onChange={handleChange}
            placeholder="Filter by message content"
            className="w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1.5 bg-white text-sm"
          />
        </div>
      </div>

      {Object.values(filters).some((f) => f !== "") && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
          <div className="flex items-start">
            <svg
              className="h-4 w-4 mr-2 text-blue-500 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <span className="font-medium">Active filters:</span>{" "}
              {filters.level.length > 0 && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                  Levels: {filters.level.join(", ")}
                </span>
              )}
              {filters.tag && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                  Tags: {filters.tag}
                </span>
              )}
              {filters.message && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                  Message: {filters.message}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
