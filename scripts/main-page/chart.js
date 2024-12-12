/**
 * Initializes and renders the area and bar charts on the page.
 */
export default function initializeCharts() {
    const ctxArea = document.getElementById('areaChart')
    const ctxBar = document.getElementById('barChart')

    if (!ctxArea || !ctxBar) {
        console.warn('Charts are not present on this page.')
        return
    }

    // Initialize Area Chart
    new Chart(ctxArea.getContext('2d'), {
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

    // Initialize Bar Chart
    new Chart(ctxBar.getContext('2d'), {
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
}
