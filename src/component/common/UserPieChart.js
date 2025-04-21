import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserPieChart = ({ lostUsers, newUsers, currentUsers }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const totalUsers = lostUsers + newUsers + currentUsers;
  const activeUsers = newUsers + currentUsers;
  const activePercent = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : 0;


  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const fontSize = (height / 100).toFixed(2);
      const percentText = `${activePercent}%`;
      const labelText = 'Total';

      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#333';


      const centerX = width / 2;
      const centerY = height / 2;

      ctx.font = `${(fontSize * 0.6)}em sans-serif`;
      ctx.fillStyle = '#666';
      ctx.fillText(labelText, centerX - 5, centerY - 50);

      ctx.fillText(percentText, centerX, centerY - 10);

      ctx.save();
    },
  };

  // const centerTextPlugin = {
  //   id: 'centerText',
  //   beforeDraw: (chart) => {
  //     const { width } = chart;
  //     const { height } = chart;
  //     const ctx = chart.ctx;
  //     ctx.restore();
  //     const fontSize = (height / 114).toFixed(2);
  //     ctx.font = `${fontSize}em sans-serif`;
  //     ctx.textBaseline = 'middle';
  //
  //     const text = `${activePercent}%`;
  //     const textX = Math.round((width - ctx.measureText(text).width) / 2);
  //     const textY = height / 2;
  //
  //     ctx.fillStyle = '#333';
  //     ctx.fillText(text, textX, textY);
  //     ctx.save();
  //   },
  // };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Lost Customer', 'New Customer', 'Current Customer'],
        datasets: [{
          label: 'Customer Distribution',
          data: [lostUsers, newUsers, currentUsers],
          backgroundColor: [
            'rgba(50, 205, 50, 0.6)',
            'rgba(255, 165, 0, 0.6)',
            'rgba(30, 144, 255, 0.6)',
          ],
          borderColor: [
            'rgba(50, 205, 50, 0.6)',
            'rgba(255, 165, 0, 0.6)',
            'rgba(30, 144, 255, 0.6)',
          ],
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.6)',
          //   'rgba(54, 162, 235, 0.6)',
          //   'rgba(75, 192, 192, 0.6)',
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(75, 192, 192, 1)',
          // ],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
      plugins: [centerTextPlugin],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [lostUsers, newUsers, currentUsers, activePercent]);

  return (
    <div className="chart__container_circle">
      <h3>Customer</h3>
      <canvas ref={chartRef} />
    </div>
  );
};

export default UserPieChart;
