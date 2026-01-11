import React from 'react';

const AnimatedAsset = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-32 h-32 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="mt-4 text-lg font-semibold text-blue-700 animate-pulse">
        AssetVerse in Motion
      </div>
    </div>
  );
};

export default AnimatedAsset;