//superAdmin
// import React, { useEffect, useState, useRef } from 'react';
// import Chart from 'chart.js/auto';
//
// const serverUrl = 'https://world-of-construction.onrender.com';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDMzNTAzNTcsImV4cCI6MTc0NTk0MjM1N30.iNMQ2BmEW9oWr_j3nMCcAsobsS8F4jdFIy_bH22d4GQ';
// const storeId = 1;
//
// const Home = () => {
//   const [startDate, setStartDate] = useState(getCurrentMonthStartDate());
//   const [endDate, setEndDate] = useState(getCurrentMonthEndDate());
//   const [stats, setStats] = useState(null);
//   const [buyers, setBuyers] = useState([]);
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//
//   useEffect(() => {
//     fetchStatistics();
//   }, [startDate, endDate]);
//
//   const fetchStatistics = async () => {
//     try {
//       const res = await fetch(
//         `${serverUrl}/superAdmin/statistics/${storeId}?startDate=${startDate}&endDate=${endDate}`,
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const data = await res.json();
//       setStats(data);
//       renderChart(data.statistics);
//
//       const buyersRes = await fetch(
//         `${serverUrl}/superAdmin/stores/${storeId}/buyers?startDate=${startDate}&endDate=${endDate}`,
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const buyersData = await buyersRes.json();
//       setBuyers(buyersData.buyers);
//     } catch (err) {
//       console.error('Ошибка загрузки данных:', err);
//     }
//   };
//
//   const renderChart = (chartData) => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }
//
//     chartInstance.current = new Chart(chartRef.current, {
//       type: 'line',
//       data: {
//         labels: chartData.map((stat) => stat.interval),
//         datasets: [
//           {
//             label: 'Прибыль по дням',
//             data: chartData.map((stat) => stat.totalRevenue),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.3)',
//             borderWidth: 2,
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               callback: (value) => `${value} ₽`,
//             },
//           },
//         },
//         plugins: {
//           tooltip: {
//             callbacks: {
//               label: (tooltipItem) =>
//                 `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} ₽`,
//             },
//           },
//         },
//       },
//     });
//   };
//
//   return (
//     <div className="dashboard">
//       <div className="filters">
//         <label>
//           Start Date:
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </label>
//         <label>
//           End Date:
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </label>
//       </div>
//
//       {stats && (
//         <div className="summary">
//           <p>Общая выручка: {stats.totalRevenue.toFixed(2)} ₽</p>
//           <p>Количество продуктов: {stats.productsCount}</p>
//         </div>
//       )}
//
//       <div className="chart-container" style={{ height: '400px' }}>
//         <canvas ref={chartRef}></canvas>
//       </div>
//
//       <div className="buyers">
//         <h3>Покупатели</h3>
//         <div className="buyers-list">
//           {buyers.map((buyer) => (
//             <div key={buyer.id} className="buyer-card">
//               {buyer.avatar ? (
//                 <img src={buyer.avatar} alt="Avatar" className="buyer-avatar" />
//               ) : (
//                 <div className="buyer-avatar"></div>
//               )}
//               <div className="buyer-info">
//                 <strong>Email:</strong> {buyer.email}
//                 <br />
//                 <strong>Общая сумма:</strong> {buyer.totalSpent.toFixed(2)} ₽
//                 <br />
//                 <strong>Общее количество:</strong> {buyer.totalQuantity}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// function getCurrentMonthStartDate() {
//   const date = new Date();
//   date.setDate(1);
//   return date.toISOString().split('T')[0];
// }
//
// function getCurrentMonthEndDate() {
//   const date = new Date();
//   date.setMonth(date.getMonth() + 1);
//   date.setDate(0);
//   return date.toISOString().split('T')[0];
// }
//
// export default Home;
// // export default StatisticsDashboard;






import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from "axios";
import Input from "../Input";

const serverUrl = 'https://world-of-construction.onrender.com';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpYXQiOjE3NDI4MjI0MDIsImV4cCI6MTc0NTQxNDQwMn0.fA39bADBXROMFRZodbFWf9jaZ9Bl4yivYa5e0_ns5D8"
const storeId = 1;

const Home = () => {
  const [startDate, setStartDate] = useState(getCurrentMonthStartDate());
  const [endDate, setEndDate] = useState(getCurrentMonthEndDate());
  const [stats, setStats] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchStatistics();
  }, [startDate, endDate]);


  const fetchStatistics = async () => {
    try {
      const statsResponse = await axios.get(
        `${serverUrl}/admin/statistics/`,
        {
          params: { startDate, endDate },
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      setStats(statsResponse.data);
      renderChart(statsResponse.data.statistics);

      const buyersResponse = await axios.get(
        `${serverUrl}/admin/buyers`,
        {
          params: { startDate, endDate },
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(buyersResponse.data, 111);
      setBuyers(buyersResponse.data.buyers);
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    }
  };

  const renderChart = (chartData) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: chartData.map((stat) => stat.interval),
        datasets: [
          {
            label: 'Profit by days',
            data: chartData.map((stat) => stat.totalRevenue),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} ₽`,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} ₽`,
            },
          },
        },
      },
    });
  };

  return (
    <div className="dashboard">
      <div className="filters">
        <label>
          Start Date:
          <Input
            className="input__filter"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <Input
            className="input__filter"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {stats && (
        <div className="summary">
          <p>Total Spent: {Math.round(stats.totalRevenue)} ₽</p>
          <p>Total Quantity: {stats.productsCount}</p>
        </div>
      )}

      <div className="chart-container" style={{height: '400px'}}>
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="buyers">
        <h3>Buyers</h3>
        <div className="buyers-list">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="buyer-card">
              {buyer.avatar ? (
                <img src={buyer.avatar} alt="Avatar" className="buyer-avatar" />
              ) : (
                <div className="buyer-avatar"></div>
              )}
              <div className="buyer-info">
                <strong>Email:</strong> {buyer.email}

                <p><strong>Total Spent:</strong> {Math.round(buyer.totalSpent)} ₽</p>
                <p><strong>Total Quantity:</strong> {buyer.totalQuantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getCurrentMonthStartDate() {
  const date = new Date();
  date.setDate(1);
  return date.toISOString().split('T')[0];
}

function getCurrentMonthEndDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.toISOString().split('T')[0];
}

export default Home;
// export default StatisticsDashboard;
