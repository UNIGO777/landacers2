import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start the process of buying a property?",
      answer: "Begin by browsing our listings online, then contact us to schedule viewings of properties that interest you. Our agents will guide you through the entire buying process, from property selection to closing the deal.",
      category: "Buying"
    },
    {
      question: "What documents do I need to sell my property?",
      answer: "You'll need property ownership documents, tax records, utility bills, and any relevant permits or certificates. Our team will help you gather all necessary documentation for a smooth selling process.",
      category: "Selling"
    },
    {
      question: "How long does it typically take to sell a property?",
      answer: "The timeline varies depending on market conditions, property type, location, and pricing. On average, properties sell within 30-90 days, but our marketing strategies aim to minimize this timeframe.",
      category: "Selling"
    },
    {
      question: "Do you offer property management services?",
      answer: "Yes, we provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, and regular property inspections to ensure your investment is well-maintained.",
      category: "Services"
    },
    {
      question: "What areas do you serve?",
      answer: "We operate in major metropolitan areas and surrounding suburbs, with a strong presence in residential, commercial, and industrial real estate markets across the region.",
      category: "General"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get instant answers to the most common questions about our real estate services, 
            processes, and expertise to help you make informed decisions.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="gap-5 grid grid-cols-1 md:grid-cols-2 items-start"
        >
          {faqs.map((faq, index) => {
            const getCategoryColor = (category) => {
              const colors = {
                'Buying': 'bg-green-100 text-green-700 border-green-200',
                'Selling': 'bg-blue-100 text-blue-700 border-blue-200',
                'Services': 'bg-purple-100 text-purple-700 border-purple-200',
                'General': 'bg-gray-100 text-gray-700 border-gray-200'
              };
              return colors[category] || colors['General'];
            };

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-blue-200/50 h-fit"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:bg-blue-50/50 group"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(faq.category)}`}>
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 mt-1"
                    >
                      <div className={`p-2 rounded-full transition-all duration-200 ${
                        openIndex === index 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-gray-100 pt-6">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10  border border-blue-500/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Our expert real estate team is available 24/7 to provide personalized assistance 
                and guide you through every step of your property journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  Call Us Now
                </button>
                <button className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 backdrop-blur-sm flex items-center gap-2">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  Send Message
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Available 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-sm">Expert Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                  <span className="text-sm">Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;