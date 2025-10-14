// src/components/Admin/DashboardContent.jsx

import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import UserApi from '../../../api/userApi'
import '../CSS/DashboardContent.css'

const DashboardContent = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [activeCount, setActiveCount] = useState(0)
  const [inactiveCount, setInactiveCount] = useState(0)
  const [registerData, setRegisterData] = useState([])
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear())
  )
  const [isLoadingRegister, setIsLoadingRegister] = useState(false)

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const [activeRes, inactiveRes] = await Promise.all([
          UserApi.countActiveUsers(),
          UserApi.countInactiveUsers(),
        ])

        setActiveCount(activeRes.total)
        setInactiveCount(inactiveRes.total)
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu user count:', error)
      }
    }

    fetchUserCounts()
  }, [])

  // Lấy dữ liệu đăng ký theo tháng
  useEffect(() => {
    const fetchRegisterByMonth = async () => {
      setIsLoadingRegister(true)
      try {
        const res = await UserApi.countRegisterByMonth(selectedYear)

        // API trả về: { year: 2025, data: { 1: 35, 2: 36, ... } }
        let dataObj = res?.data?.data || res?.data

        if (!dataObj || typeof dataObj !== 'object') {
          console.warn('Dữ liệu không hợp lệ:', dataObj)
          setRegisterData([])
          return
        }

        // Chuyển object thành array [{ name: 'T1', count: 0 }, ...]
        const chartData = Object.keys(dataObj)
          .filter((key) => !isNaN(key)) // Chỉ lấy các key là số (tháng)
          .map((month) => ({
            name: `T${month}`,
            count: dataObj[month] || 0,
          }))
          .sort((a, b) => {
            const monthA = parseInt(a.name.replace('T', ''))
            const monthB = parseInt(b.name.replace('T', ''))
            return monthA - monthB
          })

        setRegisterData(chartData)
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu đăng ký theo tháng:', error)
        setRegisterData([])
      } finally {
        setIsLoadingRegister(false)
      }
    }

    fetchRegisterByMonth()
  }, [selectedYear])

  // Mock data cho biểu đồ truy cập người dùng theo tuần
  const userAccessData = [
    { name: 'T2', users: 32 },
    { name: 'T3', users: 38 },
    { name: 'T4', users: 45 },
    { name: 'T5', users: 42 },
    { name: 'T6', users: 48 },
    { name: 'T7', users: 50 },
    { name: 'CN', users: 40 },
  ]

  // Mock data cho biểu đồ doanh thu
  const revenueData = [
    { name: 'Tuần 1', revenue: 2400 },
    { name: 'Tuần 2', revenue: 2210 },
    { name: 'Tuần 3', revenue: 2290 },
    { name: 'Tuần 4', revenue: 2000 },
  ]

  const statsCards = [
    {
      title: 'Số Lượng Đăng Ký Tháng Này',
      value: '3,456',
      change: '+24.5%',
      icon: '📝',
      color: 'blue',
    },
    {
      title: 'Người Dùng Đang Hoạt Động',
      value: activeCount,
      change: '+2.1%',
      icon: '✅',
      color: 'green',
    },
    {
      title: 'Tài Khoản Ngừng Hoạt Động',
      value: inactiveCount,
      change: '-0.4%',
      icon: '⛔',
      color: 'red',
    },
    {
      title: 'Doanh Thu Tháng Này',
      value: '45.2M',
      change: '+18.7%',
      icon: '💰',
      color: 'orange',
    },
  ]

  return (
    <div className='dashboard-content'>
      {/* Stats Cards */}
      <div className='stats-cards'>
        {statsCards.map((card, index) => (
          <div key={index} className={`stat-card ${card.color}`}>
            <div className='stat-icon'>{card.icon}</div>
            <div className='stat-info'>
              <h4>{card.title}</h4>
              <div className='stat-value'>{card.value}</div>
              {/* <p className='stat-change'>{card.change} so với kỳ trước</p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='charts-grid'>
        {/* User Access Chart */}
        <div className='chart-card'>
          <div className='chart-header'>
            <h3>Tỷ Lệ Truy Cập Người Dùng</h3>
            <div className='time-filter'>
              {['day', 'week', 'month', 'year'].map((t) => (
                <button
                  key={t}
                  className={`filter-btn ${timeRange === t ? 'active' : ''}`}
                  onClick={() => setTimeRange(t)}
                >
                  {t === 'day'
                    ? 'Ngày'
                    : t === 'week'
                    ? 'Tuần'
                    : t === 'month'
                    ? 'Tháng'
                    : 'Năm'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={userAccessData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#eee' />
              <XAxis dataKey='name' />
              <YAxis domain={[0, 50]} />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #FF6B35',
                }}
                cursor={{ stroke: '#FF6B35', strokeWidth: 2 }}
              />
              <Legend />
              <Line
                type='monotone'
                dataKey='users'
                stroke='#FF6B35'
                strokeWidth={2}
                dot={{ fill: '#FF6B35', r: 5 }}
                activeDot={{ r: 7 }}
                name='Người dùng truy cập'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Registration Chart */}
        <div className='chart-card'>
          <div className='chart-header'>
            <h3>Số Người Đăng Ký Theo Tháng ({selectedYear})</h3>
            <div className='year-select'>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value='2024'>2024</option>
                <option value='2025'>2025</option>
                <option value='2026'>2026</option>
              </select>
            </div>
          </div>
          {isLoadingRegister ? (
            <div
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              }}
            >
              Đang tải dữ liệu...
            </div>
          ) : registerData.length > 0 ? (
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={registerData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#eee' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #4F46E5',
                  }}
                  cursor={{ stroke: '#4F46E5', strokeWidth: 2 }}
                />
                <Legend />
                <Area
                  type='monotone'
                  dataKey='count'
                  fill='#4F46E520'
                  stroke='#4F46E5'
                  strokeWidth={2}
                  name='Số lượng đăng ký'
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              }}
            >
              Không có dữ liệu
            </div>
          )}
        </div>
      </div>

      {/* Statistics Section */}
      <div className='location-performance'>
        <h3>Thống Kê Cơ Bản</h3>
        <div className='performance-grid'>
          <div className='location-card'>
            <div className='location-header'>
              <h4>Tổng Đơn Hàng</h4>
            </div>
            <div className='location-stats'>
              <div className='stat'>
                <span className='label'>Hôm Nay</span>
                <span className='number'>234</span>
              </div>
              <div className='stat'>
                <span className='label'>Tuần Này</span>
                <span className='number'>1,456</span>
              </div>
            </div>
          </div>

          <div className='location-card'>
            <div className='location-header'>
              <h4>Tỷ Lệ Chuyển Đổi</h4>
            </div>
            <div className='location-stats'>
              <div className='stat'>
                <span className='label'>Hôm Nay</span>
                <span className='number'>68%</span>
              </div>
              <div className='stat'>
                <span className='label'>Tuần Này</span>
                <span className='number'>72%</span>
              </div>
            </div>
          </div>

          <div className='location-card'>
            <div className='location-header'>
              <h4>Tài Khoản Mới</h4>
            </div>
            <div className='location-stats'>
              <div className='stat'>
                <span className='label'>Hôm Nay</span>
                <span className='number'>45</span>
              </div>
              <div className='stat'>
                <span className='label'>Tuần Này</span>
                <span className='number'>312</span>
              </div>
            </div>
          </div>

          <div className='location-card'>
            <div className='location-header'>
              <h4>Tài Khoản Hoạt Động</h4>
            </div>
            <div className='location-stats'>
              <div className='stat'>
                <span className='label'>Hôm Nay</span>
                <span className='number'>2,145</span>
              </div>
              <div className='stat'>
                <span className='label'>Tuần Này</span>
                <span className='number'>8,756</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
