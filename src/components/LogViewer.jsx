import { useMemo } from "react";
import SearchFilter from "./SearchFilter";
import LogList from "./LogList";
import { filterLogs } from "../utils/logParser";

const LogViewer = ({ logs, filters, setFilters }) => {
  // Apply filters to logs
  const filteredLogs = useMemo(() => {
    return filterLogs(logs, filters);
  }, [logs, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = logs.length;
    const filtered = filteredLogs.length;

    // Count logs by level
    const levelCounts = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    // Get unique tags
    const uniqueTags = new Set(logs.map((log) => log.tag)).size;

    return {
      total,
      filtered,
      levelCounts,
      uniqueTags,
    };
  }, [logs, filteredLogs]);

  return (
    <div className="mt-6">
      {/* Stats Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-blue-100 p-1.5 rounded-lg mr-2">
              <svg
                className="h-3.5 w-3.5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Log Statistics
            </h2>
          </div>

          <div className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600 flex items-center">
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
            <span>{stats.uniqueTags} unique tags found</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded border border-gray-200 text-center transition-all hover:shadow-sm group hover:border-gray-300">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 group-hover:text-gray-700">
              Total Logs
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.total.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded border border-gray-200 text-center transition-all hover:shadow-sm group hover:border-gray-300">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 group-hover:text-gray-700">
              Filtered
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.filtered.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-700">
              {Math.round((stats.filtered / stats.total) * 100) || 0}% of total
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 rounded border border-gray-300 text-center transition-all hover:shadow-sm group hover:border-gray-400">
            <div className="text-xs uppercase tracking-wider text-gray-700 mb-1 group-hover:text-gray-800">
              Debug (D)
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-600 group-hover:text-gray-700">
                {(stats.levelCounts["D"] || 0).toLocaleString()}
              </div>
              <div className="ml-2 bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                {Math.round(
                  ((stats.levelCounts["D"] || 0) / stats.total) * 100
                ) || 0}
                %
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 rounded border border-blue-200 text-center transition-all hover:shadow-sm group hover:border-blue-300">
            <div className="text-xs uppercase tracking-wider text-blue-700 mb-1 group-hover:text-blue-800">
              Info (I)
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">
                {(stats.levelCounts["I"] || 0).toLocaleString()}
              </div>
              <div className="ml-2 bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                {Math.round(
                  ((stats.levelCounts["I"] || 0) / stats.total) * 100
                ) || 0}
                %
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-3 rounded border border-yellow-200 text-center transition-all hover:shadow-sm group hover:border-yellow-300">
            <div className="text-xs uppercase tracking-wider text-yellow-700 mb-1 group-hover:text-yellow-800">
              Warnings (W)
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700">
                {(stats.levelCounts["W"] || 0).toLocaleString()}
              </div>
              <div className="ml-2 bg-yellow-200 text-yellow-800 text-xs px-1.5 py-0.5 rounded-full">
                {Math.round(
                  ((stats.levelCounts["W"] || 0) / stats.total) * 100
                ) || 0}
                %
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-3 rounded border border-red-200 text-center transition-all hover:shadow-sm group hover:border-red-300">
            <div className="text-xs uppercase tracking-wider text-red-700 mb-1 group-hover:text-red-800">
              Errors (E)
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-red-600 group-hover:text-red-700">
                {(stats.levelCounts["E"] || 0).toLocaleString()}
              </div>
              <div className="ml-2 bg-red-200 text-red-800 text-xs px-1.5 py-0.5 rounded-full">
                {Math.round(
                  ((stats.levelCounts["E"] || 0) / stats.total) * 100
                ) || 0}
                %
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter filters={filters} setFilters={setFilters} />

      {/* Log List */}
      <LogList logs={filteredLogs} />
    </div>
  );
};

export default LogViewer;
