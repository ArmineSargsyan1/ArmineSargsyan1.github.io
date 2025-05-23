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






// import React, { useEffect, useState, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import Input from "../Input";
// import {useSelector} from "react-redux";
// import Api from "../../../Api";
// import moment from "moment";
// import UserPieChart from "../../../assets/styles/UserPieChart";
// import Loader from "../Loader";
//
// function getCurrentMonthStartDate() {
//   return moment().startOf('month').format('YYYY-MM-DD');
// }
//
// function getCurrentMonthEndDate() {
//   return moment().endOf('month').format('YYYY-MM-DD');
// }
// const Home = () => {
//   const [startDate, setStartDate] = useState(getCurrentMonthStartDate());
//   const [endDate, setEndDate] = useState(getCurrentMonthEndDate());
//   const [stats, setStats] = useState(null);
//   const [buyers, setBuyers] = useState([]);
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const [loading, setLoading] = useState(false);
//
//
//   const clickedBar = useSelector((state) => state.users.clickedBar);
//
//   useEffect(() => {
//     fetchStatistics();
//   }, [startDate, endDate]);
//
//
//   const fetchStatistics = async () => {
//     setLoading(true);
//     try {
//       const statsResponse = await Api.getAdminStatsResponse({ startDate, endDate });
//       setStats(statsResponse.data);
//       renderChart(statsResponse.data.statistics);
//
//       const { data } = await Api.getAdminBuyersResponse({ startDate, endDate });
//       setBuyers(data.buyers);
//     } catch (err) {
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//
//
//   console.log(stats)
//   const renderChart = (chartData) => {
//     console.log(chartData,33333333)
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
//             label: 'Profit by days',
//             data: chartData.map((stat) => stat.totalRevenue),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.3)',
//             // borderColor: 'limegreen',
//             // backgroundColor: 'limegreen',
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
//       {!clickedBar &&
//       <div className="filters">
//         <label>
//           Start Date:
//           <Input
//             className="input__filter"
//             type="date"
//             value={startDate}
//             onChange={({target: {value}}) => setStartDate(value)}
//           />
//         </label>
//         <label>
//           End Date:
//           <Input
//             className="input__filter"
//             type="date"
//             value={endDate}
//             onChange={({target: {value}}) => setEndDate(value)}
//           />
//         </label>
//       </div>
//       }
//
//       {stats && (
//         <div className="summary__group">
//           <div className="summary">
//             <div>Total Spent
//               <p>{Math.round(stats.totalRevenue)} ₽</p>
//             </div>
//           </div>
//
//           <div className="summary">
//             <div>Total Quantity
//               <p>{stats.productsCount}</p>
//             </div>
//           </div>
//         </div>
//
//
//       )}
//
//       <div className="chart__wrapper">
//         <div className="chart-container">
//           <canvas ref={chartRef}></canvas>
//         </div>
//         <UserPieChart
//         lostUsers={35}
//         newUsers={50}
//         currentUsers={120}
//       />
//       </div>
//
//
//       <div className="buyers">
//         <h3>Buyers</h3>
//         {loading
//           ? <Loader/>
//           : <div className="buyers-list">
//             {buyers.map((buyer) => (
//               <div key={buyer.id} className="buyer-card">
//                 {buyer.avatar ? (
//                   <img src={buyer.avatar} alt="Avatar" className="buyer-avatar"/>
//                 ) : (
//                   <div className="buyer-avatar"></div>
//                 )}
//                 <div className="buyer-info">
//                   <strong>Email:</strong> {buyer.email}
//
//                   <p><strong>Total Spent:</strong> {Math.round(buyer.totalSpent)} ₽</p>
//                   <p><strong>Total Quantity:</strong> {buyer.totalQuantity}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         }
//
//       </div>
//     </div>
//   );
// };
//
//
// export default Home;





import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Input from "../Input";
import { useSelector } from "react-redux";
import Api from "../../../Api";
import moment from "moment";
import UserPieChart from "../UserPieChart";
import Loader from "../Loader";
import useQuery from "../../../utils/useQuery";
import {ReactComponent as UserIcon} from "../../../assets/image/user-solid (4).svg";

const getCurrentMonthStartDate = () => moment().startOf('month').format('YYYY-MM-DD');
const getCurrentMonthEndDate = () => moment().endOf('month').format('YYYY-MM-DD');

const Home = () => {
  const { query, setQuery } = useQuery();
  const startDate = query.startDate || getCurrentMonthStartDate();
  const endDate = query.endDate || getCurrentMonthEndDate();

  const [stats, setStats] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [loading, setLoading] = useState(false);
  const clickedBar = useSelector((state) => state.users.clickedBar);

  useEffect(() => {
    fetchStatistics();
  }, [startDate, endDate]);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const statsResponse = await Api.getAdminStatsResponse({ startDate, endDate });
      setStats(statsResponse.data);
      renderChart(statsResponse.data.statistics);

      const { data } = await Api.getAdminBuyersResponse({ startDate, endDate });
      setBuyers(data.buyers);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (chartData) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: chartData.map(stat => stat.interval),
        datasets: [{
          label: 'Profit by days',
          data: chartData.map(stat => stat.totalRevenue),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `${value} $`
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: tooltipItem =>
                `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} $`
            }
          }
        }
      }
    });
  };
  console.log(stats)
  return (
    <div className="dashboard">
      {!clickedBar && (
        <div className="filters">
          <label>
            Start Date:
            <Input
              className="input__filter"
              type="date"
              value={startDate}
              onChange={({target: {value}}) => setQuery({...query, startDate: value})}
            />
          </label>
          <label>
            End Date:
            <Input
              className="input__filter"
              type="date"
              value={endDate}
              onChange={({target: {value}}) => setQuery({...query, endDate: value})}
            />
          </label>
        </div>
      )}

      {stats ?
        <div className="summary__group">
          <div className="summary">
            <div>Total Revenue<p>{Math.round(stats.totalRevenue)} $</p></div>
          </div>
          <div className="summary">
            <div>Total Sales<p>{Math.round(stats.totalSales)} $</p></div>
          </div>
          <div className="summary">
            <div>Total Orders<p>{stats.totalOrders}</p></div>
          </div>
          <div className="summary">
            <div>Total Quantity<p>{stats.productsCount}</p></div>
          </div>
        </div>

        : <Loader height="60" width="100%" count="4" className="summary__group"/>

      }
      <div className="chart__wrapper">
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>

        <UserPieChart
          lostUsers={35}
          newUsers={50}
          currentUsers={120}
        />
      </div>

      <h3 className="stats-title">Detailed Statistics</h3>
      {stats?.statistics ? (
        <div className="stats-table">
          <table>
            <thead>
            <tr>
              <th>Date</th>
              <th>Total Revenue ($)</th>
              <th>Total Sales</th>
            </tr>
            </thead>
            <tbody>
            {stats.statistics.map((stat, index) => (
              <tr key={index}>
                <td>{stat.interval}</td>
                <td>{stat.totalRevenue?.toFixed(2) ?? '—'}</td>
                <td>{stat.totalSales?.toFixed(2) ?? '—'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader height="25" width="100%" count="4" className="stats-table" iCount={3}/>
      )}



      <div className="buyers">
        <h3 className="stats-title">Buyers</h3>
        {
          loading ? <Loader height="60" width="100%" count="3" className="buyers-list"/>

            : (<div className="buyers-list">
                {buyers.map((buyer) => (
                  <div key={buyer.id} className="buyer-card">
                    {buyer.avatar ? (
                      <img src={buyer.avatar} alt="Avatar" className="buyer-avatar"/>
                    ) : (
                      <div className="buyer-avatar">
                        <UserIcon className="buyer-avatar-svg"/>
                      </div>
                    )}
                    <div className="buyer-info">
                      <strong>Email:</strong> {buyer.email}
                      <p><strong>Total Spent:</strong> {Math.round(buyer.totalSpent)} $</p>
                      <p><strong>Total Quantity:</strong> {buyer.totalQuantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
      </div>
    </div>
  );
};

export default Home;
