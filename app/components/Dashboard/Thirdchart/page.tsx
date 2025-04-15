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
import BASE_URL from '../../api/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define your chart data interface
interface VisitDurationData {
  firstrange: number;
  secondrange: number;
  thirdrange: number;
  forthrange: number;
  fifthrange: number;
  sixthrange: number;
  seventhrange: number;
  lastrange: number;
}

type ChartDataType = ChartData<'bar', number[], string>;

const Histogram = () => {
  const [chartData, setChartData] = useState<ChartDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/visits/getvisitduration`)
      .then((res) => res.json())
      .then((data: VisitDurationData) => {
        const labels = [
          '0-20', '21-40', '41-60', '61-80',
          '81-100', '101-120', '121-140', '141-160',
        ];

        const values = [
          data.firstrange,
          data.secondrange,
          data.thirdrange,
          data.forthrange,
          data.fifthrange,
          data.sixthrange,
          data.seventhrange,
          data.lastrange,
        ];

        // Generate gradient colors from blue to purple
        const backgroundColors = [
          'rgba(53, 162, 235, 0.8)',
          'rgba(75, 138, 220, 0.8)',
          'rgba(94, 114, 206, 0.8)', 
          'rgba(113, 90, 192, 0.8)',
          'rgba(132, 66, 177, 0.8)',
          'rgba(151, 42, 163, 0.8)',
          'rgba(170, 18, 149, 0.8)',
          'rgba(187, 0, 134, 0.8)',
        ];

        // Border colors slightly darker than background
        const borderColors = [
          'rgba(53, 162, 235, 1)',
          'rgba(75, 138, 220, 1)',
          'rgba(94, 114, 206, 1)', 
          'rgba(113, 90, 192, 1)',
          'rgba(132, 66, 177, 1)',
          'rgba(151, 42, 163, 1)',
          'rgba(170, 18, 149, 1)',
          'rgba(187, 0, 134, 1)',
        ];

        setChartData({
          labels,
          datasets: [
            {
              label: 'Visit Duration',
              data: values,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
              borderRadius: 6,
              borderSkipped: false,
              barThickness: 40,
            },
          ],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching visit duration data:', error);
        setIsLoading(false);
      });
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Visit Duration Distribution',
        font: {
          size: 20,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        color: '#333',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} visits`;
          },
          title: function(context) {
            return `${context[0].label} minutes`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Visit Duration Range (minutes)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          color: '#555',
          padding: {
            top: 10,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Visits',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          color: '#555',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1,
        },
        ticks: {
          precision: 0,
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 10,
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading chart data...</p>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="h-80">
        {isLoading ? (
          <LoadingSpinner />
        ) : chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-red-500">Failed to load chart data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Histogram;