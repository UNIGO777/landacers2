import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Building2, Award, Clock, Home, Shield, CheckCircle, Ruler } from 'lucide-react';

const BuildersServicePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
      icon: <Building2 className="w-10 h-10 text-blue-600" />,
      title: "Vetted Quality Builders",
      description: "Access our network of thoroughly vetted builders with proven track records of quality construction and timely project delivery."
    },
    {
      icon: <Home className="w-10 h-10 text-blue-600" />,
      title: "Diverse Project Portfolios",
      description: "Explore a wide range of residential and commercial projects from builders specializing in various architectural styles and price points."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Transparent Pricing & Timelines",
      description: "Get clear, upfront information about project costs, payment schedules, and realistic construction timelines."
    },
    {
      icon: <Ruler className="w-10 h-10 text-blue-600" />,
      title: "Customization Options",
      description: "Work with builders who offer flexible customization options to tailor your property to your specific needs and preferences."
    },
    {
      icon: <Award className="w-10 h-10 text-blue-600" />,
      title: "Quality Assurance",
      description: "Benefit from our rigorous quality standards and regular construction inspections to ensure your project meets all specifications."
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "Project Management",
      description: "Streamlined project management services to coordinate between you and your builder throughout the construction process."
    }
  ];

  // Featured builders
  const featuredBuilders = [
    {
      name: "Prestige Constructions",
      specialty: "Luxury Homes & Villas",
      experience: "25+ years",
      projects: "200+ completed",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Green Habitat Developers",
      specialty: "Eco-friendly Residential Projects",
      experience: "15+ years",
      projects: "120+ completed",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
    },
    {
      name: "Urban Space Creators",
      specialty: "Modern Apartments & Commercial Spaces",
      experience: "18+ years",
      projects: "150+ completed",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Working with the builder we found through Land Acre was an excellent experience. The quality of construction and attention to detail exceeded our expectations.",
      author: "Priya & Arun Sharma",
      position: "Homeowners",
      image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2076&auto=format&fit=crop"
    },
    {
      quote: "The transparent process and regular updates from our builder made the construction journey stress-free. We're extremely happy with our new commercial space.",
      author: "Vikram Mehta",
      position: "Business Owner",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How do you select builders for your network?",
      answer: "We have a rigorous vetting process that evaluates builders based on their experience, quality of previous projects, client testimonials, financial stability, regulatory compliance, and business practices. Only builders who meet our high standards are included in our network."
    },
    {
      question: "Can I see examples of a builder's previous work before deciding?",
      answer: "Absolutely! We provide detailed portfolios of each builder's previous projects, including photos, specifications, and client testimonials. We can also arrange site visits to completed projects or ongoing construction sites upon request."
    },
    {
      question: "What types of guarantees do your builders offer?",
      answer: "Most builders in our network offer structural warranties ranging from 5-10 years, along with shorter-term warranties for fixtures and finishes. Additionally, they provide clear contracts with milestone-based payment schedules tied to construction progress and quality checks."
    },
    {
      question: "How are construction delays and changes handled?",
      answer: "Our builders maintain transparent communication about potential delays due to weather, material shortages, or other factors. Change orders are documented formally with clear cost implications and timeline adjustments. We also offer mediation services if any disputes arise during the construction process."
    },
    {
      question: "Do you offer any special discounts or packages when working with your recommended builders?",
      answer: "Yes, many builders in our network offer exclusive benefits to Land Acre clients, including preferential pricing, complimentary upgrades, or extended warranties. These benefits vary by builder and project type, and we'll highlight available offers during your consultation."
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
    projectType: '',
    budget: '',
    message: ''
  });

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
    
    if (!formData.projectType) {
      errors.projectType = 'Project type is required';
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
              projectType: '',
              budget: '',
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
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Builders and Developers"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Trusted Builders & Developers</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Connect with reliable construction professionals to bring your dream property to life</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Find a Builder
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Builder Network?</h2>
              <p className="text-lg text-gray-600 mb-6">Building or developing a property is a significant investment that requires skilled professionals you can trust. Our network of vetted builders and developers brings together the most reliable construction experts with proven track records.</p>
              <p className="text-lg text-gray-600 mb-6">Whether you're building a new home, developing a commercial property, or undertaking a renovation project, our builders deliver quality craftsmanship, transparent processes, and timely completion.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Network of 100+ verified builders and developers</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-800">Over 5,000 successful projects completed</p>
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
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                alt="Construction Site"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Builder Services</h2>
            <p className="text-lg text-gray-600">Comprehensive construction and development solutions tailored to your project needs.</p>
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

      {/* Featured Builders Section */}
      {/* <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Featured Builders</h2>
            <p className="text-lg text-gray-600">Meet some of our top-rated construction professionals with exceptional track records.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBuilders.map((builder, index) => (
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
                    src={builder.image} 
                    alt={builder.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{builder.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{builder.specialty}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600"><span className="font-medium">Experience:</span> {builder.experience}</p>
                    <p className="text-gray-600"><span className="font-medium">Projects:</span> {builder.projects}</p>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 mr-2">Rating:</span>
                      <span className="text-gray-800">{builder.rating}/5</span>
                      <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(builder.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300">
              View All Builders
            </a>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Client Success Stories</h2>
            <p className="text-lg text-gray-600">Hear from clients who have successfully completed projects with our builders.</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about working with our builders and developers.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Connect with a Builder</h2>
            <p className="text-lg text-gray-600">Fill out the form below to be matched with experienced builders who specialize in your type of project.</p>
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
                      <p className="text-sm text-green-700">Thank you for your inquiry! A representative will contact you shortly to discuss your project.</p>
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
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a project type</option>
                      <option value="residential">Residential Construction</option>
                      <option value="commercial">Commercial Construction</option>
                      <option value="renovation">Renovation/Remodeling</option>
                      <option value="interior">Interior Finishing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a budget range</option>
                    <option value="under25L">Under ₹25 Lakhs</option>
                    <option value="25-50L">₹25 Lakhs - ₹50 Lakhs</option>
                    <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                    <option value="1-2Cr">₹1 Crore - ₹2 Crore</option>
                    <option value="above2Cr">Above ₹2 Crore</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us more about your construction project and requirements"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Connect with a Builder'
                  )}
                </button>
              </form>)}
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default BuildersServicePage;