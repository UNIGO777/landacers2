import { Link, useLocation } from "react-router-dom"
import { FiPlusSquare, FiGrid, FiPieChart, FiFolder, FiDollarSign, FiMessageSquare } from "react-icons/fi"
import logo from '../media/LandsAcers_Horizontal_logo.png'

const Sidebar = () => {
  const location = useLocation()

  const navigation = [
    { name: "Add Property", icon: FiPlusSquare, path: "/saller/property/add" },
    { name: "All Properties", icon: FiGrid, path: "/saller/properties" },
    { name: "Queries", icon: FiFolder, path: "/saller/queries/manage" },
    { name: "Manage Subscription", icon: FiDollarSign, path: "/saller/subscription" },
  ]

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        <div className="flex justify-center w-full border-gray-200 md:mt-2 md:py-4">
            <img src={logo} alt="LandsAcers Logo" className="h-8 w-42"/>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar

