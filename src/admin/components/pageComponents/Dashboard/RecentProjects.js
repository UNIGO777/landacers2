import React from 'react'
import { motion } from 'framer-motion'
import { FaBuilding } from 'react-icons/fa'
import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const RecentProjects = ({ analytics, loadingProperties }) => {
    return (
        <div className="p-6 relative bg-white rounded-xl shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Projects</h3>
            {loadingProperties ? (
                <div className="space-y-4 animate-pulse">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center p-3 border-b border-gray-100">
                            <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                            <div className="flex-1 ml-4">
                                <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded"></div>
                                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : analytics.projects.recent && analytics.projects.recent.length > 0 ? (
                <div className="space-y-3 max-h-[85%] overflow-y-scroll">
                    {analytics.projects.recent.slice(0, 5).map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 transition-colors border-b border-gray-100 hover:bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-md">

                                <FaBuilding className="w-6 h-6 text-purple-500" />

                            </div>
                            <div className="flex-1 ml-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-800">{project.projectName}</h4>
                                    <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                                        {project.projectType}
                                    </span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                    <span>Launch: {new Date(project.launchDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>No recent projects to display</p>
                </div>
            )}
            { analytics?.projects?.recent?.length > 0  && <Link to="/admin/properties" className="text-blue-500 rounded-b-xl flex justify-center bg-white border-t w-full left-0 p-3 text-center absolute bottom-0">
                View all projects <ArrowRightIcon className='ml-2' />
            </Link>}
        </div>
    )
}

export default RecentProjects