import React from 'react';
import Sidebar from '../../components/common/Sidebar';

const HRLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default HRLayout;
