import { useState, useRef } from "react";
import { parseLogFile } from "../utils/logParser";

const FileUpload = ({ onLogsLoaded, setIsLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      alert("Please upload a .txt file");
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const parsedLogs = parseLogFile(content);
        onLogsLoaded(parsedLogs);
      } catch (error) {
        console.error("Error parsing log file:", error);
        alert("Error parsing log file. Please check the file format.");
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      console.error("Error reading file");
      alert("Error reading file. Please try again.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-1.5 rounded-lg mr-2">
          <svg
            className="h-4 w-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Upload Log File</h2>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50/80 shadow-sm"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleChange}
          className="hidden"
        />

        <div className="p-4 max-w-md mx-auto">
          <div className="bg-blue-50 w-5 h-4 mx-auto rounded-full flex items-center justify-center mb-3 border border-blue-100">
            <svg
              className="h-5 w-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <p className="text-base text-gray-700 mb-2">
            Drag and drop your log file here
          </p>

          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150 my-2"
            onClick={onButtonClick}
          >
            <svg
              className="h-3.5 w-3.5 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            Browse Files
          </button>

          <p className="mt-2 text-sm text-gray-500">
            Supports .txt log files with standard log format
          </p>
        </div>

        {fileName && (
          <div className="mt-4 py-3 px-4 bg-green-50 rounded-lg border border-green-200 inline-flex items-center">
            <svg
              className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-green-700 text-sm truncate max-w-xs">
              {fileName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
