import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiDollarSign, FiHome, FiTrendingUp, FiUsers, FiAward, FiX, FiSend, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ScheduleConsultation from './ScheduleConsultation';

const RealEstateAdvice = () => {
  // State for modals and popups
  const [showAdviceForm, setShowAdviceForm] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  // Advice categories data
  const adviceCategories = [
    {
      icon: <FiHome className="w-6 h-6" />,
      title: "Buying Advice",
      description: "Expert guidance on purchasing properties, from initial search to closing the deal.",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      details: "Our buying advice service provides comprehensive guidance through every step of the property purchase process. From identifying your needs and budget to negotiating the best deal and completing the paperwork, our experts will be with you every step of the way. We'll help you understand market conditions, property valuations, and potential investment returns to ensure you make an informed decision."
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Selling Strategies",
      description: "Maximize your property's value with proven selling techniques and market insights.",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      details: "Our selling strategies are designed to help you achieve the maximum value for your property in the current market. We provide tailored advice on pricing, staging, marketing, and negotiation tactics. Our experts will analyze your property's unique features and the local market conditions to create a customized selling plan that highlights your property's strengths and appeals to the right buyers."
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Investment Tips",
      description: "Learn how to build a profitable real estate portfolio with strategic investment advice.",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      details: "Our investment tips service helps both novice and experienced investors build and optimize their real estate portfolios. We provide analysis of market trends, potential growth areas, and return on investment calculations. Our experts will help you understand different investment strategies, from buy-to-let and fix-and-flip to long-term appreciation plays, and identify which approach best suits your financial goals and risk tolerance."
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Property Management",
      description: "Effective strategies for managing rental properties and maximizing returns.",
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      details: "Our property management advice covers all aspects of rental property ownership, from tenant screening and lease agreements to maintenance scheduling and financial reporting. We'll help you understand landlord-tenant laws, optimize your rental income, and implement efficient systems to reduce the stress of property ownership. Our experts can guide you through common challenges and help you build a sustainable, profitable rental business."
    }
  ];

  // Featured advice articles
  const featuredArticles = [
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      category: "Buying",
      title: "How to Find Your Dream Property in Today's Market",
      excerpt: "Navigate the competitive real estate market with these expert strategies and insider tips.",
      content: "Finding your dream property in today's competitive market requires strategy, patience, and insider knowledge. This comprehensive guide walks you through the essential steps to secure the perfect property at the right price.\n\nFirst, establish your non-negotiables versus nice-to-haves. In a competitive market, flexibility on certain features can open up more options. Next, get pre-approved for financing before you start searching - this gives you credibility with sellers and a clear budget.\n\nWork with a local real estate agent who understands the specific neighborhoods you're targeting. They'll have access to off-market properties and can provide insights on fair pricing. Consider properties that have been on the market for over 30 days, as sellers may be more willing to negotiate.\n\nDon't overlook properties with poor listing photos or descriptions - these often receive less attention and may offer great value. Be prepared to act quickly when you find the right property, but never skip important inspections or due diligence.\n\nFinally, write a compelling offer letter that connects with the seller on a personal level. In competitive situations, this human connection can make all the difference."
    },
    {
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
      category: "Investment",
      title: "Top 5 Emerging Real Estate Markets to Watch",
      excerpt: "Discover high-potential investment opportunities in these up-and-coming real estate markets.",
      content: "Savvy real estate investors know that identifying emerging markets before they become mainstream can lead to exceptional returns. Our analysis has identified five markets showing strong indicators for growth in the coming years.\n\n1. **Pune, Maharashtra** - With expanding IT and manufacturing sectors, Pune continues to attract young professionals. Infrastructure improvements and relatively affordable housing compared to Mumbai make this a prime growth market.\n\n2. **Hyderabad, Telangana** - The city's robust IT corridor and business-friendly policies have created steady demand for both residential and commercial properties. New infrastructure projects are further enhancing connectivity and livability.\n\n3. **Ahmedabad, Gujarat** - As a major industrial center with improving urban infrastructure, Ahmedabad offers attractive entry prices with strong appreciation potential. The GIFT City development is creating new opportunities for commercial investment.\n\n4. **Kochi, Kerala** - This coastal city is emerging as a technology and tourism hub. The completion of the metro system and Smart City initiatives are driving property values upward in key neighborhoods.\n\n5. **Chandigarh Tri-city Area** - The region encompassing Chandigarh, Panchkula, and Mohali offers stable governance, quality infrastructure, and growing commercial activity, making it attractive for long-term investment.\n\nWhen investing in these markets, focus on properties near major employment centers, educational institutions, and planned infrastructure improvements for maximum appreciation potential."
    },
    {
      image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "Selling",
      title: "Staging Secrets That Sell Properties Faster",
      excerpt: "Learn professional staging techniques that can help your property stand out and sell quickly.",
      content: "Effective property staging can significantly reduce time on market and increase sale price. These professional staging secrets will help your property make a lasting impression on potential buyers.\n\nStart with a deep clean and declutter - this is the foundation of good staging. Remove personal items and excess furniture to make spaces appear larger and help buyers envision themselves in the home. Aim to remove about 30% of your belongings from each room.\n\nCreate a neutral palette by repainting bold walls in warm, neutral tones. This doesn't mean your home should be devoid of color - strategic pops of color through accessories can create visual interest without overwhelming buyers.\n\nMaximize natural light by removing heavy drapes, cleaning windows, and strategically placing mirrors to reflect light. Add layers of lighting with table lamps, floor lamps, and accent lighting to create a warm, inviting atmosphere.\n\nFocus on the kitchen and bathrooms, as these rooms often sell homes. Simple updates like new cabinet hardware, fresh caulk, and modern light fixtures can transform these spaces without major renovation.\n\nDon't neglect curb appeal - the exterior is the first thing buyers see. Fresh paint on the front door, well-maintained landscaping, and clean walkways set a positive tone for the entire viewing.\n\nFinally, add lifestyle elements that help buyers connect emotionally - a set table suggesting family dinners, a reading nook with a throw blanket, or a workspace setup that showcases the home's functionality."
    }
  ];

  // Services data
  const services = [
    {
      icon: <FiHome />,
      title: "Property Valuation",
      description: "Get accurate, market-based valuations for your property from our expert team.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      details: "Our property valuation service provides you with an accurate, data-driven assessment of your property's current market value. Our experts analyze recent comparable sales, local market trends, property condition, and unique features to determine a competitive and realistic valuation. This service is essential for sellers setting an asking price, buyers making an offer, investors evaluating opportunities, or homeowners refinancing or insuring their property. We provide a comprehensive report with our findings and are available to explain our methodology and answer any questions."
    },
    {
      icon: <FiAward />,
      title: "Legal Consultation",
      description: "Navigate complex real estate laws with guidance from our experienced legal advisors.",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      details: "Our legal consultation service connects you with experienced real estate attorneys who can guide you through the complex legal aspects of property transactions. From reviewing purchase agreements and lease contracts to resolving boundary disputes and understanding zoning regulations, our legal experts ensure your interests are protected. We offer clear explanations of legal terminology, verification of property titles and encumbrances, and guidance on compliance with local regulations. This service helps you avoid costly legal pitfalls and proceed with confidence in your real estate decisions."
    },
    {
      icon: <FiTrendingUp />,
      title: "Market Analysis",
      description: "Stay ahead with detailed market reports and trend analysis for informed decisions.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      details: "Our market analysis service provides comprehensive insights into current real estate trends, helping you make data-driven decisions. We analyze supply and demand dynamics, price movements, inventory levels, and demographic shifts across different property segments and locations. Our reports include forecasting based on historical data and economic indicators, giving you a clear picture of where the market is heading. Whether you're planning to buy, sell, or invest, our market analysis equips you with the knowledge to time your decisions optimally and identify opportunities others might miss."
    },
    {
      icon: <FiUsers />,
      title: "Investment Planning",
      description: "Create a customized real estate investment strategy aligned with your financial goals.",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      details: "Our investment planning service helps you build a real estate portfolio that aligns with your financial goals and risk tolerance. We begin with a thorough assessment of your current financial situation, investment objectives, and timeline. Based on this analysis, our experts develop a customized investment strategy that may include residential rentals, commercial properties, REITs, or development projects. We provide cash flow projections, expected returns, tax implications, and financing options for each recommended investment. Our ongoing support ensures your portfolio remains optimized as market conditions and your personal circumstances evolve."
    },
    {
      icon: <FiDollarSign />,
      title: "Financing Guidance",
      description: "Explore financing options and get expert advice on securing the best rates.",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      details: "Our financing guidance service helps you navigate the complex world of real estate financing to secure the most favorable terms. We analyze your financial profile and property objectives to recommend appropriate financing structures, whether conventional mortgages, construction loans, or investment property financing. Our experts explain different interest rate options, down payment requirements, and loan terms in clear, straightforward language. We can connect you with trusted lenders offering competitive rates and help you prepare a strong application package. With our guidance, you'll understand the long-term implications of different financing choices and make decisions that optimize your financial position."
    },
    {
      icon: <FiBookOpen />,
      title: "Educational Resources",
      description: "Access our library of guides, webinars, and workshops on all aspects of real estate.",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
      details: "Our educational resources service provides comprehensive learning materials for every stage of your real estate journey. Our library includes detailed guides on buying, selling, investing, and property management, written by industry experts in clear, accessible language. We offer regular webinars on current market trends, investment strategies, and regulatory changes, with opportunities to ask questions directly to our specialists. Our hands-on workshops cover practical skills like property evaluation, negotiation techniques, and rental management. Whether you're a first-time homebuyer or an experienced investor, our educational resources will enhance your knowledge and confidence in real estate decisions."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "The advice I received helped me find my dream home at a price I could afford. I couldn't be happier with the guidance and support throughout the process.",
      author: "Priya Sharma",
      position: "First-time Homebuyer"
    },
    {
      quote: "As an investor, the market insights provided by LandAcre have been invaluable. Their advice has significantly improved my portfolio's performance.",
      author: "Rajiv Mehta",
      position: "Real Estate Investor"
    },
    {
      quote: "The selling strategies recommended by the team helped me sell my property 15% above market value. Their expertise is truly exceptional.",
      author: "Ananya Patel",
      position: "Property Seller"
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    toast.success('Your request has been submitted. We will contact you shortly!');
    
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      message: ''
    });
    setShowAdviceForm(false);
  };

  // Open article modal
  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  // Open service modal
  const openServiceModal = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  return (
    <div className="bg-gray-50 mt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Expert Real Estate Advice</h1>
            <p className="text-xl md:text-2xl mb-8">Navigate the real estate market with confidence using our professional guidance and insights</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowAdviceForm(true)}
                className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md"
              >
                Get Personalized Advice
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition duration-300">
                Explore Resources
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advice Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Real Estate Expertise You Can Trust</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive advice for every stage of your real estate journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adviceCategories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <div className={`${category.color} p-4 flex justify-center`}>
                  <div className="bg-white p-3 rounded-full">
                    {category.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                  <button 
                    onClick={() => {
                      setSelectedService({
                        title: category.title,
                        details: category.details,
                        icon: category.icon,
                        iconColor: category.color.replace('bg-', 'text-')
                      });
                      setShowServiceModal(true);
                    }}
                    className={`mt-4 ${category.color} ${category.hoverColor} text-white px-4 py-2 rounded-lg text-sm transition duration-300`}
                  >
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Advice & Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stay informed with our latest articles and expert advice</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-blue-600 mb-2 block">{article.category}</span>
                  <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-300">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button 
                    onClick={() => openArticleModal(article)}
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Professional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive real estate services tailored to your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <div className={`${service.bgColor} p-6 rounded-lg flex items-center mb-4`}>
                  <div className={`${service.iconColor} text-2xl`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold ml-4">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <button 
                  onClick={() => openServiceModal(service)}
                  className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 flex items-center text-sm"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real success stories from people who trusted our expertise</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <div className="mb-6">
                  {/* Quote icon */}
                  <svg className="h-10 w-10 text-blue-100 absolute top-6 left-6 -z-10" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 relative z-10">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 md:p-16 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Informed Real Estate Decisions?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Connect with our experts today and get personalized advice for your real estate journey.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => setShowConsultationModal(true)}
                className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md"
              >
                Schedule a Consultation
              </button>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalized Advice Form Modal */}
      <AnimatePresence>
        {showAdviceForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAdviceForm(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAdviceForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get Personalized Advice</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                    <option value="investment">Investment Property</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your real estate needs"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {showArticleModal && selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={() => setShowArticleModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-h-[90vh] overflow-y-auto max-w-3xl p-6 relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowArticleModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
              
              <div className="h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                {selectedArticle.category}
              </span>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h3>
              
              <div className="prose prose-lg max-w-none">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Articles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {showServiceModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowServiceModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-w-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowServiceModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
              
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-full ${selectedService.iconColor ? selectedService.iconColor.replace('text-', 'bg-').replace('-500', '-100') : 'bg-blue-100'} mr-4`}>
                  <div className={selectedService.iconColor || 'text-blue-500'}>
                    {selectedService.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedService.title}</h3>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600">{selectedService.details}</p>
              </div>
              
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
                
                <button
                  onClick={() => {
                    setShowServiceModal(false);
                    setShowAdviceForm(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
                >
                  Request This Service
                  <FiChevronRight className="ml-1" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Consultation Modal */}
      <ScheduleConsultation 
        isOpen={showConsultationModal} 
        onClose={() => setShowConsultationModal(false)} 
      />
    </div>
  );
};

export default RealEstateAdvice;