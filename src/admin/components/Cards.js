import { FaHome, FaBuilding, FaUsers, FaUserTie } from "react-icons/fa"
import { motion } from "framer-motion"

const MetricCards = ({ analytics = {
  properties: { total: 0, active: 0 },
  projects: { total: 0, active: 0 },
  users: { total: 0, active: 0 },
  sellers: { total: 0, active: 0 }
}, loading = false }) => {
  
  const metrics = [
    {
      title: "Properties",
      total: analytics.properties.total,
      active: analytics.properties.active,
      icon: <FaHome className="w-6 h-6 text-white" />,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-100",
      progressColor: "bg-blue-300"
    },
    {
      title: "Projects",
      total: analytics.projects.total,
      active: analytics.projects.active,
      icon: <FaBuilding className="w-6 h-6 text-white" />,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-100",
      progressColor: "bg-purple-300"
    },
    {
      title: "Users",
      total: analytics.users.total,
      active: analytics.users.active,
      icon: <FaUsers className="w-6 h-6 text-white" />,
      color: "from-green-500 to-teal-600",
      textColor: "text-green-100",
      progressColor: "bg-green-300"
    },
    {
      title: "Sellers",
      total: analytics.sellers.total,
      active: analytics.sellers.active,
      icon: <FaUserTie className="w-6 h-6 text-white" />,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-100",
      progressColor: "bg-amber-300"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className={`p-6 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}
          variants={cardVariants}
          whileHover="hover"
          layout
        >
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="w-24 h-4 bg-white bg-opacity-20 rounded"></div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full"></div>
              </div>
              <div className="w-20 h-8 bg-white bg-opacity-20 rounded"></div>
              <div className="w-full h-2 bg-white bg-opacity-20 rounded-full"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${metric.textColor}`}>{metric.title}</h3>
                <div className="p-2 bg-white bg-opacity-20 rounded-full">
                  {metric.icon}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">{metric.total.toLocaleString()}</span>
                  <span className="ml-2 text-sm font-medium text-white text-opacity-80">total</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-white text-opacity-90">{metric.active.toLocaleString()} active</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-white bg-opacity-20 rounded-full">
                    {metric.total > 0 ? ((metric.active / metric.total) * 100).toFixed(0) : 0}%
                  </span>
                </div>
              </div>
              
              <div className="w-full h-2 mt-4 bg-black bg-opacity-20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.total > 0 ? (metric.active / metric.total) * 100 : 0}%` }}
                  transition={{ duration: 1.5, delay: 0.2 * index, ease: "easeOut" }}
                />
              </div>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default MetricCards