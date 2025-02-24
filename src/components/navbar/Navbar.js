

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import ROUTES_NAME from "../../constants/routes"
import { useTheme } from "../../context/ThemeContext"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5"
import Authentication from "../login/Authentication"
import { FaUserCircle, FaHeadphones, FaChevronDown, FaPhone, FaWhatsapp } from "react-icons/fa"
import SearchBox from "../SearchBox/SearchBox"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = ({searchbar}) => {
  
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
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

  useEffect(() => {
    const chakeLogin = ()=>{
      const User = localStorage.getItem('user')
      if(User) {
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

  const isHomePage = location.pathname === ROUTES_NAME.HOME;

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isHomePage
          ? scrolled
            ? theme === 'light' ? '#ffffff' : '#1a1a1a'
            : 'transparent'
          : theme === 'light' ? '#ffffff' : '#1a1a1a',
        boxShadow: scrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-40`}
    >
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl md:py-4">
        {/* Logo */}
        <div className={`text-2xl font-bold ${isHomePage ? (scrolled ? `text-${theme}-primary` : "text-white") : `text-${theme}-text`}`}>
          <Link to={ROUTES_NAME.HOME}>Land Acers</Link>
        </div>

        {/* Desktop Links */}
        <div className="items-center space-x-3 flex">
          <Link to={ROUTES_NAME.POST_PROPERTY} className={`md:inline-flex hidden items-center px-4 py-2 text-sm font-medium text-white bg-${theme}-primary bg-pr hover:bg-opacity-80 rounded-lg `}>
            Post Your Property
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative inline-block text-left">
              <div>
                <button
                  to={ROUTES_NAME.CONTACT}
                  className={`inline-flex items-center py-3 ${isHomePage ? (scrolled ? `text-black` : "text-white") : `text-${theme}-text`} ${contactBoxDropdown ? 'border-b-2 border-light-primary' : ''} px-2 py-2 transition `}
                  onMouseEnter={() => setContactBoxdropdown(true)} onMouseLeave={() => setContactBoxdropdown(!contactBoxDropdown)}
                >
                  <FaHeadphones className="" size={15} /> {/* Headphone icon */}
                </button>
              </div>

              <AnimatePresence>
                {contactBoxDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -right-5 z-10 w-[200px] md:w-[300px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setContactBoxdropdown(true)}
                    onMouseLeave={() => setContactBoxdropdown(!contactBoxDropdown)}
                  >
                    <div className="py-1 w-full" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                      <h1 className="text-black p-2 px-4">Contact Us</h1>
                      <a href={`tel:+91${contact}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <span className="flex items-center">
                          <FaPhone className="mr-2" size={15} /> Contact us on: +91 {contact}
                        </span>
                      </a>
                      <a href={`https://wa.me/+91${whatsappContact}`} className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100">
                        <span className="flex items-center">
                          <FaWhatsapp className="mr-2" size={15} /> Whatsapp us on: +91 {whatsappContact}
                        </span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login Button */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className={`inline-flex items-center ${isHomePage ? (scrolled ? `text-black` : "text-white") : `text-${theme}-text`}  px-2  py-2 transition ${profileDropdownOpen ? 'border-b-2 border-light-primary' : ''}`}
                  id="menu-button"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <FaUserCircle className="" size={25} /> {/* Profile icon */}
                  <FaChevronDown className="ml-2" size={15} /> {/* Down arrow icon */}
                </button>
              </div>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -right-5 z-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setProfileDropdownOpen(true)}
                    onMouseLeave={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    {!isLoggedIn ? <div className="py-4" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                      <Link
                        className="text-blue-500 hover:text-blue-700 font-sm  text-md flex w-full items-center justify-center"
                        onClick={() => openLogin()}
                      >
                        <FaUserCircle className="mr-3" size={25} />  Login / Register
                      </Link>
                    </div> : <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                      <Link to={ROUTES_NAME.PROFILE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>
                        My Profile
                      </Link>
                      <Link to={ROUTES_NAME.SETTINGS} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>
                        Settings
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={openLogin}>
                        Logout
                      </button>
                    </div>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button
            className={` text-${theme}-text focus:outline-none`}
            onClick={handleNavToggle}
          >
            <GiHamburgerMenu color={isHomePage && !scrolled ? 'white' : 'black'} size={20} />
          </button>

          {/* Mobile Menu and Overlay */}
          <AnimatePresence>
            {navOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black"
                onClick={() => setNavOpen(false)}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {navOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className={`fixed top-0 right-0 h-full bg-${theme}-background shadow-lg w-[70vw] md:w-[30vw] z-50`}
              >
                <button
                  className={`absolute z-50 top-4 right-4 text-${theme}-text`}
                  onClick={() => setNavOpen(false)}
                >
                  <IoClose size={24} />
                </button>

                <div className="p-6 relative h-full">
                  <Link
                    className="text-blue-500 hover:text-blue-700 font-medium text-lg"
                    onClick={() => openLogin()}
                  >
                    {userData ? userData?.firstName + " " + userData?.lastName : "Login / Register"}
                  </Link>
                  <br />
                  <button
                    className=" w-full text-blue-500 px-4 py-2 mt-4 rounded-lg border-2 border-blue-500 hover:bg-blue-600 hover:text-white transition"
                    onClick={() => { }}
                  >
                    Post Property
                  </button>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore our Services</h3>

                    <ul className="space-y-4">
                      <li>
                        <button
                          className="flex text-black justify-between items-center w-full text-left"
                          onClick={() => toggleSubMenu("buyers")}
                        >
                          For Buyers
                          <span>{subMenuOpen.buyers ? "-" : "+"}</span>
                        </button>
                        <AnimatePresence>
                          {subMenuOpen.buyers && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              <li>
                                <Link to={ROUTES_NAME.LANDS} className="text-gray-600 hover:text-blue-500 transition">
                                  Buy Property
                                </Link>
                              </li>
                              <li>
                                <Link to={ROUTES_NAME.PLOTS} className="text-gray-600 hover:text-blue-500 transition">
                                  Rent Property
                                </Link>
                              </li>
                              <li>
                                <Link to={ROUTES_NAME.FARMHOUSES} className="text-gray-600 hover:text-blue-500 transition">
                                  Search for PG
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>

                      <li>
                        <button
                          className="flex text-black justify-between items-center w-full text-left"
                          onClick={() => toggleSubMenu("tenants")}
                        >
                          Are you Agent/Builder
                          <span>{subMenuOpen.tenants ? "-" : "+"}</span>
                        </button>
                        <AnimatePresence>
                          {subMenuOpen.tenants && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              <li>
                                <Link to="#" className="text-gray-600 hover:text-blue-500 transition">
                                  Register As Agent
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="text-gray-600 hover:text-blue-500 transition">
                                  Register As Builder
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="text-gray-600 hover:text-blue-500 transition">
                                  Login As Agent
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="text-gray-600 hover:text-blue-500 transition">
                                  Login As Builder
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>

                      <li>
                        <Link
                          to={ROUTES_NAME.ABOUT}
                          className="text-gray-600 hover:text-blue-500 transition"
                          onClick={() => setNavOpen(false)}
                        >
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 absolute bottom-5">
                    <p className="text-sm text-blue-500 underline mt-2">
                      <Link to={`tel:+91${contact}`}>Contact us on: +91 {contact}</Link>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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

