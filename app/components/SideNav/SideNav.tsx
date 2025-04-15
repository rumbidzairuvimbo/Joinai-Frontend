import React from 'react';
import { BsKanban } from "react-icons/bs";
import { FaTicketAlt, FaUsers, FaChartBar, FaClipboardList, FaBell, FaUserShield } from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";

interface SideNavProps {
  isSidebarOpen: boolean;
  onSelectPage: (page: string) => void; // Callback to parent
}

const AdminNavigation: React.FC<SideNavProps> = ({ isSidebarOpen, onSelectPage }) => {
  const navItems = [
    { icon: <MdDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard' },
    
    { icon: <FaUserShield className="w-5 h-5" />, label: 'User', href: '/schedule' },
    { icon: <FaBell className="w-5 h-5" />, label: 'Nofications', href: '/notifications' },
    { icon: <MdSettings className="w-5 h-5" />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className={`bg-gray-800 h-full ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}>
      <nav className="h-full">
        <ul className="pt-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onSelectPage(item.label)}
                className={`flex items-center w-full px-4 py-3 hover:bg-gray-700 transition-colors duration-200 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className="text-gray-400">{item.icon}</div>
                {isSidebarOpen && (
                  <span className="ml-3 text-gray-300 whitespace-nowrap overflow-hidden">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavigation;