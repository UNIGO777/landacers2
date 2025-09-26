import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import ROUTES_NAME from "../../constants/routes";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const location = useLocation(); 

  return (
    <footer
      className={`w-full py-12 transition-all duration-300 bg-white text-gray-800 shadow-md border-t border-gray-200`}
    >
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-600 border-b pb-2">About Land Acre</h3>
            <p className="text-gray-600 mb-4">Land Acre is a premier real estate platform connecting buyers, sellers, and agents with the perfect properties across India.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/18YLB2NA3Y/" className="text-blue-600 hover:text-blue-800 transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/land_acre75722" className="text-blue-600 hover:text-blue-800 transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/landacre.in/" className="text-blue-600 hover:text-blue-800 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/land-acre-a02797360/" className="text-blue-600 hover:text-blue-800 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-600 border-b pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES_NAME.HOME}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.ABOUT}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.CONTACT}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.PRIVACY_POLICY}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-600 border-b pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES_NAME.SEARCH_RESULTS}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.SALLER_LOGIN}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Post a Property
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.PROPERTY_VALUATION}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Property Valuation
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.PROPERTY_MANAGEMENT}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Property Management
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.LEGEL_ASSISTANCE}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Legal Assistance
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.HOME_INSPACTION}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Home Inspection
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES_NAME.REAL_ESTATE_ADVICE}
                  className={`text-gray-600 hover:text-blue-600 hover:pl-1 cursor-pointer transition-all flex items-center`}
                >
                  <span className="mr-2">›</span> Real Estate Advice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-600 border-b pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3" />
                <span className="text-gray-600">A-89, Airport Rd, Vijay Nagar, Lalghati, Bhopal, Madhya Pradesh 462030</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-600 mr-3" />
                <span className="text-gray-600">+91 72240 48054</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-3" />
                <span className="text-gray-600">contact@landAcre.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Property Creator. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link to={ROUTES_NAME.PRIVACY_POLICY} className="text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</Link>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">
            Developed by <a href="https://naman-web.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Naman Jain</a> form <a href="https://nxt-gen-digitals.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">NxtGenDigitals</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
