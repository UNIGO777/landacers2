import Layout from "../../Layout"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { useState, useEffect } from "react"
import sellerAnalytics from "../../Requests/FatchAnalatics"
import DashboadLoader from '../../components/loaders/Dashbordloader'

const MetricCard = ({ icon, title, value, subtext, trend, color = "blue" }) => (
  <div className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-xl bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && (
            <span className={`text-sm flex items-center ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
              {trend > 0 ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              )}
              {trend}%
            </span>
          )}
        </div>
      </div>
    </div>
    {subtext && <p className="text-xs font-medium text-gray-400">{subtext}</p>}
  </div>
)

const BrokerHome = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [analyticsData, setAnalyticsData] = useState(null)
  const [quaryData, setQuaryData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sellerAnalytics
        setAnalyticsData(data)
        setQuaryData(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <DashboadLoader />
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className="p-6 text-red-500 text-center">{error}</div>
      </>
    )
  }

  return (
    <>
      <div className="mx-auto overflow-y-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">
            Comprehensive insights into your property performance and business metrics
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Total Queries"
            value={analyticsData.totalQueries}
            subtext="Total customer inquiries"
            color="blue"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title="Total Projects Posted"
            value={analyticsData.totalProjectsPosted}
            subtext="Commercial listings"
            color="purple"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }
            title="Total Properties Posted"
            value={analyticsData.totalPropertiesPosted}
            subtext="Residential listings"
            color="green"
          />
          <MetricCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
            title="Sold Out Properties"
            value={analyticsData.soldOutProperties}
            subtext="Successful transactions"
            color="red"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Property Performance</h2>
              <p className="text-sm text-gray-500">Monthly listing analytics</p>
            </div>
            {new Date().getFullYear()} (Current Year Data)
            
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quaryData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }}
                  itemStyle={{ color: '#1e40af', fontWeight: 500 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="QueriesReceived" 
                  stroke="#1e40af" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  strokeOpacity={1}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrokerHome
