import { useState, useEffect, useRef } from "react";
import LogEntry from "./LogEntry";

const LogList = ({ logs, sortOrder, setSortOrder }) => {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [page, setPage] = useState(1);
  const logsPerPage = 100;
  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize with first batch of logs
  useEffect(() => {
    if (logs.length > 0) {
      setDisplayedLogs(logs.slice(0, logsPerPage));
      setPage(1);
    } else {
      setDisplayedLogs([]);
    }
  }, [logs]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedLogs.length < logs.length) {
          // Load more logs when the loader element is visible
          loadMoreLogs();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [displayedLogs, logs]);

  const loadMoreLogs = () => {
    const nextPage = page + 1;
    const newLogs = logs.slice(0, nextPage * logsPerPage);

    setDisplayedLogs(newLogs);
    setPage(nextPage);
  };

  // Scroll to top function
  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (logs.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-md border border-gray-200 text-center">
        <svg
          className="h-6 w-6 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500 text-lg">
          No logs match your filter criteria
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div className="flex items-center">
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Log Entries
            </h2>

            {/* Sort Order Toggle */}
            <div className="flex items-center ml-4 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-gray-600 mr-2">Sort:</span>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="flex items-center rounded text-blue-700 text-sm font-medium transition-colors duration-150"
              >
                {sortOrder === "asc" ? (
                  <>
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                    Oldest First
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                    Newest First
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Showing {displayedLogs.length} of {logs.length} logs
          </div>
        </div>

        <div
          ref={containerRef}
          className="max-h-[65vh] overflow-y-auto pr-2 rounded border border-gray-200 bg-gray-50"
        >
          <div className="p-3 space-y-1">
            {displayedLogs.map((log, index) => (
              <LogEntry key={log.id} log={log} serialNumber={index + 1} />
            ))}

            {/* Loader element for infinite scrolling */}
            {displayedLogs.length < logs.length && (
              <div ref={loaderRef} className="py-6 text-center">
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Loading more logs...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {displayedLogs.length > 20 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
          aria-label="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default LogList;
