import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, Shield, Users, BookOpen, CheckCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const LegalAssistancePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const [formErrors, setFormErrors] = useState({});

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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
  
    if (!formData.service.trim()) {
      errors.service = 'Service is required';
    }
  
    return errors;
  };

  // Service features
  const services = [
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: "Contract Review & Preparation",
      description: "Expert review and preparation of all real estate contracts, ensuring your interests are protected and all terms are favorable."
    },
    {
      icon: <Scale className="w-10 h-10 text-blue-600" />,
      title: "Legal Compliance",
      description: "Ensure all your real estate transactions comply with local, state, and federal regulations to avoid potential legal issues."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Dispute Resolution",
      description: "Professional mediation and legal representation for resolving property disputes, boundary issues, and tenant conflicts."
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Landlord-Tenant Law",
      description: "Specialized assistance with lease agreements, evictions, tenant rights, and landlord obligations under current laws."
    },
    {
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
      title: "Title Research & Insurance",
      description: "Comprehensive title searches and insurance options to protect your property investment from unforeseen claims."
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-blue-600" />,
      title: "Legal Consultation",
      description: "One-on-one consultation with real estate attorneys to address your specific questions and concerns."
    }
  ];

  // Service packages
  const packages = [
    {
      title: "Basic Legal Package",
      price: "$499",
      unit: "one-time fee",
      features: [
        "Contract review (up to 2 documents)",
        "Legal compliance check",
        "30-minute legal consultation",
        "Basic title search",
        "Email support"
      ],
      recommended: false,
      buttonText: "Select Basic Package"
    },
    {
      title: "Standard Legal Package",
      price: "$999",
      unit: "one-time fee",
      features: [
        "Contract review & preparation (up to 4 documents)",
        "Comprehensive legal compliance audit",
        "60-minute legal consultation",
        "Full title search & basic insurance guidance",
        "Priority email & phone support",
        "Basic dispute resolution assistance"
      ],
      recommended: true,
      buttonText: "Select Standard Package"
    },
    {
      title: "Premium Legal Package",
      price: "$1,999",
      unit: "one-time fee",
      features: [
        "Unlimited contract review & preparation",
        "Comprehensive legal compliance audit with remediation",
        "3 hours of legal consultation",
        "Complete title services with insurance options",
        "24/7 priority support",
        "Full dispute resolution & representation",
        "Ongoing legal advisory for 6 months"
      ],
      recommended: false,
      buttonText: "Select Premium Package"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The legal team at Land Acre saved me from a potentially disastrous contract situation. Their attention to detail and expert knowledge of real estate law was invaluable.",
      author: "Robert Chen",
      position: "Property Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      quote: "When I faced a boundary dispute with my neighbor, Land Acre's legal assistance service provided clear guidance and representation that resolved the issue quickly and amicably.",
      author: "Jennifer Martinez",
      position: "Homeowner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What types of legal services do you offer for real estate?",
      answer: "We offer a comprehensive range of legal services including contract review and preparation, legal compliance audits, dispute resolution, landlord-tenant law assistance, title research and insurance, and personalized legal consultation with real estate attorneys."
    },
    {
      question: "Do you handle both residential and commercial real estate legal matters?",
      answer: "Yes, our team of specialized attorneys has expertise in both residential and commercial real estate law, including property transactions, leasing, zoning issues, and investment properties."
    },
    {
      question: "How quickly can I expect a response to my legal question?",
      answer: "For Basic package clients, we respond to inquiries within 48 hours. Standard package clients receive responses within 24 hours, and Premium package clients enjoy priority service with responses typically within 4-8 hours, including weekends."
    },
    {
      question: "Can you represent me in court for a real estate dispute?",
      answer: "Yes, our Premium Legal Package includes representation for real estate disputes. For Basic and Standard packages, court representation is available as an add-on service at preferential rates."
    },
    {
      question: "Do you offer ongoing legal support for landlords?",
      answer: "Yes, we offer specialized ongoing legal support for landlords through our Premium package, which includes 6 months of advisory services. We also have custom packages for property managers and landlords with multiple properties."
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
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
            toast.success('Thank you for your inquiry. Our legal team will contact you shortly!');
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: '',
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
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
            alt="Legal Assistance" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Expert Legal Assistance for Real Estate</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Navigate the complex legal landscape of real estate with confidence using our specialized legal services</p>
            <div className="flex flex-col sm:flex-row gap-4">
              
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Get Legal Advice
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Legal Assistance?</h2>
              <p className="text-lg text-gray-600 mb-6">Real estate transactions involve complex legal considerations that can significantly impact your investment. Our team of specialized attorneys provides expert guidance to protect your interests and ensure compliance with all applicable laws.</p>
              <p className="text-lg text-gray-600 mb-6">From contract review and preparation to dispute resolution and compliance audits, we offer comprehensive legal services tailoblue to your specific real estate needs.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Team of specialized real estate attorneys</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Over 2,000 successful legal cases handled</p>
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
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069&auto=format&fit=crop" 
                alt="Legal Team" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Legal Services</h2>
            <p className="text-lg text-gray-600">Comprehensive legal assistance for all aspects of real estate transactions and property management.</p>
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
            <p className="text-lg text-gray-600">Hear from clients who have benefited from our expert legal assistance services.</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about our legal assistance services.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Get Legal Assistance</h2>
            <p className="text-lg text-gray-600">Fill out the form below to connect with our legal team and get expert advice for your real estate needs.</p>
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
                  <p className="font-medium mb-2">Legal Consultation Hours</p>
                  <p className="text-blue-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-blue-100">Saturday: 10:00 AM - 2:00 PM</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        requiblue
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
                        requiblue
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
                        requiblue
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        requiblue
                      >
                        <option value="">Select a service</option>
                        <option value="contract-review">Contract Review & Preparation</option>
                        <option value="legal-compliance">Legal Compliance</option>
                        <option value="dispute-resolution">Dispute Resolution</option>
                        <option value="landlord-tenant">Landlord-Tenant Law</option>
                        <option value="title-research">Title Research & Insurance</option>
                        <option value="legal-consultation">Legal Consultation</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      requiblue
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                    >
                      {isSubmitting ? "Submiting..." : "Submit Inquiry"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalAssistancePage;