let mainChartInstance = null;

export function initChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;

    if (mainChartInstance) mainChartInstance.destroy();

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.25)'); // Indigo-600
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

    mainChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
            datasets: [{
                label: 'Actividad',
                data: [500, 1100, 600, 800, 1400, 1800, 1600],
                borderColor: '#4F46E5',
                borderWidth: 3,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#4F46E5',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    display: true, 
                    beginAtZero: true,
                    grid: { color: '#f1f5f9', borderDash: [5, 5] },
                    border: {display: false},
                    ticks: { 
                        font: { weight: 'bold', family: 'sans-serif', size: 10 }, 
                        color: '#94a3b8',
                        callback: function(value) {
                            if(value === 0) return '0';
                            return value >= 1000 ? (value/1000) + 'K' : value;
                        }
                    }
                },
                x: { 
                    grid: { display: false }, 
                    ticks: { font: { weight: 'bold', family: 'sans-serif', size: 10 }, color: '#94a3b8' }, 
                    border: {display: false} 
                }
            }
        }
    });
}
