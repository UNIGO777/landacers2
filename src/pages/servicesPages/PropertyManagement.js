import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Settings, Clock, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

const PropertyManagementPage = () => {
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
  const features = [
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Tenant Screening & Selection",
      description: "Comprehensive background checks, credit history verification, and reference validation to ensure quality tenants."
    },
    {
      icon: <Building className="w-10 h-10 text-blue-600" />,
      title: "Property Maintenance",
      description: "Regular inspections, preventive maintenance, and prompt repairs to keep your property in excellent condition."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Rent Collection & Financial Management",
      description: "Timely rent collection, detailed financial reporting, and transparent accounting of all property transactions."
    },
    {
      icon: <Settings className="w-10 h-10 text-blue-600" />,
      title: "Emergency Response",
      description: "24/7 emergency support for tenants and immediate resolution of critical property issues."
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "Lease Administration",
      description: "Professional handling of lease agreements, renewals, and compliance with local property regulations."
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
      title: "Property Marketing",
      description: "Strategic marketing to minimize vacancy periods and attract quality tenants quickly."
    }
  ];

  // Service packages
  const packages = [
    {
      title: "Basic Management",
      price: "8%",
      unit: "of monthly rent",
      features: [
        "Tenant screening & placement",
        "Rent collection",
        "Basic maintenance coordination",
        "Monthly financial statements",
        "Annual property inspection"
      ],
      recommended: false,
      buttonText: "Select Basic Plan"
    },
    {
      title: "Premium Management",
      price: "10%",
      unit: "of monthly rent",
      features: [
        "All Basic Management features",
        "Quarterly property inspections",
        "24/7 emergency maintenance",
        "Tenant retention programs",
        "Online owner & tenant portals",
        "Detailed property marketing"
      ],
      recommended: true,
      buttonText: "Select Premium Plan"
    },
    {
      title: "Full-Service Management",
      price: "12%",
      unit: "of monthly rent",
      features: [
        "All Premium Management features",
        "Monthly property inspections",
        "Preventive maintenance program",
        "Rent guarantee program",
        "Legal eviction handling",
        "Tax & investment consulting",
        "Annual property valuation"
      ],
      recommended: false,
      buttonText: "Select Full-Service Plan"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Since hiring Land Acre for property management, I've been able to focus on expanding my portfolio instead of dealing with day-to-day tenant issues. Their team is responsive and professional.",
      author: "Michael Thompson",
      position: "Property Investor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
    },
    {
      quote: "As an out-of-state property owner, I needed reliable management I could trust. Land Acre has exceeded my expectations with their detailed reporting and proactive maintenance approach.",
      author: "Sarah Williams",
      position: "Remote Property Owner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What services are included in your property management?",
      answer: "Our property management services include tenant screening and placement, rent collection, maintenance coordination, regular property inspections, financial reporting, lease administration, and emergency response. The specific services vary by package level."
    },
    {
      question: "How do you screen potential tenants?",
      answer: "We conduct comprehensive background checks that include credit history, criminal background, eviction history, employment verification, income validation, and previous landlord references to ensure we place reliable tenants in your property."
    },
    {
      question: "What are your management fees?",
      answer: "Our management fees range from 8% to 12% of the monthly rent, depending on the service package selected. We also offer customized fee structures for portfolios with multiple properties."
    },
    {
      question: "How often will you inspect my property?",
      answer: "Inspection frequency depends on your service package, ranging from annual inspections with our Basic plan to monthly inspections with our Full-Service plan. We also conduct inspections during tenant move-in and move-out."
    },
    {
      question: "How quickly do you respond to maintenance issues?",
      answer: "Emergency maintenance issues are addressed immediately, 24/7. Routine maintenance requests are typically handled within 24-48 hours, depending on the nature of the request and your service package."
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
            toast.success('Thank you for your inquiry. Our property management team will contact you shortly!');
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
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop" 
            alt="Property Management" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Professional Property Management Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Maximize your investment returns while we handle the day-to-day management of your properties</p>
            <div className="flex flex-col sm:flex-row gap-4">
              
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Contact Us
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Property Management Services?</h2>
              <p className="text-lg text-gray-600 mb-6">At Land Acre, we understand that managing properties can be time-consuming and complex. Our professional property management services are designed to give you peace of mind while maximizing the return on your investment.</p>
              <p className="text-lg text-gray-600 mb-6">With over 15 years of experience in the real estate industry, our team of dedicated property managers handles everything from tenant screening and rent collection to maintenance and legal compliance.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Trusted by over 500+ property owners</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Managing 1,200+ properties nationwide</p>
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
                alt="Property Management Team" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Comprehensive Management Services</h2>
            <p className="text-lg text-gray-600">Our full-spectrum property management services are designed to protect your investment while providing an exceptional experience for your tenants.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-blue-50 p-4 rounded-full inline-block mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Management Packages</h2>
            <p className="text-lg text-gray-600">Choose the management package that best fits your property needs and investment goals.</p>
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
            <p className="text-lg text-gray-600">Hear from property owners who have experienced the benefits of our management services.</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about our property management services.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Contact Our Property Management Team</h2>
            <p className="text-lg text-gray-600">Fill out the form below to learn more about our property management services or to request a free property assessment.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="mt-1">+91 72240 48054</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="mt-1">contact@landAcre.in</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="mt-1">A-89, Airport Rd, Vijay Nagar, Lalghati, Bhopal, Madhya Pradesh 462030</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <p className="font-medium mb-2">Hours of Operation</p>
                  <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-sm">Sunday: Closed</p>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Multi-Family">Multi-Family</option>
                        <option value="Vacation Rental">Vacation Rental</option>
                        <option value="Other">Other</option>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about your property management needs..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Maximize Your Property Investment?</h2>
            <p className="text-xl mb-8">Let our expert team handle the day-to-day management while you enjoy the benefits of property ownership without the hassle.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <a href="#contact" className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center border border-blue-500">
                Contact Us Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PropertyManagementPage;