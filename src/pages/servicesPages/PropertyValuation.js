import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Home, Map, TrendingUp, Search, CheckCircle, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const PropertyValuationPage = () => {
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

  // Service features
  const services = [
    {
      icon: <BarChart2 className="w-10 h-10 text-blue-600" />,
      title: "Comparative Market Analysis",
      description: "Detailed analysis of comparable properties in your area to determine the most accurate market value for your property."
    },
    {
      icon: <Home className="w-10 h-10 text-blue-600" />,
      title: "On-Site Property Assessment",
      description: "Thorough in-person evaluation of your property's condition, features, and unique selling points by our expert valuers."
    },
    {
      icon: <Map className="w-10 h-10 text-blue-600" />,
      title: "Location Analysis",
      description: "Comprehensive assessment of your property's location, including proximity to amenities, schools, transportation, and future development plans."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
      title: "Market Trend Forecasting",
      description: "Analysis of current market trends and future projections to help you time your property decisions for maximum value."
    },
    {
      icon: <Search className="w-10 h-10 text-blue-600" />,
      title: "Investment Potential Assessment",
      description: "Evaluation of your property's investment potential, including rental yield projections and capital growth estimates."
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: "Detailed Valuation Report",
      description: "Comprehensive written report with detailed findings, market analysis, and final valuation figure for your records."
    }
  ];

  // Service packages
  const packages = [
    {
      title: "Basic Valuation",
      price: "$299",
      unit: "per property",
      features: [
        "Desktop comparative market analysis",
        "Basic property assessment",
        "Standard valuation report",
        "Email support",
        "7-day turnaround time"
      ],
      recommended: false,
      buttonText: "Select Basic Package"
    },
    {
      title: "Comprehensive Valuation",
      price: "$499",
      unit: "per property",
      features: [
        "In-depth comparative market analysis",
        "On-site property inspection",
        "Detailed valuation report with photos",
        "Location and neighborhood analysis",
        "Market trend assessment",
        "Email and phone support",
        "5-day turnaround time"
      ],
      recommended: true,
      buttonText: "Select Comprehensive Package"
    },
    {
      title: "Premium Valuation",
      price: "$799",
      unit: "per property",
      features: [
        "All Comprehensive Valuation features",
        "Investment potential analysis",
        "Rental yield projections",
        "Capital growth forecasting",
        "Renovation value-add assessment",
        "Highest and best use analysis",
        "Priority 3-day turnaround time",
        "60-minute consultation with senior valuer"
      ],
      recommended: false,
      buttonText: "Select Premium Package"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The property valuation from Land Acre was incredibly thorough and gave me the confidence to price my home correctly. It sold within two weeks at full asking price!",
      author: "Emma Thompson",
      position: "Home Seller",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
    },
    {
      quote: "As an investor, accurate valuations are critical to my business. Land Acre's premium valuation service has helped me identify undervalued properties with excellent growth potential.",
      author: "James Wilson",
      position: "Property Investor",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How is a property valuation different from an appraisal?",
      answer: "A property valuation is a detailed assessment conducted by a qualified valuer that provides a definitive market value for your property, often used for legal and financial purposes. An appraisal is typically a less formal estimate provided by a real estate agent to give you a general idea of your property's worth in the current market."
    },
    {
      question: "How long does a property valuation take?",
      answer: "The timeframe depends on the package you select. Our Basic Valuation has a 7-day turnaround, Comprehensive Valuation takes 5 days, and Premium Valuation is completed within 3 days. The on-site inspection itself typically takes 1-2 hours depending on the size and complexity of the property."
    },
    {
      question: "What factors affect my property's value?",
      answer: "Multiple factors influence property value, including location, property size and condition, number of bedrooms and bathrooms, renovations and upgrades, local amenities, school zones, market conditions, comparable sales in the area, and future development plans for the neighborhood."
    },
    {
      question: "How often should I get my property valued?",
      answer: "For investment properties, we recommend a valuation every 1-2 years to stay informed about your equity position. For your primary residence, every 3-5 years is typically sufficient unless you're planning to sell or refinance, or if there have been significant changes to your property or neighborhood."
    },
    {
      question: "Can I use your valuation report for loan purposes?",
      answer: "Yes, our Comprehensive and Premium Valuation reports are accepted by most financial institutions for mortgage and refinancing purposes. However, some lenders may require their own valuation, so we recommend checking with your specific lender first."
    }
  ];

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
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

    if (!formData.propertyAddress.trim()) {
      errors.propertyAddress = 'Property address is required';
    }
    
    if (!formData.propertyType) {
      errors.propertyType = 'Property type is required';
    }
    
    return errors;
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
            toast.success('Thank you for your inquiry. Our valuation team will contact you shortly!');
            setFormData({
              name: '',
              email: '',
              phone: '',
              propertyAddress: '',
              propertyType: '',
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
            src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=2073&auto=format&fit=crop" 
            alt="Property Valuation" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Expert Property Valuation Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Get an accurate assessment of your property's worth with our professional valuation services</p>
            <div className="flex flex-col sm:flex-row gap-4">
              
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Request a Valuation
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Valuation Services?</h2>
              <p className="text-lg text-gray-600 mb-6">Accurate property valuation is essential for making informed real estate decisions. Whether you're selling, buying, refinancing, or managing your investment portfolio, our expert valuation services provide you with precise, data-driven assessments of property value.</p>
              <p className="text-lg text-gray-600 mb-6">Our team of certified property valuers combines industry expertise with advanced market analytics to deliver valuations you can trust.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Over 10,000 properties valued accurately</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Team of certified property valuers</p>
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1932&auto=format&fit=crop" 
                alt="Property Valuation Team" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Valuation Services</h2>
            <p className="text-lg text-gray-600">Comprehensive property valuation services tailored to your specific needs and requirements.</p>
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
      {/* <section id="packages" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Valuation Packages</h2>
            <p className="text-lg text-gray-600">Choose the valuation package that best fits your property needs and budget.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${pkg.recommended ? 'border-blue-500' : 'border-gray-200'} relative`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-4 text-sm font-medium">
                    Recommended
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{pkg.title}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">{pkg.price}</span>
                    <span className="text-gray-500 ml-2">{pkg.unit}</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 px-6 rounded-lg font-medium ${pkg.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'} transition-colors duration-300`}>
                    {pkg.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

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
            <p className="text-lg text-gray-600">Hear from property owners who have used our valuation services.</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about our property valuation services.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Request a Valuation</h2>
            <p className="text-lg text-gray-600">Fill out the form below to request a property valuation. Our team will contact you to discuss your needs.</p>
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
                  <p className="font-medium mb-2">Valuation Hours</p>
                  <p className="text-blue-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-blue-100">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-blue-100">Sunday: Closed</p>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                {submitSuccess ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293 8.879a1 1 0 00-1.414 1.414L7.586 12l-1.707 1.707a1 1 0 001.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L10.414 12l2.293-2.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">Thank you for your inquiry! Our valuation team will contact you as soon as possible.</p>
                      </div>
                    </div>
                  </div>
                ) : (
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.name ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.email ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.phone ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.propertyType ? 'border-red-300' : 'border-gray-300'}`}
                      >
                        <option value="">Select property type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="land">Land</option>
                      </select>
                      {formErrors.propertyType && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.propertyType}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                    <input
                      type="text"
                      id="propertyAddress"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.propertyAddress ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    {formErrors.propertyAddress && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.propertyAddress}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Request Valuation'
                    )}
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyValuationPage;