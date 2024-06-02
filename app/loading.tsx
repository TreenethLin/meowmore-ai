import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
    <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  </div>
  );
};

export default Loading;