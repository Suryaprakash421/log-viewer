import React from 'react';

const TailwindTest = () => {
  return (
    <div className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Tailwind Test Component</h2>
      <p className="text-sm">
        If you can see this with blue background and white text, Tailwind CSS is working!
      </p>
      <div className="mt-4 flex space-x-2">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Green Button
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Red Button
        </button>
      </div>
    </div>
  );
};

export default TailwindTest;
