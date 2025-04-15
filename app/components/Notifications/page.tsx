import React from 'react';

const NotificationsPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">Notifications</h1>
        <p className="text-gray-500">You have no notifications at the moment.</p>
      </div>
    </div>
  );
};

export default NotificationsPage;
