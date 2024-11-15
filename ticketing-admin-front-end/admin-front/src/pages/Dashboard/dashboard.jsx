import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Navbar from '../../components/navbar/navbar';

const Dashboard = () => {
    const [ticketCounts, setTicketCounts] = useState(null);

    useEffect(() => {
        // Mock data for initial rendering
        const initialData = {
            new: 1,
            inProgress: 3,
            closed: 0,
            onHold: 0
        };
        setTicketCounts(initialData);
    }, []);

    useEffect(() => {
        if (ticketCounts) {
            createChart(ticketCounts);
        }
    }, [ticketCounts]);

    const createChart = (data) => {
        const ctx = document.getElementById('ticketChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Noi', 'In Progres', 'Inchise', 'In asteptare'],
                datasets: [{
                    label: 'Ticket Counts',
                    data: Object.values(data),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 2
                    }
                }
            }
        });
    };

    return (
        <div className="div">
            <Navbar />
            <div style={{ width: '90%', margin: '0 auto', height: '70vh' }}>
                <h1 style={{ textAlign: 'center' }}>Analitica Tichete</h1>
                {ticketCounts && (
                    <div>
                        <canvas id="ticketChart" style={{ width: '60%', height: '60%' }}></canvas>
                    </div>
                )}
            </div>

        </div>

    );
};

export default Dashboard;
