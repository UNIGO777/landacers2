

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaUser, FaSignOutAlt, FaHeart, FaMapMarkerAlt, FaSearch, FaPhone, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSearchURL } from '../../utils/urlGenerator';
import { useLocation } from '../../Hooks';
import ROUTES_NAME from "../../constants/routes"
import Authentication from "../login/Authentication"
import SearchBox from "../SearchBox/SearchBox"
import WebsiteLogo from "../../media/LandsAcers Icon LOGO.png"

const Navbar = ({ loginOpen, setLoginOpen }) => {
  const navigate = useNavigate(); 

  // Get current city and state from location store
  const { city, state } = useLocation();

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerLocation = useRouterLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [contactBoxDropdown, setContactBoxdropdown] = useState(false);
  const [userData, setUserData] = useState()

  

  const contact = process.env.REACT_APP_CONTACT_NUMBER;
  const whatsappContact = process.env.REACT_APP_WHATSAPP_NUMBER;

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const openLogin = () => {
    setNavOpen(false);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    setLoginOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = ROUTES_NAME.HOME;
  };

  useEffect(() => {
    const chakeLogin = () => {
      const User = localStorage.getItem('user')
      if (User) {
        setIsLoggedIn(true)
        setUserData(JSON.parse(User))
      }

    }
    chakeLogin()
  }, []);

  // Ensure to reset overflow when login is closed
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : 'auto'; // Set overflow based on navOpen state
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
    };
  }, [navOpen]);

  const handleNavToggle = () => {
    setNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = routerLocation.pathname === ROUTES_NAME.HOME;

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isHomePage
          ? scrolled
            ? '#ffffff'
            : 'transparent'
          : '#ffffff',
        boxShadow: scrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-40`}
    >
      <div className="w-full bg-blue-600 py-2 cursor-pointer">
        <div className="px-4 md:px-10 mx-auto">
          <div className="flex justify-between items-center">
            {/* Desktop Logo */}
            <div className={`hidden md:block text-2xl font-bold text-white`}>
              <Link to={ROUTES_NAME.HOME} className="flex items-center gap-2">
                <img src={WebsiteLogo} className="w-10 px-2 py-2 rounded-full object-cover overflow-visible bg-white" alt="Land Acre Logo" />
                <span className="text-xl">Land Acre</span>
              </Link>
            </div>
            
            {/* Mobile - Only show Post Property button */}
           
            
            {/* Desktop Actions */}
            <div className="text-white w-full flex md:w-auto justify-end  gap-5  items-center text-sm">
              <div className="hidden md:flex">
                <div onClick={() => navigate(ROUTES_NAME.SALLER_LOGIN)} className="flex items-center justify-center gap-2 bg-white pl-3 px-1 h-[30px] text-black rounded-full hover:scale-[0.9] transition-all">
                  Post property for <span className="bg-blue-600 px-4 text-white py-[2px] rounded-full">Free</span>
                </div>
              </div>
              <a href={`tel:+91 72240 48054`} className="hover:underline text-xs md:text-sm">
                <span className="inline">Call us: </span>+91 72240 48054
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white justify-between py-3 mx-auto px-4 md:px-10 md:py-4">
        {/* Mobile Logo */}
        <div className="md:hidden">
          <Link to={ROUTES_NAME.HOME} className="flex items-center gap-2">
            <img src={WebsiteLogo} className="w-8 h-8 rounded-full object-cover bg-white" alt="Land Acre Logo" />
            <span className="text-lg font-bold text-gray-800">Land Acre</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-20 w-full">
          {[{
            "Buy Property": {
              sections: {
                "BUY A HOME": {
                  "Land": generateSearchURL('Land', 'Buy', city || '', state || ''),
                  "Plot": generateSearchURL('Plot', 'Buy', city || '', state || ''),
                },
                "COMMERCIAL": {
                  "Office Space": generateSearchURL('Office', 'Buy', city || '', state || ''),
                  "Retail Space": generateSearchURL('Shop', 'Buy', city || '', state || ''),
                },
                "POPULAR AREAS": {
                  "Delhi": generateSearchURL('FlatApartment', 'Buy', 'Delhi', 'Delhi'),
                  "Mumbai": generateSearchURL('FlatApartment', 'Buy', 'Mumbai', 'Maharashtra'),
                  "Bangalore": generateSearchURL('FlatApartment', 'Buy', 'Bangalore', 'Karnataka'),
                  "Hyderabad": generateSearchURL('FlatApartment', 'Buy', 'Hyderabad', 'Telangana'),
                  "Chennai": generateSearchURL('FlatApartment', 'Buy', 'Chennai', 'Tamil Nadu'),
                  "Kolkata": generateSearchURL('FlatApartment', 'Buy', 'Kolkata', 'West Bengal'),
                  "Pune": generateSearchURL('FlatApartment', 'Buy', 'Pune', 'Maharashtra'),
                  "Ahmedabad": generateSearchURL('FlatApartment', 'Buy', 'Ahmedabad', 'Gujarat'),
                  ...(city && city !== 'Delhi' && city !== 'Mumbai' && city !== 'Bangalore' && 
                      city !== 'Hyderabad' && city !== 'Chennai' && city !== 'Kolkata' && 
                      city !== 'Pune' && city !== 'Ahmedabad' ? 
                      { [`${city} (Your City)`]: generateSearchURL('FlatApartment', 'Buy', city, state || '') } : {})
                }
              }
            }
          }, {
            "Sell Properties": {
              sections: {
                "FOR SELLERS": {
                  "Login As Seller": ROUTES_NAME.SALLER_LOGIN,
                  "Register As Seller": ROUTES_NAME.SALLER_SIGNUP,
                },
                "FOR BUILDERS": {
                  "Login As Builder": ROUTES_NAME.SALLER_LOGIN,
                  "Register As Builder": ROUTES_NAME.SALLER_SIGNUP,
                },
                "FOR AGENTS": {
                  "Login As Agent": ROUTES_NAME.SALLER_LOGIN,
                  "Register As Agent": ROUTES_NAME.SALLER_SIGNUP
                }
              }
            }
          }, {
            "Help": {
              sections: {
                "SUPPORT": {
                  "Contact Us": ROUTES_NAME.CONTACT,
                  "Privacy Policy": ROUTES_NAME.PRIVACY_POLICY,
                  "Terms & Conditions": ROUTES_NAME.TERMS_CONDITIONS
                }
              }
            }
          }].map((item, index) => (
            <div key={index} className="relative group">
              {Object.entries(item).map(([menuTitle, menuData]) => (
                <div key={menuTitle} className="flex items-center gap-2 cursor-pointer relative">
                  <span className="text-black font-medium group-hover:text-blue-600 transition-colors">
                    {menuTitle}
                  </span>
                  <FaChevronDown className="w-3 h-3 text-black group-hover:rotate-180 transition-transform" />
                  
                  <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 bg-white shadow-xl rounded-lg py-6 px-6 min-w-[600px] z-50 border border-gray-200 transition-all duration-300 transform scale-95 group-hover:scale-100 translate-y-[-10px] group-hover:translate-y-0">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                    >
                      <div className="grid grid-cols-2 gap-8">
                        {/* Left Column - Main Sections */}
                        <div className="space-y-6">
                          {Object.entries(menuData.sections).map(([sectionTitle, sectionItems], sectionIndex) => (
                            <motion.div 
                              key={sectionTitle}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: 0.1 * sectionIndex,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                              }}
                            >
                              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                {sectionTitle}
                              </h3>
                              <div className="space-y-2">
                                {Object.entries(sectionItems).map(([itemTitle, link], index) => (
                                  <motion.div
                                    key={itemTitle}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                      delay: 0.1 * (index + 1) + (0.1 * sectionIndex),
                                      type: "spring",
                                      stiffness: 200,
                                      damping: 20
                                    }}
                                  >
                                    <Link
                                      to={link}
                                      className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200"
                                    >
                                      {itemTitle}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Right Column - Additional Info */}
                        <motion.div 
                          className="bg-blue-50 rounded-lg p-4"
                          initial={{ opacity: 0, x: 30, rotateY: -30 }}
                          animate={{ opacity: 1, x: 0, rotateY: 0 }}
                          transition={{ 
                            delay: 0.2,
                            type: "spring",
                            stiffness: 150,
                            damping: 20
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div 
                              className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="text-white text-xs font-bold">i</span>
                            </motion.div>
                            <span className="text-blue-600 font-semibold text-sm">INTRODUCING Insights</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            {[
                              "Understand localities",
                              "Read Resident Reviews",
                              "Check Price Trends",
                              "Tools, Utilities & more"
                            ].map((text, index) => (
                              <motion.div 
                                key={text}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: 0.3 + (index * 0.1),
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 20
                                }}
                                whileHover={{ x: 5 }}
                              >
                                <motion.div 
                                  className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center"
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                </motion.div>
                                <span>{text}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Bottom Contact Info */}
                      <motion.div 
                        className="mt-6 pt-4 border-t border-gray-200 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.5,
                          type: "spring",
                          stiffness: 150,
                          damping: 20
                        }}
                      >
                        <p className="text-sm text-gray-500">
                          Email us at <span className="text-blue-600">contact@landacre.in</span>, or call us at <span className="text-blue-600">+91 72240 48054</span>
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              ))}
              
            </div>
          ))}
        </div>
        
        {/* Desktop Login/Profile Section */}
        <div className="hidden md:block">
          {
            isLoggedIn ? (
              <div className="relative">
                <div 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <FaUserCircle className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-700 flex w-[10vh]">{userData?.firstName + " " + userData?.lastName}</span>
                  <FaChevronDown className={`w-3 h-3 text-gray-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={()=> setProfileDropdownOpen(!profileDropdownOpen)}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link 
                      to={ROUTES_NAME.PROFILE} 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to={ROUTES_NAME.MY_PROPERTIES} 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Properties
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={openLogin}
                  className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate(ROUTES_NAME.SIGNUP)}
                  className="px-6 py-2 bg-blue-600 text-white w-28 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )
          }
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={handleNavToggle}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {navOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>

       </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link to={ROUTES_NAME.HOME} className="flex items-center gap-2" onClick={() => setNavOpen(false)}>
                  <img src={WebsiteLogo} className="w-8 h-8 rounded-full object-cover bg-white" alt="Land Acre Logo" />
                  <span className="text-lg font-bold text-gray-800">Land Acre</span>
                </Link>
                <button
                  onClick={handleNavToggle}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Buy Property Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      onClick={() => toggleSubMenu('buyProperty')}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-800 py-2"
                    >
                      <span>Buy Property</span>
                      <FaChevronDown className={`w-4 h-4 transition-transform ${subMenuOpen.buyProperty ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {subMenuOpen.buyProperty && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pl-4 space-y-2"
                        >
                          <Link
                            to={generateSearchURL('LandPlot', 'Buy', city || '', state || '')}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Land/Plot
                          </Link>
                          <Link
                            to={generateSearchURL('Office', 'Buy', city || '', state || '')}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Office Space
                          </Link>
                          <Link
                            to={generateSearchURL('Shop', 'Buy', city || '', state || '')}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Retail Space
                          </Link>
                          {city && (
                            <Link
                              to={generateSearchURL('FlatApartment', 'Buy', city, state || '')}
                              className="block text-blue-600 font-medium hover:text-blue-800 py-1"
                              onClick={() => setNavOpen(false)}
                            >
                              Properties in {city}
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sell Properties Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      onClick={() => toggleSubMenu('sellProperty')}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-800 py-2"
                    >
                      <span>Sell Properties</span>
                      <FaChevronDown className={`w-4 h-4 transition-transform ${subMenuOpen.sellProperty ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {subMenuOpen.sellProperty && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pl-4 space-y-2"
                        >
                          <Link
                            to={ROUTES_NAME.SALLER_LOGIN}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Login As Seller
                          </Link>
                          <Link
                            to={ROUTES_NAME.SALLER_SIGNUP}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Register As Seller
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Help Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      onClick={() => toggleSubMenu('help')}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-800 py-2"
                    >
                      <span>Help</span>
                      <FaChevronDown className={`w-4 h-4 transition-transform ${subMenuOpen.help ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {subMenuOpen.help && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pl-4 space-y-2"
                        >
                          <Link
                            to={ROUTES_NAME.CONTACT}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Contact Us
                          </Link>
                          <Link
                            to={ROUTES_NAME.PRIVACY_POLICY}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Privacy Policy
                          </Link>
                          <Link
                            to={ROUTES_NAME.TERMS_CONDITIONS}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                            onClick={() => setNavOpen(false)}
                          >
                            Terms & Conditions
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <FaUserCircle className="w-6 h-6 text-gray-600" />
                      <span className="text-gray-700 font-medium">{userData?.firstName + " " + userData?.lastName}</span>
                    </div>
                    <Link
                      to={ROUTES_NAME.PROFILE}
                      className="block w-full text-center py-2 text-gray-700 hover:text-blue-600 border border-gray-300 rounded-lg"
                      onClick={() => setNavOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to={ROUTES_NAME.MY_PROPERTIES}
                      className="block w-full text-center py-2 text-gray-700 hover:text-blue-600 border border-gray-300 rounded-lg"
                      onClick={() => setNavOpen(false)}
                    >
                      My Properties
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 text-red-600 hover:text-red-700 border border-red-300 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={openLogin}
                      className="w-full py-3 text-blue-600 hover:text-blue-700 font-medium border border-blue-600 rounded-lg"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate(ROUTES_NAME.SIGNUP);
                        setNavOpen(false);
                      }}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
                
                {/* Contact Info */}
                <div className="mt-4 pt-4 border-t border-gray-300 text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <a href={`tel:+91${contact}`} className="text-blue-600 hover:underline text-sm">
                    Call us: +91 {contact}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Authentication isOpen={loginOpen} setIsOpen={setLoginOpen} />
      {/* {location.pathname !== ROUTES_NAME.HOME && searchbar && (
        <div className='hidden md:block'>
          <SearchBox />
        </div>
      )} */}
    </motion.nav>
  );
};

export default Navbar;

