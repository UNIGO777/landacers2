import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Settings, Clipboard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const HomeInspectionPage = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Service features
  const services = [
    {
      icon: <Search className="w-10 h-10 text-blue-600" />,
      title: "Comprehensive Property Inspection",
      description: "Thorough examination of all accessible areas of your property, from foundation to roof, to identify any issues or concerns."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Structural Assessment",
      description: "Detailed evaluation of your property's structural integrity, including foundation, walls, floors, and roof systems."
    },
    {
      icon: <Settings className="w-10 h-10 text-blue-600" />,
      title: "Systems Evaluation",
      description: "Inspection of electrical, plumbing, HVAC, and other critical systems to ensure proper function and safety."
    },
    {
      icon: <AlertTriangle className="w-10 h-10 text-blue-600" />,
      title: "Safety Hazard Detection",
      description: "Identification of potential safety hazards such as mold, radon, lead paint, and other environmental concerns."
    },
    {
      icon: <Clipboard className="w-10 h-10 text-blue-600" />,
      title: "Detailed Reporting",
      description: "Comprehensive written report with photos documenting all findings, issues, and recommendations for repairs or maintenance."
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "Pre-Purchase Inspection",
      description: "Specialized inspection services for buyers to identify potential issues before finalizing a property purchase."
    }
  ];

  // Service packages
  const packages = [
    {
      title: "Standard Inspection",
      price: "$399",
      unit: "per property",
      features: [
        "Visual inspection of accessible areas",
        "Basic structural assessment",
        "Systems evaluation",
        "Standard digital report with photos",
        "Same-day report delivery",
        "30-day support"
      ],
      recommended: false,
      buttonText: "Select Standard Package"
    },
    {
      title: "Comprehensive Inspection",
      price: "$599",
      unit: "per property",
      features: [
        "All Standard Inspection features",
        "Thermal imaging inspection",
        "Moisture detection",
        "Detailed digital report with annotated photos",
        "Repair cost estimates",
        "60-day support",
        "One follow-up inspection"
      ],
      recommended: true,
      buttonText: "Select Comprehensive Package"
    },
    {
      title: "Premium Inspection",
      price: "$899",
      unit: "per property",
      features: [
        "All Comprehensive Inspection features",
        "Radon testing",
        "Mold testing",
        "Sewer scope inspection",
        "Water quality testing",
        "90-day support",
        "Two follow-up inspections",
        "1-year warranty on inspection"
      ],
      recommended: false,
      buttonText: "Select Premium Package"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The home inspection from Land Acre saved us from making a costly mistake. They identified serious foundation issues that weren't visible to the untrained eye, allowing us to negotiate repairs before purchase.",
      author: "Thomas Reynolds",
      position: "Home Buyer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
      quote: "As a real estate agent, I recommend Land Acre's inspection services to all my clients. Their thoroughness, professionalism, and clear reporting make the home buying process much smoother.",
      author: "Rebecca Chen",
      position: "Real Estate Agent",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How long does a home inspection take?",
      answer: "A typical home inspection takes 2-3 hours for an average-sized home. Larger properties or those with multiple issues may take longer. Our inspectors take the time needed to thoroughly examine all accessible areas of your property."
    },
    {
      question: "Should I be present during the inspection?",
      answer: "While not required, we highly recommend that you attend the inspection. This gives you the opportunity to ask questions and see any issues firsthand. Our inspectors will walk you through their findings and explain any concerns they identify."
    },
    {
      question: "What does a home inspection include?",
      answer: "Our standard inspection includes examination of the property's structure, exterior, roof, electrical systems, plumbing, HVAC, insulation, ventilation, interior, and appliances. We check all accessible areas for safety issues, damage, or defects that could affect the property's value or safety."
    },
    {
      question: "Do you inspect newly constructed homes?",
      answer: "Yes, we offer specialized new construction inspections. Even newly built homes can have defects or construction issues. We recommend inspections at key phases: pre-foundation, pre-drywall, and final walkthrough to ensure quality construction throughout the building process."
    },
    {
      question: "How soon will I receive my inspection report?",
      answer: "For our Standard Inspection package, you'll receive your report the same day as the inspection. Comprehensive and Premium packages may take up to 24 hours due to the additional testing and detailed analysis included in these services."
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
    inspectionDate: '',
    package: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
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
    
    if (!formData.propertyAddress.trim()) {
      errors.propertyAddress = 'Property address is required';
    }
    
    if (!formData.inspectionDate) {
      errors.inspectionDate = 'Inspection date is required';
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
              propertyAddress: '',
              inspectionDate: '',
              package: '',
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
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
            alt="Home Inspection" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Professional Home Inspection Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Thorough property inspections to ensure your investment is sound and safe</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#packages" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                View Inspection Packages
              </a>
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Schedule an Inspection
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Inspection Services?</h2>
              <p className="text-lg text-gray-600 mb-6">A thorough home inspection is crucial when buying, selling, or maintaining a property. Our certified inspectors provide detailed assessments to identify potential issues before they become costly problems.</p>
              <p className="text-lg text-gray-600 mb-6">With our comprehensive inspection services, you'll gain peace of mind knowing exactly what you're investing in and what maintenance might be needed in the future.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Over 5,000 inspections completed</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Certified and experienced inspectors</p>
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
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
                alt="Home Inspector at Work" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Inspection Services</h2>
            <p className="text-lg text-gray-600">Comprehensive inspection services to ensure your property is safe, sound, and a good investment.</p>
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
      <section id="packages" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Inspection Packages</h2>
            <p className="text-lg text-gray-600">Choose the inspection package that best fits your property needs and budget.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Hear from homeowners and real estate professionals who have used our inspection services.</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about our home inspection services.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Schedule an Inspection</h2>
            <p className="text-lg text-gray-600">Fill out the form below to request an inspection appointment. Our team will contact you to confirm details.</p>
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
                  <p className="font-medium mb-2">Hours of Operation</p>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM<br />Sunday: Closed</p>
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
                      <label htmlFor="inspectionDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Inspection Date</label>
                      <input
                        type="date"
                        id="inspectionDate"
                        name="inspectionDate"
                        value={formData.inspectionDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Schedule Inspection"}
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

export default HomeInspectionPage;