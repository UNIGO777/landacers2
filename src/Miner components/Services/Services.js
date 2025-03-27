import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ArrowRight, Check, Zap, Shield, Clock, ExternalLink, Home, Wallet, BarChart2, Building2, Search, TrendingUp, Users, Landmark, Paintbrush, Scale, Compass, Hammer, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesNew = () => {
  // State for active category and expanded service
  const [activeCategory, setActiveCategory] = useState('popular');
  const [expandedService, setExpandedService] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Service categories
  const categories = [
    { id: 'popular', name: 'Popular Services' },
    { id: 'property', name: 'Property Services' },
    { id: 'professional', name: 'Professional Services' },
    { id: 'consultation', name: 'Consultation Services' }
  ];

  // Services data organized by category
  const servicesByCategory = {
    popular: [
      {
        id: 'sell',
        title: "Sell Properties",
        description: "Unlock the potential of your property. List your property for sale and connect with interested buyers quickly and efficiently.",
        features: [
          "Professional property listing",
          "Market analysis and pricing strategy",
          "Targeted marketing to potential buyers",
          "Negotiation support"
        ],
        icon: Home,
        buttonText: "List Your Property",
        bgImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2071&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/saller/login"
      },
      {
        id: 'mortgage',
        title: "Mortgage Services",
        description: "Find the best financing options for your property purchase. Our mortgage experts will guide you through the entire process.",
        features: [
          "Competitive interest rates",
          "Flexible repayment options",
          "Fast pre-approval process",
          "Expert guidance throughout"
        ],
        icon: Wallet,
        buttonText: "Explore Financing",
        bgImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/mortgage"
      },
      {
        id: 'valuation',
        title: "Property Valuation",
        description: "Get an accurate assessment of your property's worth. Our valuation experts use market data and analytics for precise estimates.",
        features: [
          "Comprehensive market analysis",
          "Detailed valuation report",
          "Expert local market insights",
          "Fast turnaround time"
        ],
        icon: BarChart2,
        buttonText: "Get Valuation",
        bgImage: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=2073&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/valuation"
      },
    ],
    property: [
      {
        id: 'management',
        title: "Property Management",
        description: "Let us handle the complexities of managing your property. From tenant screening to maintenance, we've got you covered.",
        features: [
          "Tenant screening and selection",
          "Rent collection and accounting",
          "Property maintenance coordination",
          "Regular property inspections"
        ],
        icon: Building2,
        buttonText: "Learn More",
        bgImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/property-management"
      },
      {
        id: 'inspection',
        title: "Home Inspection",
        description: "Ensure your property is in perfect condition. Our thorough inspection services identify potential issues before they become problems.",
        features: [
          "Comprehensive structural assessment",
          "Electrical and plumbing inspection",
          "Detailed inspection report",
          "Repair recommendations"
        ],
        icon: Search,
        buttonText: "Book Inspection",
        bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/inspection"
      },
      {
        id: 'investment',
        title: "Investment Advisory",
        description: "Make informed real estate investment decisions. Our advisors analyze market trends and help you maximize your returns.",
        features: [
          "Market trend analysis",
          "Investment opportunity identification",
          "ROI projections and analysis",
          "Portfolio diversification strategy"
        ],
        icon: TrendingUp,
        buttonText: "Get Advice",
        bgImage: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=2069&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/investment"
      },
    ],
    professional: [
      {
        id: 'agents',
        title: "Agents / Brokers",
        description: "Here Are Hassle-Free Solutions! Buy - Sell - Rent Your Property with our network of experienced agents.",
        features: [
          "Experienced local agents",
          "Personalized property matching",
          "Market expertise and insights",
          "End-to-end transaction support"
        ],
        icon: Users,
        buttonText: "Find an Agent",
        bgImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1932&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/agents"
      },
      {
        id: 'builders',
        title: "Builders / Developers",
        description: "List of the most trusted and reliable builders to fulfill your Dream HOME.",
        features: [
          "Vetted quality builders",
          "Diverse project portfolios",
          "Transparent pricing and timelines",
          "Customization options"
        ],
        icon: Building2,
        buttonText: "Explore Builders",
        bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/builders"
      },
      {
        id: 'architects',
        title: "Architects / Architecture",
        description: "Professional Architecture will meet your needs and expectations.",
        features: [
          "Innovative design solutions",
          "Sustainable architecture options",
          "3D visualization and planning",
          "Regulatory compliance expertise"
        ],
        icon: Landmark,
        buttonText: "Connect with Architects",
        bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/architects"
      },
      {
        id: 'interior',
        title: "Interior Decorators",
        description: "A One-Stop Solution for all your decor Needs to Match Your Lifestyle.",
        features: [
          "Personalized design concepts",
          "Material and color consultation",
          "Furniture and accessory sourcing",
          "Project management"
        ],
        icon: Paintbrush,
        buttonText: "Hire a Decorator",
        bgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/interior-decorators"
      },
    ],
    consultation: [
      {
        id: 'legal',
        title: "Legal Assistance",
        description: "Navigate the legal aspects of real estate with our expert assistance. Get help with documentation, contracts, and compliance.",
        features: [
          "Contract review and preparation",
          "Legal documentation assistance",
          "Compliance verification",
          "Dispute resolution support"
        ],
        icon: Scale,
        buttonText: "Get Legal Help",
        bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/legal"
      },
      {
        id: 'vaastu',
        title: "Vaastu Consultant",
        description: "Connect to top most Vastu consultants for right direction.",
        features: [
          "Property Vastu analysis",
          "Remedial solutions",
          "New construction planning",
          "Personalized consultations"
        ],
        icon: Compass,
        buttonText: "Book Consultation",
        bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/vaastu"
      },
      {
        id: 'contractors',
        title: "Building Contractors",
        description: "General contractor for a home repair, remodel, or construction.",
        features: [
          "Skilled construction teams",
          "Quality material sourcing",
          "Project timeline management",
          "Budget optimization"
        ],
        icon: Hammer,
        buttonText: "Find Contractors",
        bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/contractors"
      },
      {
        id: 'consultants',
        title: "Property Consultants",
        description: "List of Leading Real Estate Consultant for Professional Assistance Services.",
        features: [
          "Market analysis and insights",
          "Investment strategy development",
          "Property portfolio optimization",
          "Customized real estate solutions"
        ],
        icon: Briefcase,
        buttonText: "Consult an Expert",
        bgImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/consultants"
      },
    ],
  };

  // Toggle expanded service
  const toggleService = (serviceId) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };

  // Get current services based on active category
  const currentServices = servicesByCategory[activeCategory] || [];

  return (
    <div className="py-16 px-4 md:px-8 bg-white text-gray-800">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 bg-blue-100 p-2 rounded-xl"
          >
            <div className="bg-white rounded-lg px-4 py-1 border border-blue-200">
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Elite Services</span>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Exceptional Real Estate Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our comprehensive suite of real estate solutions designed to transform your property journey into a seamless experience.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'}`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full`}
            >
              {/* Service Header */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                          <service.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">{service.title}</h3>
                      </div>
                      <div 
                        onClick={() => toggleService(service.id)}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      >
                        {expandedService === service.id ? <ChevronDown size={18} className="text-white" /> : <ChevronRight size={18} className="text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                
                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-6"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-blue-600">Key Features</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start bg-blue-50 p-3 rounded-lg">
                            <div className="mr-3 mt-1">
                              <Check size={16} className="text-blue-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <Link 
                  to={service.link} 
                  className="mt-4 group flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>{service.buttonText}</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Flow Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 text-center relative"
        >
          <div className="absolute inset-0 bg-blue-50 rounded-3xl -z-10"></div>
          
          <div className="py-16 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 bg-blue-100 p-2 rounded-xl"
            >
              <div className="bg-white rounded-lg px-4 py-1 border border-blue-200">
                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Streamlined Process</span>
              </div>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-16">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div 
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg group"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Choose a Service</h3>
                <p className="text-gray-600">Browse our comprehensive range of real estate services and select what fits your unique needs and goals.</p>
                
                {/* Connector line - visible only on desktop */}
                <div className="hidden md:block absolute top-1/2 left-full w-12 h-2 bg-blue-200 -z-10 transform -translate-x-6"></div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg group"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Connect with Experts</h3>
                <p className="text-gray-600">Our team of specialists will reach out to understand your specific requirements and provide tailored solutions.</p>
                
                {/* Connector line - visible only on desktop */}
                <div className="hidden md:block absolute top-1/2 left-full w-12 h-2 bg-blue-200 -z-10 transform -translate-x-6"></div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg group"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Get Results</h3>
                <p className="text-gray-600">Experience seamless execution and achieve your real estate goals with our professional support and guidance.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-32 relative overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-12 md:p-16 shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 bg-white/20 p-2 rounded-xl backdrop-blur-sm"
              >
                <div className="bg-white/20 rounded-lg px-4 py-1">
                  <span className="text-white font-semibold tracking-wider uppercase text-sm">Custom Solutions</span>
                </div>
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Need a Tailored Service?</h3>
              <p className="text-blue-50 text-lg max-w-2xl mx-auto mb-10">We offer customized real estate solutions designed specifically for your unique needs and goals. Our team of experts is ready to provide personalized assistance.</p>
              
              <a 
                href="/contact" 
                className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-medium py-4 px-10 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-lg group"
              >
                <span>Contact Us Today</span>
                <ExternalLink size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesNew;