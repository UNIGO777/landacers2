import { usePropertyStore } from '../store';

/**
 * Custom hook for property management
 * Provides a simplified interface to the property store
 */
export const useProperty = () => {
  const { 
    featuredProperties,
    featuredLoading,
    featuredError,
    cityProperties,
    cityPropertiesLoading,
    searchQuery,
    searchResults,
    searchLoading,
    searchError,
    fetchFeaturedProperties,
    fetchCityProperties,
    searchProperties,
    clearSearchResults
  } = usePropertyStore();

  console.log(cityProperties, "cityproperties")
  
  return {
    // Featured properties
    featuredProperties,
    featuredLoading,
    featuredError,
    fetchFeaturedProperties,
    fetchCityProperties,
    
    // City properties
    cityProperties,

    
    // Search functionality
    searchQuery,
    searchResults,
    searchLoading,
    searchError,
    searchProperties,
    clearSearchResults,
    
    // Helper functions
    hasFeaturedProperties: featuredProperties.length > 0,
    hasSearchResults: searchResults.length > 0,
    isSearching: searchLoading,
    isLoading: featuredLoading || searchLoading
  };
  
};

export default useProperty;
