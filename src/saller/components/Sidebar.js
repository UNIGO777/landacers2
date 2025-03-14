import { Link, useLocation } from "react-router-dom"
import { PlusSquare, Home, Grid, Folder, DollarSign, FolderPlus, Layers } from "lucide-react"
import logo from '../media/LandsAcers_Horizontal_logo.png'
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const Sidebar = ({ isOpen = false , setIsMenuOpen, isbuilder}) => {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1025)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  const navigation = [
    { name: "Dashboard", icon: Home, path: "/saller/dashboard" },
    { name: "Add Property", icon: PlusSquare, path: "/saller/property/add" },
    { name: "All Properties", icon: Grid, path: "/saller/properties" },
   
    { name: "Queries", icon: Folder, path: "/saller/queries/manage" },
    { name: "Manage Subscription", icon: DollarSign, path: "/saller/subscription" },
  ]

  if(isbuilder){
    navigation.splice(3, 0, { name: "Add Project", icon: FolderPlus, path: "/saller/project/add" })
    navigation.splice(4, 0, { name: "All Projects", icon: Layers, path: "/saller/projects" })
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    }),
    hover: { scale: 1.02, originX: 0 }
  }

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {/* Mobile overlay */}
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div 
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 w-64 z-40 flex-col bg-white border-r border-gray-200 shadow-lg lg:flex"
          >
            <div className="flex flex-col flex-grow">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex p-6 pb-4 border-b border-gray-200 items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt="LandsAcers Logo" 
                  className="h-10 w-48 opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              
              <nav className="flex-1 px-3 py-6 space-y-1">
                <AnimatePresence>
                  {navigation.map((item, i) => {
                    const isActive = location.pathname === item.path
                    return (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        whileHover="hover"
                        className="px-2"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300
                            ${
                              isActive 
                                ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                                : "text-gray-600 hover:bg-gray-50 hover:text-blue-700"
                            }`
                          }
                        >
                          <item.icon
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${
                              isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"
                            }`}
                          />
                          <span className="flex-1">{item.name}</span>
                          {isActive && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-2 w-2 h-2 bg-blue-400 rounded-full"
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 pb-6 mt-auto"
              >
                <div className="text-xs text-gray-500 text-center font-medium border-t border-gray-200 pt-4">
                  <div className="hover:text-gray-700 transition-colors cursor-default">
                    © {new Date().getFullYear()} LandsAcers
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="mt-2 text-[0.7rem] text-gray-400 bg-gray-100 rounded-full py-1 px-2 inline-block"
                  >
                    v1.0
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
