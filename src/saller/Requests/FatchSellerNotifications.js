import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for error notifications
import ROUTES_NAME from '../../constants/routes';

let notificationsPromise = null; // Cache for the promise

const fetchSellerNotifications = async () => {
  // Return cached promise if exists
  if (window.location.pathname === ROUTES_NAME.SALLER_LOGIN || !window.location.pathname.startsWith("/saller")) {
    return null
  }
  if (notificationsPromise) return notificationsPromise; // Return cached promise if exists

  try {
    const token = localStorage.getItem('sellerToken');
    if (!token) {
      throw new Error('Unauthorized');
    }

    // Get page number from URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page') || 1;

    notificationsPromise = axios.get(
      `https://api.landacre.in/api/notifications?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await notificationsPromise;
    notificationsPromise = response.data; // Store the response data
    return response.data.data;

  } catch (error) {
    localStorage.removeItem('sellerToken'); // Remove token on error
    if (error.response) {
      toast.error(error.response.data.message || 'Failed to fetch notifications');
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

const sellerNotifications = fetchSellerNotifications();

export default sellerNotifications;
