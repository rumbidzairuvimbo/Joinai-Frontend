// pages/index.tsx
import React from 'react';

// Hardcoded data
const data = [
  { title: 'Total Users', value: 1500 },
  { title: 'Revenue', value: '$20,000' },
  { title: 'New Signups', value: 300 },
  { title: 'Messages', value: 120 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Dashboard Overview</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-medium text-gray-700">{item.title}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-4">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
