import axios from 'axios'
import { toast } from 'react-toastify'
import ROUTES_NAME from '../../constants/routes'

let analyticsPromise = null // Cache for the promise

const fetchSellerAnalytics = async (year) => {
  // Return cached promise if exists
  if (window.location.pathname === ROUTES_NAME.SALLER_LOGIN || !window.location.pathname.startsWith("/saller")) {
    return null
  }
  try {
    const token = localStorage.getItem('sellerToken')
    if (!token) {
      throw new Error('Unauthorized')
    }

    analyticsPromise = axios.get(
      `https://api.landacre.in/api/sellers/myanalytics${year ? `?year=${year}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const response = await analyticsPromise
   
    analyticsPromise = response
    return response.data
    
  } catch (error) {
    localStorage.removeItem('sellerToken'); // Remove token on error
    
    if (error.response) {
      toast.error(error.response.data.message || 'Failed to fetch analytics');
    } else if (error.request) {
      toast.error('No response from server');
    } else {
      toast.error(error.message || 'Error setting up request');
      
    }
    if (window.location.pathname.includes("saller") && window.location.pathname !== ROUTES_NAME.SALLER_LOGIN) {
      window.location.href = ROUTES_NAME.SALLER_LOGIN; // Adjust the path as necessary
    }
    
  }
}

const sellerAnalytics = fetchSellerAnalytics()

export default sellerAnalytics
