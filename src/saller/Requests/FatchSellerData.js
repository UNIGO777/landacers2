import axios from "axios";
import { toast } from "react-toastify";
import ROUTES_NAME from "../../constants/routes";


let sellerDetailsPromise = null; // Cache for the promise

const fetchSellerData = async () => {
  // Return cached promise if exists
  if (window.location.pathname === ROUTES_NAME.SALLER_LOGIN || !window.location.pathname.startsWith("/saller")) {
    return null
  }
  if (sellerDetailsPromise) return sellerDetailsPromise; 

  try {
    sellerDetailsPromise = axios.get( // Store the promise immediately
      `https://api.landacre.in/api/sellers/me`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,
          "Content-Type": "application/json"
        }
      }
    );

    const response = await sellerDetailsPromise;
    sellerDetailsPromise = response
    return response.data;
    
  } catch (error) {
    localStorage.removeItem('sellerToken'); // Remove token on error
    if (error.response) {
      toast.error(error.response.data.message || 'Failed to fetch analytics');
    } else if (error.request) {
      toast.error('No response from server');
    } else {
      toast.error(error.message || 'Error setting up request');
    }
    // Navigate to seller login
    if (window.location.pathname.includes("saller") && window.location.pathname !== ROUTES_NAME.SALLER_LOGIN) {
      window.location.href = ROUTES_NAME.SALLER_LOGIN; // Adjust the path as necessary
    }
  }
};

const sellerDetails = fetchSellerData()

export default sellerDetails
