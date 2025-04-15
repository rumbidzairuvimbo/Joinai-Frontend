'use client';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import BASE_URL from '../../api/api';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Define TypeScript interfaces
interface ExitPointsData {
  north: number;
  south: number;
  west: number;
  east: number;
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
  hoverOffset: number;
}

interface FormattedChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState<FormattedChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/api/visits/getexitpoints`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ExitPointsData = await response.json();

        const newData: FormattedChartData = {
          labels: ['North Exit', 'South Exit', 'West Exit', 'East Exit'],
          datasets: [
            {
              label: 'Visitor Exit Points',
              data: [data.north, data.south, data.west, data.east],
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 2,
              hoverOffset: 12,
            },
          ],
        };

        setChartData(newData);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load exit point data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 14,
            family: 'Inter, system-ui, sans-serif',
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Visitor Exit Points Distribution',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: 'Inter, system-ui, sans-serif',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (acc: number, data: number) => acc + data,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg p-6">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 text-red-800">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
      <div className="h-80">
        {chartData && <Pie data={chartData} options={options} />}
      </div>

      {chartData && (
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          {chartData.labels.map((label, index) => (
            <div
              key={label}
              className="flex items-center p-3 rounded-lg"
              style={{
                backgroundColor: `${chartData.datasets[0].backgroundColor[index]}20`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              ></div>
              <span className="font-medium">{label}:</span>
              <span className="ml-2 font-bold">
                {chartData.datasets[0].data[index]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieChart;
