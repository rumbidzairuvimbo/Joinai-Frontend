'use client';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { LineChart, RefreshCcw } from 'lucide-react';
import BASE_URL from '../api/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatsData {
  male: number;
  female: number;
  male_salary: number;
  female_salary: number;
}

const BarChart: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (): void => {
    setLoading(true);
    fetch(`${BASE_URL}/api/visits/getStats`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: StatsData) => {
        setStats(data);
        setLoading(false);
        setError(null);
      })
      .catch((err: Error) => {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg shadow-md">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button 
          onClick={fetchData}
          className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
        >
          <RefreshCcw size={16} className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  const displayStats: StatsData = stats || { 
    male: 45, 
    female: 55, 
    male_salary: 65000, 
    female_salary: 62000 
  };

  const data: ChartData<'bar'> = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Count',
        data: [displayStats.male, displayStats.female],
        backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
        // Move these properties to each dataset instead of the root options
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
      {
        label: 'Average Salary ($)',
        data: [displayStats.male_salary, displayStats.female_salary],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 159, 64, 0.8)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
        // Move these properties to each dataset instead of the root options
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: 'bold' as const
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataset.label === 'Average Salary ($)') {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
              } else {
                label += context.parsed.y;
              }
            }
            return label;
          }
        }
      },
      title: {
        display: true,
        text: 'Gender Distribution & Salary Comparison',
        font: {
          family: 'Inter, sans-serif',
          size: 18,
          weight: 'bold' as const
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#333'
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            weight: 'bold' as const
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          },
          callback: function(value) {
            // Fix the number type checking issue
            const numValue = Number(value);
            if (!isNaN(numValue) && numValue >= 1000) {
              return (numValue / 1000) + 'k';
            }
            return value;
          }
        }
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    },
    layout: {
      padding: 16
    },
  };

  const formatSalary = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <LineChart className="mr-2 text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Gender Statistics Dashboard</h2>
        </div>
        <button 
          onClick={fetchData} 
          className="flex items-center px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors"
        >
          <RefreshCcw size={14} className="mr-1" />
          Refresh
        </button>
      </div>
      
      <div className="h-96 mb-6">
        <Bar data={data} options={options} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm uppercase font-bold text-blue-700 mb-1">Gender Distribution</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-600">Male: <span className="font-bold text-gray-800">{displayStats.male}</span></p>
              <p className="text-sm text-gray-600">Female: <span className="font-bold text-gray-800">{displayStats.female}</span></p>
            </div>
            <p className="text-lg font-bold text-gray-800">Total: {displayStats.male + displayStats.female}</p>
          </div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4">
          <h3 className="text-sm uppercase font-bold text-pink-700 mb-1">Salary Comparison</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-600">Male: <span className="font-bold text-gray-800">{formatSalary(displayStats.male_salary)}</span></p>
              <p className="text-sm text-gray-600">Female: <span className="font-bold text-gray-800">{formatSalary(displayStats.female_salary)}</span></p>
            </div>
            <p className="text-lg font-bold text-gray-800">
              Diff: {formatSalary(Math.abs(displayStats.male_salary - displayStats.female_salary))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;