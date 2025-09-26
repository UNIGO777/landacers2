import { useLocationStore } from '../store';

/**
 * Custom hook for location management
 * Provides a simplified interface to the location store
 */
export const useLocation = () => {
  const { 
    city,
    state,
    country,
    fullLocationData,
    coordinates,
    locationLoading,
    locationError,
    locationPermissionDenied,
    setCity,
    setState,
    setCountry,
    setFullLocationData,
    setCoordinates,
    setLocationLoading,
    setLocationError,
    setLocationPermissionDenied,
    clearLocation,
    getCurrentLocation,
    getCityFromCoords,
    setLocationManually,
    getFormattedLocation,
    hasLocation
  } = useLocationStore();
  
  return {
    // Location data
    city,
    state,
    country,
    fullLocationData,
    coordinates,
    
    // Loading and error states
    locationLoading,
    locationError,
    locationPermissionDenied,
    
    // Actions
    setCity,
    setState,
    setCountry,
    setFullLocationData,
    setCoordinates,
    setLocationLoading,
    setLocationError,
    setLocationPermissionDenied,
    clearLocation,
    getCurrentLocation,
    getCityFromCoords,
    setLocationManually,
    
    // Helper functions
    getFormattedLocation,
    hasLocation,
    isLocationAvailable: hasLocation(),
    isLoading: locationLoading,
    hasError: Boolean(locationError),
    isPermissionDenied: locationPermissionDenied
  };
};

export default useLocation;