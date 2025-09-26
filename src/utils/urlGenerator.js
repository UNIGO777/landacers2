// Utility function to generate search URLs for property searches
// This function creates consistent URLs across the application for property searches

export const generateSearchURL = (propertyType, transactionType, city, state, searchQuery = '') => {
  const params = {
    propertyType,
    transactionType,
    page: 1,
    city,
    state,
    locality: '',
    searchQuery: searchQuery || '',
  };
  return `/search-results?${new URLSearchParams(params).toString()}`;
};

// Helper function to generate city-specific property URLs
export const generateCityPropertyURL = (city, state = '') => {
  return generateSearchURL('FlatApartment', 'Buy', city, state);
};

// Helper function to generate property type specific URLs
export const generatePropertyTypeURL = (propertyType, city, state = '') => {
  return generateSearchURL(propertyType, 'Buy', city, state);
};