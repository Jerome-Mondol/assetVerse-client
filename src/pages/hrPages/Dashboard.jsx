import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { getAllAssets } from '../../api/assetAPI';
import { getAllRequestOfAHR } from '../../api/requestAPI';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalRequests: 0,
    pendingRequests: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assets = await getAllAssets();
        const requests = await getAllRequestOfAHR(user.email);

        setStats({
          totalAssets: assets.length,
          totalRequests: requests.length,
          pendingRequests: requests.filter(r => r.status === 'pending').length,
        });

        // Sample chart data - assets by category
        const categoryCount = assets.reduce((acc, asset) => {
          acc[asset.category] = (acc[asset.category] || 0) + 1;
          return acc;
        }, {});
        const barData = Object.entries(categoryCount).map(([category, count]) => ({ category, count }));
        setChartData(barData);

        // Pie chart for asset status
        const statusCount = assets.reduce((acc, asset) => {
          acc[asset.status] = (acc[acc.status] || 0) + 1;
          return acc;
        }, {});
        const pie = Object.entries(statusCount).map(([status, count]) => ({ name: status, value: count }));
        setPieData(pie);

        // Recent requests
        setRecentRequests(requests.slice(-5).reverse());
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Assets</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalAssets}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Requests</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalRequests}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Requests</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingRequests}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Assets by Category</h3>
          <BarChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Asset Status Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Requests</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-gray-900 dark:text-white">Employee</th>
              <th className="px-4 py-2 text-gray-900 dark:text-white">Asset</th>
              <th className="px-4 py-2 text-gray-900 dark:text-white">Status</th>
              <th className="px-4 py-2 text-gray-900 dark:text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((req) => (
              <tr key={req._id} className="border-t border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 text-gray-900 dark:text-white">{req.employeeEmail}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-white">{req.assetName}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-white">{req.status}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-white">{new Date(req.requestDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
