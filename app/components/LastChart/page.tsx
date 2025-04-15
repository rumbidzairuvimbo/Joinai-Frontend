'use client';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
  ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import BASE_URL from '../api/api';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SpendingData {
  lowerrange: number;
  lowermiddlerange: number;
  middlerange: number;
  uppermiddlerange: number;
  upperrange: number;
}

type LineChartData = ChartData<'line', number[], string>;

const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState<LineChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/visits/getspending`)
      .then((res) => res.json())
      .then((data: SpendingData) => {
        const labels = ['0-200', '201-400', '401-600', '601-800', '801+'];
        const values = [
          data.lowerrange,
          data.lowermiddlerange,
          data.middlerange,
          data.uppermiddlerange,
          data.upperrange,
        ];

        const pointBackgroundColors = [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ];

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Shoppers',
              data: values,
              fill: true,
              backgroundColor: (context: ScriptableContext<'line'>) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return 'rgba(255, 99, 132, 0.1)';
                
                const gradient = ctx.createLinearGradient(
                  0, 
                  chartArea.bottom, 
                  0, 
                  chartArea.top
                );
                gradient.addColorStop(0, 'rgba(255, 99, 132, 0.05)');
                gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)');
                return gradient;
              },
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 8,
              pointHoverRadius: 12,
              pointBackgroundColor: pointBackgroundColors,
              pointBorderColor: 'white',
              pointBorderWidth: 2,
              pointHitRadius: 10,
              pointHoverBorderWidth: 3,
              pointHoverBackgroundColor: pointBackgroundColors,
              pointHoverBorderColor: 'white',
            },
          ],
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching spending data:', err);
        setIsLoading(false);
      });
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Customer Spending Distribution',
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#333'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (context) => `Shoppers: ${context.parsed.y}`,
          title: (context) => `Spending: $${context[0].label}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12
          },
          precision: 0
        },
        title: {
          display: true,
          text: 'Number of Customers',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#555',
          padding: 10
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Spending Range ($)',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#555',
          padding: 10
        }
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuad',
        from: 0.4,
        to: 0.4,
        loop: false
      },
      radius: {
        duration: 1000,
        easing: 'easeOutBounce',
        from: 0,
        to: 8,
        loop: false
      }
    },
    elements: {
      line: {
        borderJoinStyle: 'round'
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 10
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-pink-200 rounded-full border-t-pink-600 animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading chart data...</p>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="h-80">
        {isLoading ? (
          <LoadingSpinner />
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-red-500">Failed to load chart data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;