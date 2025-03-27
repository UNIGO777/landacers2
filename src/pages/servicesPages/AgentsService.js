import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Clock, MapPin, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const AgentsServicePage = () => {
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
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Experienced Local Agents",
      description: "Connect with agents who have deep knowledge of local markets, neighborhoods, and property values to guide your real estate decisions."
    },
    {
      icon: <Star className="w-10 h-10 text-blue-600" />,
      title: "Personalized Property Matching",
      description: "Receive tailored property recommendations based on your specific requirements, preferences, and budget constraints."
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "End-to-End Transaction Support",
      description: "Get comprehensive assistance throughout the entire buying or selling process, from initial consultation to closing the deal."
    },
    {
      icon: <MapPin className="w-10 h-10 text-blue-600" />,
      title: "Market Expertise",
      description: "Benefit from our agents' in-depth understanding of market trends, pricing strategies, and investment opportunities."
    },
    {
      icon: <Phone className="w-10 h-10 text-blue-600" />,
      title: "Responsive Communication",
      description: "Stay informed with regular updates and prompt responses to your questions and concerns throughout your real estate journey."
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-blue-600" />,
      title: "Negotiation Expertise",
      description: "Leverage our agents' strong negotiation skills to secure the best possible terms and prices for your property transactions."
    }
  ];

  // Service packages
  const packages = [
    {
      title: "Basic Agent Package",
      price: "2%",
      unit: "of sale price",
      features: [
        "Property listing on major platforms",
        "Basic marketing materials",
        "Scheduled open houses",
        "Transaction coordination",
        "Email support"
      ],
      recommended: false,
      buttonText: "Select Basic Package"
    },
    {
      title: "Premium Agent Package",
      price: "2.5%",
      unit: "of sale price",
      features: [
        "Enhanced property listing on all platforms",
        "Professional photography and virtual tour",
        "Targeted digital marketing campaign",
        "Weekly open houses and private showings",
        "Priority support and consultation",
        "Detailed market analysis"
      ],
      recommended: true,
      buttonText: "Select Premium Package"
    },
    {
      title: "Elite Agent Package",
      price: "3%",
      unit: "of sale price",
      features: [
        "Premium listing with featured placement",
        "Professional photography, video tour, and staging",
        "Comprehensive marketing strategy",
        "Unlimited showings and open houses",
        "24/7 dedicated agent support",
        "Advanced negotiation strategy",
        "Post-sale support for 30 days"
      ],
      recommended: false,
      buttonText: "Select Elite Package"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Our agent from Land Acre went above and beyond to help us find our dream home. Their knowledge of the local market and negotiation skills saved us thousands.",
      author: "Michael & Sarah Johnson",
      position: "First-time Homebuyers",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      quote: "Selling my property through Land Acre's agent network was seamless. They handled everything professionally and got me a better price than I expected.",
      author: "Rajesh Patel",
      position: "Property Seller",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How do I choose the right real estate agent?",
      answer: "When selecting an agent, consider their local market knowledge, experience with properties similar to yours, communication style, and client reviews. Our platform helps match you with agents based on your specific needs and preferences to ensure the best fit."
    },
    {
      question: "What services do your agents provide for sellers?",
      answer: "Our agents offer comprehensive services for sellers including property valuation, marketing strategy development, professional photography, listing on major platforms, conducting showings, negotiating offers, handling paperwork, and guiding you through closing. The specific services vary by package level."
    },
    {
      question: "How do buyer's agents get paid?",
      answer: "Typically, buyer's agents are paid through a commission split with the seller's agent. This means as a buyer, you generally don't pay your agent directly - their commission comes from the proceeds of the home sale. This arrangement allows you to benefit from professional representation without upfront costs."
    },
    {
      question: "Can I work with multiple agents simultaneously?",
      answer: "While it's possible to work with multiple agents, it often leads to confusion and potential conflicts. Many agents work under exclusive agreements, especially for sellers. For buyers, working with one dedicated agent usually results in better service as they'll be fully invested in understanding your needs and finding your ideal property."
    },
    {
      question: "What geographic areas do your agents cover?",
      answer: "Our network includes agents specializing in various regions across the country. When you connect with us, we'll match you with agents who have expertise in your specific area of interest, ensuring you receive relevant local insights and guidance."
    }
  ];

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.propertyType) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
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
          toast.success('Your request has been submitted. An agent will contact you shortly!');
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
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
        toast.error(error.message || 'Failed to submit request. Please try again.');
      });
  };

  return (
    <div className="bg-white mt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1932&auto=format&fit=crop" 
            alt="Real Estate Agents" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Expert Real Estate Agents & Brokers</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Connect with experienced professionals to buy, sell, or rent your property with confidence</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Find an Agent
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Agent Network?</h2>
              <p className="text-lg text-gray-600 mb-6">Navigating the real estate market can be complex and overwhelming. Our network of experienced agents and brokers provides personalized guidance to help you make informed decisions and achieve your real estate goals.</p>
              <p className="text-lg text-gray-600 mb-6">Whether you're buying your first home, selling a property, or looking for investment opportunities, our agents offer local expertise and dedicated support throughout your journey.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Network of 500+ experienced agents nationwide</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Over 10,000 successful transactions completed</p>
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
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop" 
                alt="Real Estate Agent" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Agent Services</h2>
            <p className="text-lg text-gray-600">Comprehensive real estate assistance tailored to your specific needs and goals.</p>
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Hear from clients who have successfully worked with our agent network.</p>
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about working with our real estate agents.</p>
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
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Connect with an Agent</h2>
            <p className="text-lg text-gray-600">Fill out the form below to be matched with an experienced agent who specializes in your needs.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              {submitSuccess ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293 8.879a1 1 0 00-1.414 1.414L7.586 12l-1.707 1.707a1 1 0 001.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L10.414 12l2.293-2.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">Thank you for your request! An agent will contact you shortly to discuss your real estate needs.</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">I'm interested in</label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="buying">Buying a property</option>
                        <option value="selling">Selling a property</option>
                        <option value="renting">Renting a property</option>
                        <option value="investing">Real estate investment</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us more about your real estate needs"
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
                      'Connect with an Agent'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsServicePage;