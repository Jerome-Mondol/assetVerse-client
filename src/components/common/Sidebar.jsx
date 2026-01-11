import React from 'react';
import { Link, useLocation } from 'react-router';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assets-list', label: 'Asset List' },
    { path: '/add-asset', label: 'Add Asset' },
    { path: '/all-requests', label: 'All Requests' },
    { path: '/employees', label: 'Employees' },
    { path: '/upgrade-package', label: 'Upgrade Package' },
    { path: '/dashboard/profile', label: 'Profile' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">HR Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
