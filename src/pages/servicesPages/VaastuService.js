import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Home, Layout, Map, CheckCircle, Zap, Layers } from 'lucide-react';
import { toast } from 'react-toastify';


const VaastuService = () => {
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
      icon: <Compass className="w-10 h-10 text-orange-600" />,
      title: "Vaastu Consultation",
      description: "Comprehensive analysis of your property's Vaastu alignment and personalized recommendations to enhance positive energy flow."
    },
    {
      icon: <Home className="w-10 h-10 text-orange-600" />,
      title: "Pre-Construction Vaastu Planning",
      description: "Expert guidance on plot selection, building orientation, and floor plan design according to Vaastu principles before construction begins."
    },
    {
      icon: <Layout className="w-10 h-10 text-orange-600" />,
      title: "Vaastu Correction Solutions",
      description: "Practical and effective remedies to correct Vaastu defects in existing properties without major structural changes."
    },
    {
      icon: <Map className="w-10 h-10 text-orange-600" />,
      title: "Commercial Space Vaastu",
      description: "Specialized Vaastu analysis for offices, shops, and commercial establishments to enhance prosperity and business growth."
    },
    {
      icon: <Zap className="w-10 h-10 text-orange-600" />,
      title: "Energy Balancing",
      description: "Identification and neutralization of negative energy zones in your property using traditional Vaastu remedies and enhancements."
    },
    {
      icon: <Layers className="w-10 h-10 text-orange-600" />,
      title: "Vaastu for Renovations",
      description: "Strategic guidance for incorporating Vaastu principles during home renovations or extensions to improve harmony and well-being."
    }
  ];

  // Featured Vaastu consultants
  const featuredConsultants = [
    {
      name: "Dr. Rajesh Sharma",
      specialty: "Residential Vaastu Expert",
      experience: "25+ years",
      projects: "1500+ consultations",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop"
    },
    {
      name: "Acharya Sunita Verma",
      specialty: "Commercial Vaastu Specialist",
      experience: "20+ years",
      projects: "800+ consultations",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      name: "Pandit Vijay Kapoor",
      specialty: "Vaastu & Feng Shui Integration",
      experience: "18+ years",
      projects: "1200+ consultations",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "After implementing the Vaastu changes recommended by Land Acers's consultant, there was a noticeable improvement in our family's harmony and my business prosperity. The suggestions were practical and didn't require major renovations.",
      author: "Suresh & Priya Malhotra",
      position: "Homeowners, Delhi",
      image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2076&auto=format&fit=crop"
    },
    {
      quote: "The commercial Vaastu consultation for my new office space was eye-opening. The consultant identified several issues that could have affected employee productivity and client relationships. The remedies were simple yet effective.",
      author: "Amit Joshi",
      position: "Business Owner, Mumbai",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What is Vaastu Shastra and how does it affect my property?",
      answer: "Vaastu Shastra is an ancient Indian science of architecture and design that aims to create harmony between humans and their living spaces. It's based on the principle that energy flows in certain directions and patterns, affecting the inhabitants' health, wealth, and happiness. A properly Vaastu-aligned property can enhance positive energy flow, potentially improving various aspects of your life including relationships, career, and overall well-being."
    },
    {
      question: "Do I need to make major structural changes to follow Vaastu principles?",
      answer: "Not necessarily. While some Vaastu defects may require structural modifications, our consultants focus on providing practical solutions that minimize disruption and expense. Many Vaastu corrections can be achieved through simple adjustments like furniture rearrangement, color changes, element placement, or using specific Vaastu remedies like yantra placement. Our approach is to find the most effective yet least invasive solutions for your specific situation."
    },
    {
      question: "How long does a typical Vaastu consultation take?",
      answer: "A standard residential Vaastu consultation typically takes 2-3 hours, during which our consultant will assess your property, take measurements, analyze the floor plan, and discuss your specific concerns. For larger properties or commercial spaces, the consultation may take longer. Following the on-site visit, you'll receive a detailed report with recommendations within 3-5 business days."
    },
    {
      question: "Can Vaastu be applied to already constructed buildings?",
      answer: "Yes, Vaastu principles can be applied to existing structures. While it's ideal to incorporate Vaastu from the planning stage, our consultants are skilled at providing effective remedies for already constructed properties. These may include strategic placement of elements, color corrections, energy balancing techniques, and other non-structural adjustments that can significantly improve the property's Vaastu alignment."
    },
    {
      question: "Is Vaastu consultation a one-time service or ongoing?",
      answer: "While a basic Vaastu consultation is typically a one-time service, many clients opt for follow-up consultations after implementing the recommended changes or when making significant modifications to their property. We also offer ongoing support packages for those who wish to have continued guidance. Additionally, different life phases or business cycles might benefit from periodic Vaastu reassessments to align with changing circumstances."
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
    propertyAddress: '',
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
            setFormData({
              name: '',
              email: '',
              phone: '',
              propertyType: '',
              propertyAddress: '',
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
      <section className="relative bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop" 
            alt="Vaastu Shastra" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Vaastu Shastra Consultation</h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">Harmonize your living and working spaces with ancient architectural wisdom for improved well-being and prosperity</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-white hover:bg-gray-100 text-orange-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Consult a Vaastu Expert
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Vaastu Services?</h2>
              <p className="text-lg text-gray-600 mb-6">Vaastu Shastra, the ancient Indian science of architecture, helps create harmony between living spaces and natural forces. Our expert Vaastu consultants combine traditional knowledge with modern architectural understanding to enhance positive energy in your home or workplace.</p>
              <p className="text-lg text-gray-600 mb-6">Whether you're planning a new construction, renovating an existing property, or simply looking to improve the energy flow in your current space, our Vaastu services provide practical solutions tailored to your specific needs.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <p className="font-medium text-gray-800">Certified Vaastu experts with decades of experience</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <p className="font-medium text-gray-800">Over 3,500 successful consultations completed</p>
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
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
                alt="Vaastu Consultation" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Vaastu Services</h2>
            <p className="text-lg text-gray-600">Comprehensive Vaastu solutions tailored to enhance harmony, prosperity, and well-being in your spaces.</p>
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
                <div className="bg-orange-50 p-4 rounded-full inline-block mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Consultants Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Vaastu Experts</h2>
            <p className="text-lg text-gray-600">Meet our experienced Vaastu consultants who blend traditional knowledge with practical solutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredConsultants.map((consultant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={consultant.image} 
                    alt={consultant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{consultant.name}</h3>
                  <p className="text-orange-600 font-medium mb-4">{consultant.specialty}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600"><span className="font-medium">Experience:</span> {consultant.experience}</p>
                    <p className="text-gray-600"><span className="font-medium">Projects:</span> {consultant.projects}</p>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 mr-2">Rating:</span>
                      <span className="text-gray-800">{consultant.rating}/5</span>
                      <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(consultant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300">
              View All Consultants
            </a>
          </div>
        </div>
      </section>

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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Client Success Stories</h2>
            <p className="text-lg text-gray-600">Hear from clients who have experienced positive transformations through our Vaastu services.</p>
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
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100">
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
                      <p className="text-orange-600">{testimonial.position}</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about Vaastu and our consultation services.</p>
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
                  className={`flex justify-between items-center w-full p-5 text-left bg-white rounded-lg border ${activeAccordion === index ? 'border-orange-500' : 'border-gray-200'} transition-colors duration-300`}
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Book a Vaastu Consultation</h2>
            <p className="text-lg text-gray-600">Fill out the form below to connect with one of our Vaastu experts for a personalized consultation.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      <option value="">Select property type</option>
                      <option value="residential">Residential Property</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="land">Vacant Land</option>
                      <option value="industrial">Industrial Property</option>
                      <option value="other">Other</option>
                    </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Please share any specific concerns or questions you have about your property's Vaastu."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Book Consultation'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default VaastuService;