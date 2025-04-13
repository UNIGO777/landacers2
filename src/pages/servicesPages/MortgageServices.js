import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calculator, Clock, Award, TrendingDown, CheckCircle, Percent } from 'lucide-react';
import { toast } from 'react-toastify';

const MortgageServicesPage = () => {
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
      icon: <Calculator className="w-10 h-10 text-indigo-600" />,
      title: "Mortgage Pre-Approval",
      description: "Get pre-approved for a mortgage to understand your budget and strengthen your position when making offers on properties."
    },
    {
      icon: <DollarSign className="w-10 h-10 text-indigo-600" />,
      title: "Loan Options Comparison",
      description: "Compare various mortgage products from multiple lenders to find the best rates and terms for your specific situation."
    },
    {
      icon: <TrendingDown className="w-10 h-10 text-indigo-600" />,
      title: "Refinancing Analysis",
      description: "Evaluate whether refinancing your current mortgage could save you money or help you achieve other financial goals."
    },
    {
      icon: <Clock className="w-10 h-10 text-indigo-600" />,
      title: "Expedited Processing",
      description: "Accelerated mortgage application processing to help you close on your property purchase faster."
    },
    {
      icon: <Award className="w-10 h-10 text-indigo-600" />,
      title: "Special Programs Access",
      description: "Access to specialized mortgage programs for first-time buyers, veterans, and other qualifying individuals."
    },
    {
      icon: <Percent className="w-10 h-10 text-indigo-600" />,
      title: "Rate Lock Guidance",
      description: "Strategic advice on when to lock in your interest rate to potentially save thousands over the life of your loan."
    }
  ];

  // Loan types
  const loanTypes = [
    {
      title: "Conventional Loans",
      description: "Traditional mortgage loans not backed by the government, ideal for borrowers with strong credit and stable income.",
      features: [
        "Competitive interest rates",
        "Fixed and adjustable rate options",
        "Flexible down payment requirements",
        "Various term lengths available"
      ]
    },
    {
      title: "FHA Loans",
      description: "Government-backed loans with more lenient qualification requirements, perfect for first-time homebuyers or those with limited savings.",
      features: [
        "Down payments as low as 3.5%",
        "Lower credit score requirements",
        "Competitive interest rates",
        "More flexible debt-to-income ratios"
      ]
    },
    {
      title: "VA Loans",
      description: "Loans for veterans, active military members, and eligible spouses with exceptional benefits and terms.",
      features: [
        "No down payment required",
        "No private mortgage insurance",
        "Competitive interest rates",
        "Limited closing costs"
      ]
    },
    {
      title: "Jumbo Loans",
      description: "Loans that exceed the conforming loan limits, designed for higher-value properties and luxury homes.",
      features: [
        "Higher loan amounts available",
        "Competitive rates for qualified borrowers",
        "Various term options",
        "Fixed and adjustable rate options"
      ]
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The mortgage team at Land Acre found me a loan with a rate significantly lower than what my bank offered. Their expertise saved me thousands over the life of my loan.",
      author: "David Wilson",
      position: "First-time Homebuyer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
    },
    {
      quote: "When I was looking to refinance, Land Acre's mortgage advisors walked me through every option and helped me make an informed decision that perfectly aligned with my financial goals.",
      author: "Sophia Rodriguez",
      position: "Homeowner",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1889&auto=format&fit=crop"
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What documents do I need to apply for a mortgage?",
      answer: "Typically, you'll need proof of income (pay stubs, W-2s, tax returns), proof of assets (bank statements, investment accounts), identification documents, credit history, and employment verification. Our mortgage advisors will provide you with a detailed checklist based on your specific situation."
    },
    {
      question: "How long does the mortgage approval process take?",
      answer: "The timeline varies depending on the loan type and your financial situation, but generally, pre-approval can be completed within 1-3 days. The full mortgage approval process typically takes 30-45 days from application to closing. Our expedited processing service can help accelerate this timeline."
    },
    {
      question: "What's the difference between pre-qualification and pre-approval?",
      answer: "Pre-qualification is an informal estimate of how much you might be able to borrow based on self-reported information. Pre-approval is a more formal process where the lender verifies your financial information and credit, resulting in a specific loan amount you're approved for. Pre-approval carries more weight when making offers on properties."
    },
    {
      question: "How much down payment do I need?",
      answer: "Down payment requirements vary by loan type. Conventional loans typically require 5-20%, FHA loans can be as low as 3.5%, and VA loans may require no down payment for eligible veterans. We can help you explore options that match your financial situation."
    },
    {
      question: "Can I get a mortgage with less-than-perfect credit?",
      answer: "Yes, there are mortgage options for borrowers with various credit profiles. FHA loans, for example, have more flexible credit requirements. Our mortgage advisors specialize in finding solutions for borrowers with diverse financial backgrounds."
    }
  ];

  // Calculator state
  const [calculatorValues, setCalculatorValues] = useState({
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculatorValues({
      ...calculatorValues,
      [name]: parseFloat(value)
    });
  };

  const calculateMortgage = (e) => {
    e.preventDefault();
    const { loanAmount, interestRate, loanTerm } = calculatorValues;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    setMonthlyPayment(payment.toFixed(2));
  };

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  loanAmount: '',
  loanType: '',
  message: ''
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
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
            toast.success('Thank you for your inquiry. Our mortgage team will contact you shortly!');
            setFormData({
              name: '',
              email: '',
              phone: '',
              loanAmount: '',
              loanType: '',
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
      <section className="relative bg-gradient-to-r from-indigo-900 to-blue-800 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop"
            alt="Mortgage Services"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Expert Mortgage Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">Find the perfect financing solution for your real estate investment with our specialized mortgage services</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#calculator" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Calculate Your Mortgage
              </a>
              <a href="#contact" className="bg-white hover:bg-gray-100 text-indigo-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center">
                Speak to an Advisor
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Choose Our Mortgage Services?</h2>
              <p className="text-lg text-gray-600 mb-6">Navigating the complex world of mortgage financing can be overwhelming. Our team of experienced mortgage advisors simplifies the process, helping you secure the best possible financing for your real estate investment.</p>
              <p className="text-lg text-gray-600 mb-6">With access to a wide network of lenders and loan products, we find personalized solutions that align with your financial goals and circumstances.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="font-medium text-gray-800">Access to 50+ lenders and loan products</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="font-medium text-gray-800">Over $500 million in loans facilitated</p>
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
                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=2073&auto=format&fit=crop"
                alt="Mortgage Team"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mortgage Services</h2>
            <p className="text-lg text-gray-600">Comprehensive mortgage solutions tailored to your unique financial situation and real estate goals.</p>
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
                <div className="bg-indigo-50 p-4 rounded-full inline-block mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section id="calculator" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Mortgage Calculator</h2>
            <p className="text-lg text-gray-600">Estimate your monthly mortgage payments based on loan amount, interest rate, and term.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-indigo-600">
                <h3 className="text-2xl font-bold text-white mb-6">Your Estimated Payment</h3>
                <div className="bg-indigo-500 bg-opacity-50 rounded-xl p-6 mb-6">
                  <p className="text-indigo-100 mb-2">Monthly Payment</p>
                  <p className="text-4xl font-bold text-white mb-2">
                    ${monthlyPayment > 0 ? monthlyPayment : '0.00'}
                  </p>
                  <p className="text-indigo-200 text-sm">Principal and Interest</p>
                </div>
                <p className="text-indigo-100 text-sm">This calculation does not include taxes, insurance, or other fees that may be part of your total monthly payment.</p>
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Adjust Your Parameters</h3>
                <form onSubmit={calculateMortgage} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="loanAmount"
                        value={calculatorValues.loanAmount}
                        onChange={handleCalculatorChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        min="1000"
                        step="1000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Percent className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="interestRate"
                        value={calculatorValues.interestRate}
                        onChange={handleCalculatorChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        min="0.1"
                        max="20"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
                    <select
                      name="loanTerm"
                      value={calculatorValues.loanTerm}
                      onChange={handleCalculatorChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    Calculate Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Mortgage Loan Options</h2>
            <p className="text-lg text-gray-600">Explore different types of mortgage loans to find the best fit for your financial situation.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{loan.title}</h3>
                <p className="text-gray-600 mb-6">{loan.description}</p>
                <h4 className="text-lg font-semibold text-indigo-600 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {loan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Client Success Stories</h2>
            <p className="text-lg text-gray-600">Hear from clients who found their perfect mortgage solution with our expert guidance.</p>
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
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-100">
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
                      <p className="text-indigo-600">{testimonial.position}</p>
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
            <p className="text-lg text-gray-600">Find answers to common questions about our mortgage services.</p>
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
                  className={`flex justify-between items-center w-full p-5 text-left bg-white rounded-lg border ${activeAccordion === index ? 'border-indigo-500' : 'border-gray-200'} transition-colors duration-300`}
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Speak to a Mortgage Advisor</h2>
            <p className="text-lg text-gray-600">Get personalized mortgage advice from our team of experienced advisors.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-white">
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
                  <p className="font-medium mb-2">Mortgage Consultation Hours</p>
                  <p className="text-indigo-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-indigo-100">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-indigo-100">Sunday: Closed</p>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="access_key" value="YOUR-ACCESS-KEY-HERE" />
                  <input type="hidden" name="subject" value="New Mortgage Service Inquiry" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your name"
                      />
                      {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your email"
                      />
                      {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your phone number"
                      />
                      {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                      <select
                        id="loanType"
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select loan type</option>
                        <option value="conventional">Conventional Loan</option>
                        <option value="fha">FHA Loan</option>
                        <option value="va">VA Loan</option>
                        <option value="jumbo">Jumbo Loan</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Tell us about your mortgage needs"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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

export default MortgageServicesPage;




