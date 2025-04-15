'use client'
import React, { useState } from 'react'
import LineChart from '../LastChart/page'
import BarChart from '../First_Chart/page'
import PieChart from '../Dashboard/Secondchart/page'
import Histogram from '../Dashboard/Thirdchart/page'
import SideNav from '../SideNav/SideNav'
import AdminNavigation from '../SideNav/SideNav'
import DisplayPage from '../DisplayPage/page'
import HeaderNavBar from '../NavBar/page'
import RegisterComponent from '../Register/page'
import DefaultSettingsComponent from '../Settings/page'
import NotificationsPage from '../Notifications/page'

function HomePage() {
  const [currentView, setCurrentView] = useState('Dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DisplayPage />;
      
      case 'User':
        return <RegisterComponent/>;
      case 'Settings':
        return <DefaultSettingsComponent/>;

      case 'Nofications':
        return <NotificationsPage/>;
    

      default:
        return <BarChart />;
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <HeaderNavBar/>


    <div className="flex flex-1 overflow-hidden">

        <div className={`flex-none  transition-width duration-300 ease-in-out`}>
          <AdminNavigation
            onSelectPage={(view) => setCurrentView(view)} isSidebarOpen={false}  />
        </div>
        
        <div className="flex-1 bg-gray-100 p-6 overflow-auto mt-12 text-black">
          {renderContent()}
        </div>
      </div>
      

      
    </div>
  )
}

export default HomePage