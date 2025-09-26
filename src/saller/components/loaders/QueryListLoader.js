import React from "react";
import { motion } from "framer-motion";

const QueryListLoader = () => {
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Subject Name</th>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">User Contact</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="border-b">
              <td className="p-4">
                <motion.div
                  className="h-4 bg-gray-200 rounded w-48"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="p-4">
                <motion.div
                  className="h-4 bg-gray-200 rounded w-32"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="p-4">
                <motion.div
                  className="h-6 bg-gray-200 rounded-full w-20"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="p-4">
                <motion.div
                  className="h-4 bg-gray-200 rounded w-24"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="p-4">
                <motion.div
                  className="h-4 bg-gray-200 rounded w-32"
                  variants={shimmerAnimation}
                />
              </td>
              <td className="p-4">
                <motion.div
                  className="h-8 bg-gray-200 rounded w-16"
                  variants={shimmerAnimation}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="h-8 w-8 bg-gray-200 rounded"
            variants={shimmerAnimation}
          />
        ))}
      </div>
    </div>
  );
};

export default QueryListLoader;