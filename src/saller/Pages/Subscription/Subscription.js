import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProcessLoader from '../../../components/loaders/ProcessLoader';

const Subscription = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            if (newHours < 0) {
              const newDays = prev.days - 1;
              if (newDays < 0) {
                clearInterval(timer);
                return prev;
              }
              return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
            }
            return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
          }
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        return { ...prev, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setEmail('');
    alert('Thank you for subscribing! We will notify you when subscriptions are available.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {isSubmitting && <ProcessLoader message="Subscribing..." subMessage="Please wait while we process your request" />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Section */}
          <div className="p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Exciting Changes Coming Soon!
              </h1>
              <p className="text-gray-600 mb-8">
                We're working on something amazing! Our new subscription plans will help you manage your properties more effectively.
              </p>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-3 text-center"
                  >
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-xs text-blue-100">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Get notified when we launch
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Notify Me
                </motion.button>
              </form>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-3">Follow us for updates:</p>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', href: '#' },
                    { name: 'Facebook', href: '#' },
                    { name: 'Instagram', href: '#' },
                    { name: 'LinkedIn', href: '#' }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Illustration */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 lg:p-12 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Flexible Subscription Plans
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced Property Management
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Enhanced Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority Support
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscription;