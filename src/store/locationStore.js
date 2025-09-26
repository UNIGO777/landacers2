import { create } from 'zustand';

export const useLocationStore = create((set, get) => ({
  // Location state
  city: '',
  state: '',
  country: '',
  fullLocationData: null,
  coordinates: null,
  locationLoading: false,
  locationError: null,
  locationPermissionDenied: false,
  
  // Actions
  setCity: (city) => set({ city }),
  setState: (state) => set({ state }),
  setCountry: (country) => set({ country }),
  setFullLocationData: (data) => set({ fullLocationData: data }),
  setCoordinates: (coordinates) => set({ coordinates }),
  setLocationLoading: (loading) => set({ locationLoading: loading }),
  setLocationError: (error) => set({ locationError: error }),
  setLocationPermissionDenied: (denied) => set({ locationPermissionDenied: denied }),
  
  // Clear location data
  clearLocation: () => set({
    city: '',
    state: '',
    country: '',
    fullLocationData: null,
    coordinates: null,
    locationError: null,
    locationPermissionDenied: false
  }),
  
  // Get current location using geolocation API
  getCurrentLocation: async () => {
    const { getCityFromCoords } = get();
    
    try {
      set({ locationLoading: true, locationError: null, locationPermissionDenied: false });
      
      if (!("geolocation" in navigator)) {
        throw new Error("Geolocation is not supported by this browser.");
      }
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              set({ locationPermissionDenied: true });
            }
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        );
      });
      
      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      
      set({ coordinates });
      
      // Get city data from coordinates
      const locationData = await getCityFromCoords(
        coordinates.latitude, 
        coordinates.longitude
      );
      
      if (locationData) {
        set({
          city: locationData.city || '',
          state: locationData.state || '',
          country: locationData.country || '',
          fullLocationData: locationData,
          locationLoading: false
        });
      } else {
        throw new Error('Failed to get location data');
      }
      
    } catch (error) {
      console.error("Error getting location:", error);
      set({ 
        locationError: error.message || 'Failed to get location',
        locationLoading: false 
      });
    }
  },
  
  // Get city from coordinates using backend API
  getCityFromCoords: async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.landacre.in/api/geolocation/reverse?lat=${lat}&lon=${lon}`
      );
      const response = await res.json();
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch location');
      }
      
      const { data } = response;
      console.log("Location Data:", {
        city: data.city,
        state: data.state,
        country: data.country,
        full: data.full
      });
      
      return data;
    } catch (error) {
      console.error("Error fetching location from coordinates:", error);
      throw error;
    }
  },
  
  // Set location manually (for testing or user input)
  setLocationManually: (locationData) => {
    set({
      city: locationData.city || '',
      state: locationData.state || '',
      country: locationData.country || '',
      fullLocationData: locationData,
      locationError: null,
      locationPermissionDenied: false
    });
  },
  
  // Get formatted location string
  getFormattedLocation: () => {
    const { city, state, country } = get();
    if (city && state) {
      return `${city}, ${state}`;
    } else if (city) {
      return city;
    } else if (state) {
      return state;
    }
    return '';
  },
  
  // Check if location is available
  hasLocation: () => {
    const { city } = get();
    return Boolean(city);
  }
}));