import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ArrowRight, Check, Zap, Shield, Clock, ExternalLink, Home, Wallet, BarChart2, Building2, Search, TrendingUp, Users, Landmark, Paintbrush, Scale, Compass, Hammer, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [expandedService, setExpandedService] = useState(null);
  const navigate = useNavigate();

  // Service categories remain the same
  const categories = [
    { id: 'popular', name: 'Popular Services' },
    { id: 'property', name: 'Property Services' },
    { id: 'professional', name: 'Professional Services' },
    { id: 'consultation', name: 'Consultation Services' }
  ];

  // Services data remains the same
  const servicesByCategory = {
   popular: [
      {
        id: 'sell',
        title: "Sell Properties",
        description: "Unlock the potential of your property. List your property for sale and connect with interested buyers quickly and efficiently.",
        features: [
          "Professional property listing",
          "Market analysis and pricing strategy",
          "Targeted marketing to potential buyers",
          "Negotiation support"
        ],
        icon: Home,
        buttonText: "List Your Property",
        bgImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2071&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/saller/login"
      },
      {
        id: 'mortgage',
        title: "Mortgage Services",
        description: "Find the best financing options for your property purchase. Our mortgage experts will guide you through the entire process.",
        features: [
          "Competitive interest rates",
          "Flexible repayment options",
          "Fast pre-approval process",
          "Expert guidance throughout"
        ],
        icon: Wallet,
        buttonText: "Explore Financing",
        bgImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/mortgage"
      },
      {
        id: 'valuation',
        title: "Property Valuation",
        description: "Get an accurate assessment of your property's worth. Our valuation experts use market data and analytics for precise estimates.",
        features: [
          "Comprehensive market analysis",
          "Detailed valuation report",
          "Expert local market insights",
          "Fast turnaround time"
        ],
        icon: BarChart2,
        buttonText: "Get Valuation",
        bgImage: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=2073&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/valuation"
      },
    ],
    property: [
      {
        id: 'management',
        title: "Property Management",
        description: "Let us handle the complexities of managing your property. From tenant screening to maintenance, we've got you covered.",
        features: [
          "Tenant screening and selection",
          "Rent collection and accounting",
          "Property maintenance coordination",
          "Regular property inspections"
        ],
        icon: Building2,
        buttonText: "Learn More",
        bgImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/property-management"
      },
      {
        id: 'inspection',
        title: "Home Inspection",
        description: "Ensure your property is in perfect condition. Our thorough inspection services identify potential issues before they become problems.",
        features: [
          "Comprehensive structural assessment",
          "Electrical and plumbing inspection",
          "Detailed inspection report",
          "Repair recommendations"
        ],
        icon: Search,
        buttonText: "Book Inspection",
        bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/inspection"
      },
      {
        id: 'investment',
        title: "Investment Advisory",
        description: "Make informed real estate investment decisions. Our advisors analyze market trends and help you maximize your returns.",
        features: [
          "Market trend analysis",
          "Investment opportunity identification",
          "ROI projections and analysis",
          "Portfolio diversification strategy"
        ],
        icon: TrendingUp,
        buttonText: "Get Advice",
        bgImage: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=2069&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/investment"
      },
    ],
    professional: [
      {
        id: 'agents',
        title: "Agents / Brokers",
        description: "Here Are Hassle-Free Solutions! Buy - Sell - Rent Your Property with our network of experienced agents.",
        features: [
          "Experienced local agents",
          "Personalized property matching",
          "Market expertise and insights",
          "End-to-end transaction support"
        ],
        icon: Users,
        buttonText: "Find an Agent",
        bgImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1932&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/agents"
      },
      {
        id: 'builders',
        title: "Builders / Developers",
        description: "List of the most trusted and reliable builders to fulfill your Dream HOME.",
        features: [
          "Vetted quality builders",
          "Diverse project portfolios",
          "Transparent pricing and timelines",
          "Customization options"
        ],
        icon: Building2,
        buttonText: "Explore Builders",
        bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/builders"
      },
      {
        id: 'architects',
        title: "Architects / Architecture",
        description: "Professional Architecture will meet your needs and expectations.",
        features: [
          "Innovative design solutions",
          "Sustainable architecture options",
          "3D visualization and planning",
          "Regulatory compliance expertise"
        ],
        icon: Landmark,
        buttonText: "Connect with Architects",
        bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/architects"
      },
      {
        id: 'interior',
        title: "Interior Decorators",
        description: "A One-Stop Solution for all your decor Needs to Match Your Lifestyle.",
        features: [
          "Personalized design concepts",
          "Material and color consultation",
          "Furniture and accessory sourcing",
          "Project management"
        ],
        icon: Paintbrush,
        buttonText: "Hire a Decorator",
        bgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/interior-decorators"
      },
    ],
    consultation: [
      {
        id: 'legal',
        title: "Legal Assistance",
        description: "Navigate the legal aspects of real estate with our expert assistance. Get help with documentation, contracts, and compliance.",
        features: [
          "Contract review and preparation",
          "Legal documentation assistance",
          "Compliance verification",
          "Dispute resolution support"
        ],
        icon: Scale,
        buttonText: "Get Legal Help",
        bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/legal"
      },
      {
        id: 'vaastu',
        title: "Vaastu Consultant",
        description: "Connect to top most Vastu consultants for right direction.",
        features: [
          "Property Vastu analysis",
          "Remedial solutions",
          "New construction planning",
          "Personalized consultations"
        ],
        icon: Compass,
        buttonText: "Book Consultation",
        bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/vaastu"
      },
      {
        id: 'contractors',
        title: "Building Contractors",
        description: "General contractor for a home repair, remodel, or construction.",
        features: [
          "Skilled construction teams",
          "Quality material sourcing",
          "Project timeline management",
          "Budget optimization"
        ],
        icon: Hammer,
        buttonText: "Find Contractors",
        bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/contractors"
      },
      {
        id: 'consultants',
        title: "Property Consultants",
        description: "List of Leading Real Estate Consultant for Professional Assistance Services.",
        features: [
          "Market analysis and insights",
          "Investment strategy development",
          "Property portfolio optimization",
          "Customized real estate solutions"
        ],
        icon: Briefcase,
        buttonText: "Consult an Expert",
        bgImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
        accentColor: "#3498db",
        link: "/services/consultants"
      },
    ],
  };

  const currentServices = servicesByCategory[activeCategory] || [];

  return (
    <div className="relative py-16 px-4" style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1723110994499-df46435aa4b3?q=80&w=2358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-35"></div>
      
      <div className="relative px-5 md:px-10 mx-auto z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm text-gray-300 mb-2 edu-nsw-act-cursive">Land Acres</div>
          <h2 className="text-3xl font-bold text-white  ">Explore our services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesByCategory.popular.concat(servicesByCategory.property.slice(0, 3)).map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => navigate(service.link)}
                className="bg-white backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group border border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center bg-cover bg-center relative overflow-hidden"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      <IconComponent className="w-8 h-8 text-white relative z-10" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold  text-black group-hover:text-blue-400 transition-colors duration-200">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="bg-green-500 bg-opacity-90 text-gray-200 text-xs font-medium px-2 py-1 rounded-full ml-2">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;