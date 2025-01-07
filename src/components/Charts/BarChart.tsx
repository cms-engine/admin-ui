import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Example Data',
            data: [5000, 10000, 15000, 12000, 18000, 30000],
            backgroundColor: '#e74a3b',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  )
}

export default BarChart
