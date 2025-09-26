import { create } from 'zustand';

export const usePropertyStore = create((set, get) => ({
  // Featured properties
  featuredProperties: [],
  featuredLoading: false,
  featuredError: null,
  
  // Properties across India
  cityProperties: [],
  cityPropertiesLoading: false,
  cityPropertiesError: null,
  
  // Search state
  searchQuery: '',
  searchResults: [],
  searchLoading: false,
  searchError: null,
  
  // Actions
  setFeaturedProperties: (properties) => set({ featuredProperties: properties }),
  setFeaturedLoading: (loading) => set({ featuredLoading: loading }),
  setFeaturedError: (error) => set({ featuredError: error }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchLoading: (loading) => set({ searchLoading: loading }),
  setSearchError: (error) => set({ searchError: error }),
  
  // Fetch featured properties
  fetchFeaturedProperties: async () => {
    try {
      set({ featuredLoading: true, featuredError: null });
      // Using the property service to make the API call
      const propertyService = (await import('../services/propertyService')).default;
      const response = await propertyService.getFeaturedProperties();
      
      if (response && response.data) {
        set({ featuredProperties: response.data, featuredLoading: false });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      set({ featuredError: error.message || 'Failed to fetch properties', featuredLoading: false });
    }
  },
  
  // Fetch properties across cities
  fetchCityProperties: async (city) => {
    // console.log('fetchCityProperties', city);
    try {
      set({ cityPropertiesLoading: true, cityPropertiesError: null });
      // Using the property service to make the API call
      const propertyService = (await import('../services/propertyService')).default;
      const response = await propertyService.getCityProperties(city);
      console.log("response", response)
      
      if (response && response.properties && response.properties.length > 0) {
        set({ cityProperties: response.properties, cityPropertiesLoading: false });
      } else {
        // Keep existing static data if API fails or returns empty
        set({ cityProperties: [], cityPropertiesLoading: false });
      }
    } catch (error) {
      console.error('Error fetching city properties:', error);
      set({ cityPropertiesError: error.message || 'Failed to fetch city properties', cityPropertiesLoading: false });
    }
  },
  
  // Search properties
  searchProperties: async (params) => {
    if (!params) return;
    
    try {
      set({ searchLoading: true, searchError: null, searchQuery: params.searchQuery || '' });
      
      // Using the property service to make the API call
      const propertyService = (await import('../services/propertyService')).default;
      const response = await propertyService.searchProperties(params);
      
      if (response && response.data) {
        set({ searchResults: response.data, searchLoading: false });
      } else {
        throw new Error('Invalid search response format');
      }
    } catch (error) {
      console.error('Error searching properties:', error);
      set({ searchError: error.message || 'Failed to search properties', searchLoading: false });
    }
  },
  
  // Clear search results
  clearSearchResults: () => set({ searchResults: [], searchQuery: '' }),
}));