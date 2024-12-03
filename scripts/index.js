
document.addEventListener('DOMContentLoaded', () => {
  const ctxArea = document.getElementById('areaChart').getContext('2d')
  const ctxBar = document.getElementById('barChart').getContext('2d')

  // Area Chart
  new Chart(ctxArea, {
    type: 'line',
    data: {
      labels: ['March 1', 'March 3', 'March 5', 'March 7', 'March 9', 'March 11', 'March 13'],
      datasets: [
        {
          label: 'Example Data',
          data: [4000, 8000, 12000, 16000, 20000, 24000, 28000],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.5)',
          fill: true,
        },
      ],
    },
  })


  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Example Data',
          data: [5000, 10000, 15000, 20000, 25000, 30000],
          backgroundColor: '#e74c3c',
        },
      ],
    },
  })
})
