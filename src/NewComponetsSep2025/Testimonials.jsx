import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Quote,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


const Testimonials = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
      'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

   const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

const testimonials = [
  {
    name: "Priya Mehta",
    role: "First-time Homebuyer",
    location: "Mumbai, India",
    rating: 5,
    text: "LandAcre made my first home buying experience absolutely wonderful! Their team understood exactly what I was looking for and helped me find a beautiful apartment that fit my budget perfectly. Their guidance throughout the process was invaluable.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Rajesh Sharma",
    role: "Property Investor",
    location: "Delhi, India",
    rating: 5,
    text: "As someone who regularly invests in property, I can confidently say LandAcre offers exceptional service. Their market insights and property recommendations have helped me make smart investment decisions. Truly professional team!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Amit Patel",
    role: "Family Home Buyer",
    location: "Bangalore, India",
    rating: 5,
    text: "Finding our dream family home was made easy with LandAcre. They showed us properties that perfectly matched our requirements and were always available to answer our questions. Their expertise in the local market helped us make the right choice.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

const [currentIndex, setCurrentIndex] = React.useState(0);

const nextTestimonial = () => {
  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
};

const prevTestimonial = () => {
  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
};
  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div 
          className="text-left mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            What Our Clients Say
          </motion.h2>
          <div className="w-full ">
            <motion.p 
              className="text-base md:text-lg max-w-3xl text-gray-600 text-left edu-nsw-act-cursive"
              variants={itemVariants}
            >
              Don't just take our word for it. Here's what our satisfied clients have to say about our comprehensive documentation and approval services.
            </motion.p>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative hover:   transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-blue-200" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm md:text-base text-gray-600 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div 
                  className={`w-12 h-12 rounded-full mr-4 border-2 border-blue-100 flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(testimonial.name)}`}
                >
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "1000+", label: "Projects Completed" },
            
            { number: "99%", label: "Success Rate" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        
      </div>
      
      {/* Contact Modal */}
      
    </section>
  );
};

export default Testimonials;