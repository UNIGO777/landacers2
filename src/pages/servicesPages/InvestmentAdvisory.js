import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, DollarSign, PieChart, Target, CheckCircle, Briefcase } from 'lucide-react';
import { toast } from 'react-toastify';

const InvestmentAdvisoryPage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
  const [formErrors, setFormErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);

  // Service features
  const services = [
    {
      icon: <BarChart2 className="w-10 h-10 text-blue-600" />,
      title: "Market Analysis & Research",
      description: "In-depth analysis of real estate market trends, growth areas, and investment opportunities to inform your decision-making."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
      title: "Investment Strategy Development",
      description: "Customized investment strategies aligned with your financial goals, risk tolerance, and timeline."
    },
    {
      icon: <DollarSign className="w-10 h-10 text-blue-600" />,
      title: "ROI Forecasting",
      description: "Detailed projections of potential returns on investment, including rental yields, capital appreciation, and total returns."
    },
    {
      icon: <PieChart className="w-10 h-10 text-blue-600" />,
      title: "Portfolio Diversification",
      description: "Expert guidance on diversifying your real estate investments across different property types, locations, and risk profiles."
    },
    {
      icon: <Target className="w-10 h-10 text-blue-600" />,
      title: "Property Selection Assistance",
      description: "Professional help identifying and evaluating specific properties that match your investment criteria and objectives."
    },
    {
      icon: <Briefcase className="w-10 h-10 text-blue-600" />,
      title: "Investment Management",
      description: "Ongoing monitoring and management of your real estate investment portfolio to optimize performance and returns."
    }
  ];

  // Service packages
  const packages = [
    {
      title: "Basic Advisory",
      price: "$499",
      unit: "one-time fee",
      features: [
        "Initial investment consultation (1 hour)",
        "Basic market analysis report",
        "Investment strategy recommendations",
        "Property type guidance",
        "Email support for 30 days"
      ],
      recommended: false,
      buttonText: "Select Basic Package"
    },
    {
      title: "Comprehensive Advisory",
      price: "$999",
      unit: "one-time fee",
      features: [
        "Extended investment consultation (2 hours)",
        "Detailed market analysis with growth projections",
        "Customized investment strategy plan",
        "ROI forecasting for potential investments",
        "Property selection shortlist (up to 5 properties)",
        "Email and phone support for 60 days",
        "One follow-up consultation"
      ],
      recommended: true,
      buttonText: "Select Comprehensive Package"
    },
    {
      title: "Premium Advisory",
      price: "$2,499",
      unit: "per year",
      features: [
        "All Comprehensive Advisory features",
        "Quarterly investment strategy reviews",
        "Portfolio performance analysis",
        "Unlimited property evaluation assistance",
        "Investment opportunity alerts",
        "Priority access to exclusive listings",
        "Unlimited email and phone support",
        "Quarterly consultation sessions"
      ],
      recommended: false,
      buttonText: "Select Premium Package"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Land Acre's investment advisory service helped me build a real estate portfolio that's outperforming the market. Their data-driven approach and market insights were invaluable.",
      author: "Michael Foster",
      position: "Real Estate Investor",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop"
    },
    {
      quote: "As a first-time property investor, I was overwhelmed by options. The team at Land Acre provided clear guidance and helped me find properties with excellent growth potential.",
      author: "Sophia Martinez",
      position: "New Investor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How do you identify good investment opportunities?",
      answer: "We use a combination of data analytics, market research, and on-the-ground expertise to identify promising investment opportunities. Our analysis includes factors such as location growth metrics, rental yield potential, historical price appreciation, infrastructure development, and demographic trends. We also leverage our extensive network of industry contacts to access off-market opportunities."
    },
    {
      question: "What types of real estate investments do you advise on?",
      answer: "We provide advisory services across the full spectrum of real estate investments, including residential properties (single-family homes, multi-family units, apartments), commercial properties (office spaces, retail, industrial), vacation rentals, REITs (Real Estate Investment Trusts), real estate crowdfunding opportunities, and development projects. Our recommendations are tailored to your specific investment goals and risk profile."
    },
    {
      question: "How much capital do I need to start investing in real estate?",
      answer: "The capital required varies significantly depending on the investment strategy and location. Traditional property investments typically require a down payment of 20-25% of the property value, plus closing costs and reserves. However, we can also advise on alternative entry points with lower capital requirements, such as REITs, crowdfunding platforms, or partnership opportunities, which may start from as little as $1,000-$5,000."
    },
    {
      question: "What kind of returns can I expect from real estate investments?",
      answer: "Real estate investment returns vary based on property type, location, market conditions, and your investment strategy. Typically, residential rental properties might generate annual cash-on-cash returns of 4-8%, while commercial properties might yield 6-12%. Total returns including appreciation typically range from 10-15% annually over the long term. During our consultation, we'll provide more specific projections based on your investment criteria."
    },
    {
      question: "How do you help with risk management in real estate investing?",
      answer: "We employ several strategies to help manage investment risk, including thorough due diligence on all properties, diversification across different property types and locations, careful cash flow analysis with conservative assumptions, and contingency planning. We also help structure investments to provide downside protection and advise on appropriate insurance coverage and legal structures to mitigate liability risks."
    }
  ];

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  const validate = () => {
    const errors = {};
  
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
  
    if (!formData.investmentGoals) {
      errors.investmentGoals = 'Investment goals are required';
    }
  
    return errors;
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentGoals: '',
    investmentBudget: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Create form data for submission
      const formToSubmit = new FormData(e.target);
      
      // Submit the form using fetch API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formToSubmit
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            toast.success('Thank you for your inquiry. Our investment advisory team will contact you shortly!');
            setFormData({
              name: '',
              email: '',
              phone: '',
              investmentGoals: '',
              investmentBudget: '',
              message: ''
            });
            
            // Reset success message after 5 seconds
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 5000);
          } else {
            throw new Error(data.message || 'Something went wrong!');
          }
        })
        .catch(error => {
          setIsSubmitting(false);
          console.error('Error submitting form:', error);
          toast.error(error.message || 'Failed to submit the form. Please try again.');
        });
    }
  };

  return (
    <div className="bg-white mt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=2069&auto=format&fit=crop" 
            alt="Investment Advisory" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Expert Real Estate Investment Advisory</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Maximize your returns with data-driven investment strategies and expert market insights</p>
            <div className="flex flex-col sm:flex-row gap-4">
              
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Schedule a Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Investment Advisory Services?</h2>
              <p className="text-lg text-gray-600 mb-6">Real estate investing can be complex and challenging without the right guidance. Our investment advisory services provide you with expert insights, market analysis, and personalized strategies to help you make informed investment decisions.</p>
              <p className="text-lg text-gray-600 mb-6">Whether you're a first-time investor or looking to expand your portfolio, our team of experienced advisors will help you navigate the market and identify opportunities that align with your financial goals.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">$250M+ in client investments advised</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Average 14.5% annual returns for clients</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop" 
                alt="Investment Advisory Team" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Investment Advisory Services</h2>
            <p className="text-lg text-gray-600">Comprehensive investment advisory services tailored to your financial goals and risk tolerance.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-blue-50 p-4 rounded-full inline-block mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Hear from investors who have transformed their portfolios with our advisory services.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{testimonial.author}</h4>
                      <p className="text-blue-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about our investment advisory services.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-4"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`flex justify-between items-center w-full p-5 text-left bg-white rounded-lg border ${activeAccordion === index ? 'border-blue-500' : 'border-gray-200'} transition-colors duration-300`}
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96 mt-2' : 'max-h-0'}`}>
                  <div className="p-5 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Schedule a Consultation</h2>
            <p className="text-lg text-gray-600">Fill out the form below to connect with our investment advisory team and start your journey toward successful real estate investing.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="mt-1">+91 72240 48054</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="mt-1">contact@landAcre.in</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="mt-1">A-89, Airport Rd, Vijay Nagar, Lalghati, Bhopal, Madhya Pradesh 462030</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <p className="font-medium mb-2">Investment Advisory Hours</p>
                  <p className="text-blue-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-blue-100">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-blue-100">Sunday: Closed</p>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <form onSubmit={handleSubmit} className="space-y-6" action="https://api.web3forms.com/submit" method="POST">
                  <input type="hidden" name="access_key" value="17d2ac79-90f9-4485-8ec0-40a778b3fda7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2`}
                        required
                      />
                      {formErrors.name && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2`}
                        required
                      />
                      {formErrors.email && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:bg-blue-400"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Schedule Consultation'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentAdvisoryPage;




