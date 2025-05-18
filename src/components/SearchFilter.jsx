import React from "react";

const SearchFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      level: "",
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
          <label
            htmlFor="level"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Log Level
          </label>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1.5 bg-white text-sm"
          >
            <option value="">All Levels</option>
            <option value="I" className="text-blue-700">
              Info (I)
            </option>
            <option value="D" className="text-gray-700">
              Debug (D)
            </option>
            <option value="W" className="text-yellow-700">
              Warning (W)
            </option>
            <option value="E" className="text-red-700">
              Error (E)
            </option>
          </select>
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
            placeholder="Filter by multiple tags (e.g. AlbumContactCheck, HomeAlbumAdapter)"
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
            placeholder="Filter by message content (e.g. contactNumber, namedFacesData)"
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
              {filters.level && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                  Level: {filters.level}
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
