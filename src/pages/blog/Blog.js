import React from "react";
import { Link } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";
import ROUTES_NAME from "../../constants/routes";
import ComingSoon from "../../components/ComingSoon/ComingSoon";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600 mt-2">
            Insights, guides, and market updates from Land Acre
          </p>
        </div>

        <ComingSoon
          title="Our Blog Is Coming Soon"
          message="We are crafting helpful articles on buying, selling, trends, and investment insights. Stay tuned."
          icon={FaNewspaper}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg"></div>
              <div className="mt-4 h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="mt-2 h-4 bg-gray-100 rounded w-full"></div>
              <div className="mt-2 h-4 bg-gray-100 rounded w-4/5"></div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default Blog;

