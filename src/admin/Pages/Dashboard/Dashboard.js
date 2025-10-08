import { useState, useEffect } from "react"
import Layout from "../Layout.js"
import MetricCards from "../../components/Cards.js"
import RecentPayments from "../../components/RecentPayments.js"
import axios from "axios"
import { toast } from "react-toastify"
import ADMIN_API_ROUTES from "../../AdminRequestPath.js"
import { motion } from "framer-motion"
import { FaChartLine, FaCalendarAlt, FaSync, FaHome, FaBuilding } from "react-icons/fa"
import RecentProperties from "../../components/pageComponents/Dashboard/RecentProperties.js"
import RecentProjects from "../../components/pageComponents/Dashboard/RecentProjects.js"


const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    properties: { total: 0, active: 0, recent: [] },
    projects: { total: 0, active: 0, recent: [] },
    users: { total: 0, active: 0 },
    sellers: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [loadingProperties, setLoadingProperties] = useState(true);

  

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true);
      setLoadingProperties((true))
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${ADMIN_API_ROUTES.GET_ANALYTICS}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setAnalytics(response.data.data);
        toast.success("Dashboard data refreshed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch analytics");
    } finally {
      setLoading(false);
      setLoadingProperties(false)
      setRefreshing(false);
    }
  };


  useEffect(() => {
    fetchAnalytics();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome to Land Acre dashboard. Here's an overview of your recent activity.
            </p>
          </div>
          <div className="flex items-center mt-4 space-x-4 md:mt-0">
            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <button
              onClick={fetchAnalytics}
              disabled={refreshing}
              className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              <FaSync className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-4">
            <FaChartLine className="mr-2 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Stats Overview</h3>
          </div>
          <MetricCards analytics={analytics} loading={loading} />
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2">

          {/* Recent Properties */}
          <RecentProperties analytics={analytics} loadingProperties={loadingProperties} />

          <RecentProjects analytics={analytics} loadingProperties={loadingProperties}/>
        </motion.div>

        {/* Recent Payments */}
        <motion.div variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-gray-800">Recent Payments</h3>

              <div className="flex flex-col items-center justify-center py-10">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-center"
                >
                  <div className="inline-block p-4 mb-4 text-blue-600 bg-blue-100 rounded-full">
                    <FaSync className="w-8 h-8" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-gray-800">Coming Soon</h4>
                  <p className="text-gray-500">
                    Payment tracking features are currently under development
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
