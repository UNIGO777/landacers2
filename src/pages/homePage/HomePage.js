import React, { useState, useRef, useEffect } from 'react'
import Banner from '../../components/banner/Banner'
import ImageList from '../../components/imageList/ImageList';
import { cardsData, images } from '../../tempData/data'
import SreenCarosel from '../../components/FullScreenCarosel/FullScreenCarosel';
import UpcommingProjectsData from '../../Assets/StaticData/UpcomingProjects';
import ServiceBaner from '../../components/ServiceBaner/ServiceBaner';
import Services from '../../Miner components/Services/Services';
import Card from '../../components/card/Card';
import CardCarousel from '../../components/cardCarousel/CardCarousel';
import axios from 'axios';
import CardCarosel from '../../components/loaders/CardCarouselLoader';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Building, MapPin, TrendingUp, Award, Star, Users, Clock, ChevronDown, ChevronUp, Search, DollarSign, BarChart2, Map, Heart } from 'lucide-react';
import Rating from '../../components/Rating component/Rating';

const backend_url = process.env.REACT_APP_backendUrl

function HomePage({setLoginOpen}) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [stats, setStats] = useState({
    properties: 500,
    projects: 120,
    cities: 35,
    clients: 1200
  });
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      quote: "Land Acre helped me find my dream home in just two weeks! Their team was professional, responsive, and truly understood what I was looking for.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
      quote: "As a real estate investor, I've worked with many agencies, but Land Acre stands out for their market knowledge and dedication to finding profitable opportunities.",
      rating: 5
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "First-time Buyer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
      quote: "Being a first-time buyer was intimidating, but Land Acre guided me through every step of the process with patience and expertise. Couldn't be happier!",
      rating: 4
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I start the process of buying a property?",
      answer: "Begin by browsing our listings online, then contact us to schedule viewings of properties that interest you. Our agents will guide you through the entire buying process, from property selection to closing the deal."
    },
    {
      question: "What documents do I need to sell my property?",
      answer: "You'll need property ownership documents, tax records, utility bills, and any relevant permits or certificates. Our team will help you gather all necessary documentation for a smooth selling process."
    },
    {
      question: "How long does it typically take to sell a property?",
      answer: "The timeline varies depending on market conditions, property type, location, and pricing. On average, properties sell within 30-90 days, but our marketing strategies aim to minimize this timeframe."
    },
    {
      question: "Do you offer property management services?",
      answer: "Yes, we provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, and regular property inspections to ensure your investment is well-maintained."
    },
    {
      question: "What areas do you serve?",
      answer: "We operate in major metropolitan areas and surrounding suburbs, with a strong presence in residential, commercial, and industrial real estate markets across the region."
    }
  ];

  // Market trends data
  const marketTrends = [
    {
      title: "Rising Property Values",
      percentage: "+8.5%",
      description: "Year-over-year increase in residential property values",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Rental Yield Growth",
      percentage: "+4.2%",
      description: "Average rental yield increase in prime locations",
      icon: DollarSign,
      color: "text-blue-500"
    },
    {
      title: "New Development Surge",
      percentage: "+12%",
      description: "Increase in new construction projects",
      icon: Building,
      color: "text-purple-500"
    }
  ];

  // Featured neighborhoods
  const neighborhoods = [
    {
      name: "Riverside Heights",
      description: "Luxurious waterfront living with modern amenities and scenic views",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      properties: 24
    },
    {
      name: "Greenwood Park",
      description: "Family-friendly community with excellent schools and green spaces",
      image: "https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=2070&auto=format&fit=crop",
      properties: 18
    },
    {
      name: "Metro Central",
      description: "Urban living at its finest with proximity to business districts and entertainment",
      image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop",
      properties: 31
    }
  ];
  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [propertiesRes, upcomingRes, featuredRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_backendUrl}/api/feature-items?itemType=Property`),
          axios.get(`${process.env.REACT_APP_backendUrl}/api/feature-items?itemType=Project&upcomming=true`),
          axios.get(`${process.env.REACT_APP_backendUrl}/api/feature-items?itemType=Project`)
        ]);
        
        setFeaturedProperties(propertiesRes.data.data);
        setUpcomingProjects(upcomingRes.data.data);
        setFeaturedProjects(featuredRes.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(testimonialInterval);
  }, []);
 

  // Animation variants for scroll animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Banner />
      
      {/* Stats Section */}
      

      {/* Market Trends Section */}
      
      
      {/* Featured Properties Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Featured Properties</h2>
              <p className="text-gray-600 mt-2">Discover our handpicked selection of premium properties</p>
            </div>
           
          </div>
        </div>
        
        {featuredProperties.length > 0 ? (
          <CardCarousel 
            title=""
            className="mt-4 px-3 md:px-10 pb-5 md:pb-10"
          >
            {Array.isArray(featuredProperties) && featuredProperties.map((card, index) => (
              <motion.div 
                key={index} 
                className="px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  card={{
                    image: `${backend_url}/storage/${card.itemId.propertyMedia.photos[0]}`,
                    title: card.itemId.propertyTitle,
                    price: card?.itemId?.pricingDetails ? 
                      card.itemId?.transactionType === "Sell" ? 
                        card?.itemId?.pricingDetails?.salePrice : 
                      card.itemId?.transactionType === "Rent" ? 
                        card?.itemId?.pricingDetails?.rent : 
                        card?.itemId?.pricingDetails?.pgPrice : "upcomming",
                    location: `${card?.itemId?.locationSchemaId.locality}, ${card?.itemId?.locationSchemaId.city}`,
                    _id: card?.itemId?._id,
                    transactionType: card.itemId.transactionType
                  }}
                />
              </motion.div>
            ))}
          </CardCarousel>
        ) : (
          <CardCarosel/>
        )}
        
        
      </motion.div>

      

      {/* Featured Neighborhoods Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Explore Popular Neighborhoods</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Discover the most sought-after communities with exceptional amenities and lifestyle options</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative rounded-xl overflow-hidden shadow-lg group h-80"
              >
                <img 
                  src={neighborhood.image} 
                  alt={neighborhood.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{neighborhood.name}</h3>
                    <p className="text-white/80 mb-3 text-sm">{neighborhood.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        {neighborhood.properties} Properties
                      </span>
                      {/* <a href="/properties" className="text-white hover:text-blue-200 text-sm font-medium flex items-center">
                        Explore
                        <ArrowRight size={14} className="ml-1" />
                      </a> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Showcase Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-12 bg-gray-50"
      >
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3">Explore Our Projects</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">From upcoming developments to our signature completed projects, find your ideal investment opportunity</p>
        </div>
        
        <div className='flex flex-col md:flex-row w-full md:px-10 gap-8'>
          <motion.div 
            className={'md:w-1/2'}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SreenCarosel 
              Title={"Upcoming Featured Projects"} 
              className={'md:w-full'} 
              description="Discover our exclusive collection of upcoming projects with premium amenities and prime locations." 
              data={upcomingProjects} 
            />
          </motion.div>
          <motion.div 
            className={'md:w-1/2'}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SreenCarosel 
              Title={"Our Signature Projects"} 
              className={'md:w-full'} 
              description="Discover our premium portfolio of completed projects showcasing architectural excellence and luxurious amenities." 
              data={featuredProjects} 
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Success Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">Discover why our clients trust Land Acre for their real estate journey</p>
          </motion.div>

          <div className="max-w-6xl mx-auto relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out" 
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-6">
                    <motion.div 
                      className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative backdrop-blur-sm bg-opacity-90 border border-gray-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-blue-100">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                            <Star className="w-5 h-5 text-white fill-current" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-center md:justify-start mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                            <p className="text-blue-600 font-medium">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center mt-12 gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`group relative w-12 h-2 rounded-full transition-all duration-300 
                    ${activeTestimonial === index ? 'bg-blue-600 w-20' : 'bg-gray-300 hover:bg-blue-400'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 
                    bg-blue-600 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300`}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Property Listing CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Sell or Rent Your Property?
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-blue-100"
            >
              List your property with Land Acre and connect with thousands of potential buyers and tenants
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a href="/saller/login" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                Post Your Property Now
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Find answers to common questions about our real estate services</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="mb-4 border-b border-gray-200 pb-4 last:border-b-0"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left py-4 px-2 focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                  {activeFaq === index ? 
                    <ChevronUp className="w-5 h-5 text-blue-600" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  }
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-2 pb-4 text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center mt-10">
            <a href="/contact" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
              <span className="mr-2">Have more questions? Contact us</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Section with Animation */}
      <motion.div
        // initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 block w-full overflow-x-hidden"
      >
        <motion.h2 
          variants={fadeInUp}
          className="text-2xl md:text-4xl font-bold text-center mb-12 px-4"
        >
          Services We Offer
        </motion.h2>
        
        <div className="w-full overflow-x-auto">
          <Services />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Current Market Trends</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Stay informed with the latest real estate market insights and trends to make better investment decisions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketTrends.map((trend, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{trend.title}</h3>
                  <trend.icon className={`w-8 h-8 ${trend.color}`} />
                </div>
                <p className={`text-3xl font-bold mb-2 ${trend.color}`}>{trend.percentage}</p>
                <p className="text-gray-600">{trend.description}</p>
              </motion.div>
            ))}
          </div>

          {/* <motion.div variants={fadeInUp} className="text-center mt-10">
            <a href="/market-insights" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
              <span className="mr-2">View detailed market analysis</span>
              <ArrowRight size={16} />
            </a>
          </motion.div> */}
        </div>
      </motion.div>

      <Rating setLoginOpen={setLoginOpen}/>

      <ServiceBaner
        demantionChange
        link={"/saller/login"}
        Title="Become a Broker with Us"
        description="Join our team and unlock the potential to earn by connecting buyers and sellers in the real estate market. As a broker, you will have access to exclusive listings, training, and support to help you succeed."
        SubTitle="Register today to start your journey with us as a real estate broker"
        buttonDescription="Join Us Now"
        image="https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      
      <br/>

      
    </>
  )
}

export default HomePage