import axios from "axios";
import ROUTES_NAME from "../../constants/routes";


let markAllReadPromise = null; // Cache for the promise

const markAllNotificationsRead = async () => {
  // Return cached promise if exists
  
  if (window.location.pathname === ROUTES_NAME.SALLER_LOGIN || !window.location.pathname.startsWith("/saller")) {
    return null
  }
  if(markAllReadPromise) return markAllReadPromise
  try {
    markAllReadPromise = axios.put(
      `${process.env.REACT_APP_backendUrl}/api/notifications/mark-all-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,
        },
      }
    );

    const response = await markAllReadPromise;
    markAllReadPromise = response.data
    return response.data;
    
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to mark notifications as read");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up mark read request");
    }
  }
};

export default markAllNotificationsRead;
