import React from 'react'
import LineChart from '../LastChart/page'
import BarChart from '../First_Chart/page'
import PieChart from '../Dashboard/Secondchart/page'
import Histogram from '../Dashboard/Thirdchart/page'

const DisplayPage = () => {
  return (
    <div>

<div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Joina City Analysis Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of key metrics and performance indicators</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
          <LineChart />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comparative Data</h2>
          <BarChart />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Distribution Breakdown</h2>
          <PieChart />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Frequency Analysis</h2>
          <Histogram />
        </div>
      </div>
      
    </div>
  )
}

export default DisplayPage
