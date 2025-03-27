import React from 'react';
import { FaBuilding, FaUsers, FaHandshake, FaAward, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ROUTES_NAME from '../../constants/routes';

function AboutPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const statsData = [
    { icon: <FaBuilding size={30} />, count: '5000+', label: 'Properties Listed' },
    { icon: <FaUsers size={30} />, count: '2500+', label: 'Happy Clients' },
    { icon: <FaHandshake size={30} />, count: '500+', label: 'Expert Agents' },
    { icon: <FaAward size={30} />, count: '8+', label: 'Years Experience' },
  ];

 

  const milestones = [
    { year: '2015', title: 'Company Founded', description: 'LandAcre was established with a vision to transform the real estate market in India.' },
    { year: '2017', title: 'Expanded Operations', description: 'Opened offices in 5 major metropolitan cities across India.' },
    { year: '2019', title: 'Digital Transformation', description: 'Launched our AI-powered platform to connect buyers and sellers with personalized recommendations.' },
    { year: '2021', title: 'Market Leader', description: 'Became one of India\'s fastest-growing property marketplaces with over 25,000 successful deals.' },
    { year: '2023', title: 'Technology Innovation', description: 'Introduced virtual property tours and blockchain-based property verification systems.' },
  ];

  return (
    <div className='w-full bg-white'>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)' }}> 
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About LandAcre
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your Trusted Partner in Real Estate Since 2015
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Our Story</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Building Dreams Since 2015</h3>
            <p className="text-gray-600 mb-4">
              LandAcre was founded with a simple mission: to revolutionize the real estate experience in India. What started as a small team of passionate real estate enthusiasts has grown into one of India's most innovative and trusted property platforms.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey began in 2015 when our founders recognized the fragmentation and lack of transparency in the real estate market. With determination and a clear vision, LandAcre was established to create a seamless bridge between property seekers and providers.
            </p>
            <p className="text-gray-600">
              Today, we pride ourselves on our extensive property listings, cutting-edge technology, expert market insights, and dedicated customer service. Our platform connects thousands of buyers, sellers, and agents every day, facilitating successful property transactions across the country with trust and transparency at the core of everything we do.
            </p>
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="LandAcre Office Building" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Our Mission & Vision</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaBuilding className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-600 text-center">
                To transform the real estate experience by providing a transparent, efficient, and user-friendly platform that connects property seekers with their dream spaces. We strive to make property transactions accessible to everyone through innovative technology, data-driven insights, and exceptional personalized service.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaChartLine className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">Our Vision</h3>
              <p className="text-gray-600 text-center">
                To be the most trusted and preferred real estate platform in India, known for our integrity, innovation, and customer-centric approach. We envision a future where finding and acquiring property is a joyful journey rather than a stressful process, empowering individuals to make informed decisions about their real estate investments through cutting-edge technology and unparalleled market expertise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index}
                className="p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.count}</h3>
                <p className="text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Our Journey</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          {/* Timeline Items */}
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index} 
              className={`relative z-10 mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`order-1 w-5/12 ${index % 2 !== 0 && 'text-right'}`}>
                <div className={`p-6 rounded-lg shadow-md bg-white border-l-4 border-blue-600`}>
                  <h3 className="font-bold text-blue-600 text-xl mb-1">{milestone.year}</h3>
                  <h4 className="font-semibold text-lg mb-2">{milestone.title}</h4>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
              <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg"></h1>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-blue-600 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5"></path>
                <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5"></path>
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Property?</h2>
                <p className="text-blue-100 text-lg max-w-2xl">
                  Whether you're looking to buy, sell, or rent, our team of real estate experts and cutting-edge technology is here to guide you every step of the way toward your perfect property match.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to={ROUTES_NAME.SEARCH_RESULTS} className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center">
                  Browse Properties
                </Link>
                <Link to={ROUTES_NAME.CONTACT} className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;