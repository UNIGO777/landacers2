import React from "react";
import { motion } from "framer-motion";

const ProjectListLoader = () => {
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <motion.div
                    className="h-16 w-16 bg-gray-200 rounded-lg mr-4"
                    variants={shimmerAnimation}
                  />
                  <div className="space-y-2">
                    <motion.div
                      className="h-4 bg-gray-200 rounded w-32"
                      variants={shimmerAnimation}
                    />
                    <motion.div
                      className="h-3 bg-gray-200 rounded w-24"
                      variants={shimmerAnimation}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <motion.div
                  className="h-4 bg-gray-200 rounded w-24"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="px-6 py-4">
                <motion.div
                  className="h-6 bg-gray-200 rounded-full w-20"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <motion.div
                    className="h-3 bg-gray-200 rounded w-16"
                    variants={shimmerAnimation}
                  />
                  <motion.div
                    className="h-3 bg-gray-200 rounded w-16"
                    variants={shimmerAnimation}
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <motion.div
                    className="h-8 w-8 bg-gray-200 rounded"
                    variants={shimmerAnimation}
                  />
                  <motion.div
                    className="h-8 w-8 bg-gray-200 rounded"
                    variants={shimmerAnimation}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <motion.div
          className="h-4 bg-gray-200 rounded w-48"
          variants={shimmerAnimation}
        />
        <div className="flex space-x-2">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="h-8 w-8 bg-gray-200 rounded"
              variants={shimmerAnimation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectListLoader;
