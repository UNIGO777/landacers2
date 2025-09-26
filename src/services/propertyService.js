import api from './api';

/**
 * Property Service
 * Handles all property-related API requests
 */
const propertyService = {
  /**
   * Get featured properties
   * @returns {Promise} Promise object with featured properties data
   */
  getFeaturedProperties: async () => {
    try {
      const response = await api.get('/api/feature-items?itemType=Property'); //my commit 
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all properties with pagination
   * @param {number} page - Page number for pagination
   * @returns {Promise} Promise object with properties data
   */
  getProperties: async (page = 1) => {
    try {
      const response = await api.get(`https://api.landacre.in/api/properties?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single property by ID
   * @param {string} id - Property ID
   * @returns {Promise} Promise object with property data
   */
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`https://api.landacre.in/api/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search properties based on query parameters
   * @param {Object} params - Search parameters
   * @returns {Promise} Promise object with search results
   */
  searchProperties: async (params) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/api/properties/search?${queryString}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get similar properties based on a property ID
   * @param {string} id - Property ID
   * @returns {Promise} Promise object with similar properties
   */
  getSimilarProperties: async (id) => {
    try {
      const response = await api.get(`https://api.landacre.in/api/properties/similar/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get properties across different cities
   * @returns {Promise} Promise object with city-wise property data
   */
  getCityProperties: async (city) => {
    try {
      const response = await api.get(`https://api.landacre.in/api/properties/cities/${city}`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching city properties:', error);
      // Return null to fall back to static data from the store
      return null;
    }
  },
};

export default propertyService;