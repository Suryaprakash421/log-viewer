/**
 * Parse a log file content into structured log entries
 * @param {string} content - The content of the log file
 * @returns {Array} - Array of parsed log entries
 */
export const parseLogFile = (content) => {
  // Split the content by new lines
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  // Parse each line into a structured log entry
  return lines.map((line, index) => {
    try {
      // Format from screenshot: "2025-05-15 11:21:57 am D AlbumContactCheck contactNumber: +919514557625 - namedFacesData: []"

      // Match timestamp (date and time with am/pm)
      const timestampMatch = line.match(
        /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+(?:am|pm))/
      );
      const timestamp = timestampMatch ? timestampMatch[1] : "";

      // Remove timestamp from the line for further processing
      let remainingLine = line.substring(timestamp.length).trim();

      // Match log level (single character: D, I, W, E)
      const levelMatch = remainingLine.match(/^([DIWE])\s+/);

      if (!levelMatch) {
        // If the line doesn't match the expected format, return a basic structure
        return {
          id: index,
          timestamp: timestamp || "",
          level: "",
          tag: "",
          message: remainingLine || line,
          raw: line,
        };
      }

      // Extract level
      const level = levelMatch[1]; // D, I, W, E

      // Remove level from the line
      remainingLine = remainingLine.substring(levelMatch[0].length).trim();

      // Extract tag and message
      // The tag is the first word, and the message is everything after that
      const tagMessageMatch = remainingLine.match(/^(\S+)\s+(.*)/);

      if (!tagMessageMatch) {
        return {
          id: index,
          timestamp,
          level,
          tag: remainingLine, // If no space, the whole thing is the tag
          message: "",
          raw: line,
        };
      }

      const tag = tagMessageMatch[1];
      const message = tagMessageMatch[2];

      return {
        id: index,
        timestamp,
        level,
        tag,
        message,
        raw: line,
      };
    } catch (error) {
      console.error("Error parsing log line:", error, line);
      // If parsing fails, return a basic structure
      return {
        id: index,
        timestamp: "",
        level: "E",
        tag: "ParseError",
        message: line,
        raw: line,
      };
    }
  });
};

// We don't need this function anymore since the log format already has the level codes
// Keeping it as a stub for backward compatibility
function getLevelCode(level) {
  return level;
}

/**
 * Filter logs based on search criteria
 * @param {Array} logs - Array of log entries
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered log entries
 */
export const filterLogs = (logs, filters) => {
  const { level, tag, message } = filters;

  return logs
    .filter((log) => {
      // Filter by level if specified
      if (level && log.level !== level) {
        return false;
      }

      // Filter by tag if specified (multiple comma-separated tags supported)
      if (tag && log.tag) {
        // Split the tag filter by commas and trim whitespace
        const tagFilters = tag
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t !== "");

        // If there are tag filters and none of them match the log tag, filter out this log
        if (
          tagFilters.length > 0 &&
          !tagFilters.some((tagFilter) =>
            log.tag.toLowerCase().includes(tagFilter)
          )
        ) {
          return false;
        }
      }

      // Filter by message if specified (partial match)
      if (
        message &&
        log.message &&
        !log.message.toLowerCase().includes(message.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by timestamp in ascending order
      if (!a.timestamp || !b.timestamp) return 0;
      return new Date(a.timestamp) - new Date(b.timestamp);
    });
};
