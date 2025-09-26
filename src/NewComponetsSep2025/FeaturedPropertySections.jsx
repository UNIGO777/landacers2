import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/card/Card';
import { useProperty } from '../Hooks';
import CardCarosel from '../components/loaders/CardCarouselLoader';
import { ArrowRight } from 'lucide-react';

const FeaturedPropertySections = () => {
  const { featuredProperties, featuredLoading, fetchFeaturedProperties } = useProperty();

  React.useEffect(() => {
    fetchFeaturedProperties();
  }, [fetchFeaturedProperties]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="py-16 " // Blue theme background
    >
      <div className=" mx-auto px-10">
        

        <div className="flex justify-between items-center mb-8">
          
          <motion.div variants={fadeInUp} className="text-left ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 ">Popular Owner Properties</h2>
          <p className="text-gray-600 max-w-3xl mx-auto edu-nsw-act-cursive">Discover our handpicked selection of premium properties across India</p>
        </motion.div>
          <a href="/properties" className="text-[#3a78ff] hover:text-blue-700 font-medium flex items-center">
            See all Properties
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        {!featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.slice(0, 4).map((property, index) => (
              <div
                key={property._id || index}
                
                className="h-full"
              >
                <Card
                  card={{
                    image: property.itemId?.propertyMedia?.photos[0],
                    title: property.title || property.itemId?.propertyTitle,
                    price: property.price || property.itemId?.pricingDetails?.salePrice,
                    location: property.location || `${property.itemId?.locationSchemaId?.locality}, ${property.itemId?.locationSchemaId?.city}`,
                    _id:  property.itemId?._id,
                    transactionType: property.transactionType || property.itemId?.transactionType || 'Sell',
                    details: property.description || property.itemId?.description
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-[400px] bg-white rounded-xl shadow-md animate-pulse">
                <div className="h-[200px] bg-gray-200 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeaturedPropertySections;