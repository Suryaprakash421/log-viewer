/**
 * Parse a log file content into structured log entries
 * @param {string} content - The content of the log file
 * @returns {Array} - Array of parsed log entries
 */
export const parseLogFile = (content) => {
  // Split the content by new lines
  const lines = content.split('\n').filter(line => line.trim() !== '');
  
  // Parse each line into a structured log entry
  return lines.map((line, index) => {
    try {
      // Example log format: "2023-05-18 14:30:45.123 I/PhotoObserverToggle: Message content here"
      // Extract timestamp, level, tag, and message
      
      // Match timestamp (date and time)
      const timestampMatch = line.match(/^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?)/);
      const timestamp = timestampMatch ? timestampMatch[1] : '';
      
      // Remove timestamp from the line for further processing
      let remainingLine = line.substring(timestamp.length).trim();
      
      // Match level (single character followed by /)
      const levelMatch = remainingLine.match(/^([IDEW])\/([^:]+):/);
      
      if (!levelMatch) {
        // If the line doesn't match the expected format, return a basic structure
        return {
          id: index,
          timestamp: timestamp || 'Unknown',
          level: 'U', // Unknown level
          tag: 'Unknown',
          message: remainingLine || line,
          raw: line
        };
      }
      
      const level = levelMatch[1]; // I, D, E, W
      const tag = levelMatch[2];
      
      // Remove level and tag from the line to get the message
      const message = remainingLine.substring(levelMatch[0].length).trim();
      
      return {
        id: index,
        timestamp,
        level,
        tag,
        message,
        raw: line
      };
    } catch (error) {
      // If parsing fails, return a basic structure
      return {
        id: index,
        timestamp: 'Error',
        level: 'E',
        tag: 'ParseError',
        message: line,
        raw: line
      };
    }
  });
};

/**
 * Filter logs based on search criteria
 * @param {Array} logs - Array of log entries
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered log entries
 */
export const filterLogs = (logs, filters) => {
  const { level, tag, message } = filters;
  
  return logs.filter(log => {
    // Filter by level if specified
    if (level && log.level !== level) {
      return false;
    }
    
    // Filter by tag if specified (partial match)
    if (tag && !log.tag.toLowerCase().includes(tag.toLowerCase())) {
      return false;
    }
    
    // Filter by message if specified (partial match)
    if (message && !log.message.toLowerCase().includes(message.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by timestamp in ascending order
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
};
