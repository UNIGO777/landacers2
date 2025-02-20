import Layout from "../../Layout"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", amount: 700 },
  { month: "Feb", amount: 800 },
  { month: "Mar", amount: 700 },
  { month: "Apr", amount: 900 },
  { month: "May", amount: 800 },
  { month: "Jun", amount: 1000 },
  { month: "Jul", amount: 900 },
  { month: "Aug", amount: 800 },
  { month: "Sep", amount: 900 },
  { month: "Oct", amount: 800 },
  { month: "Nov", amount: 700 },
  { month: "Dec", amount: 600 },
]

const MetricCard = ({ icon, title, value, subtext, trend }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-lg">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-blue-50">{icon}</div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      {trend && (
        <span className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
      )}
    </div>
    {subtext && <p className="mt-1 text-sm text-gray-500">{subtext}</p>}
  </div>
)

const BrokerHome = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Our data-driven approach enables precise navigation, offering detailed analyses of property sales and rental
            demand fluctuations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Total income"
            value="$1,579,000.95"
            subtext="Last week"
            trend={10}
          />
          <MetricCard
            icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            }
            title="Balance"
            value="$500.00"
            subtext="Last month"
          />
          <MetricCard
            icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            }
            title="Total views"
            value="12000"
            subtext="Last week"
            trend={10}
          />
          <MetricCard
            icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Sold out"
            value="30"
            subtext="Total properties"
          />
        </div>

        <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Analytics</h2>
            <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BrokerHome

