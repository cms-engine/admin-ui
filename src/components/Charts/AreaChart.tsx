import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

/**
 * The `AreaChart` component renders a responsive area chart using the Chart.js library.
 *
 * This chart displays a line graph with smoothed data points and a filled background area beneath the line.
 * It is useful for visualizing trends over time, such as sales, revenue, or other sequential data.
 *
 * @component
 * @example
 * <AreaChart />
 *
 * @returns {JSX.Element} A canvas element that renders the area chart.
 */

const AreaChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: [
          'March 1',
          'March 3',
          'March 5',
          'March 7',
          'March 9',
          'March 11',
          'March 13',
        ],
        datasets: [
          {
            label: 'Example Data',
            data: [3000, 7000, 11000, 15000, 20000, 25000, 30000],
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.2)',
            fill: true, // fill the area under the line
            tension: 0.3, // smooth out the line
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    // Cleanup on component unmount
    return () => chart.destroy()
  }, [])

  return <canvas ref={chartRef} />
}

export default AreaChart
