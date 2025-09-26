/**
 * Utility functions for working with Zustand stores
 */

/**
 * Creates a selector function that only selects specific keys from a store
 * This helps with performance by only re-rendering when these specific values change
 * 
 * @param {Array<string>} keys - The keys to select from the store
 * @returns {Function} A selector function for use with useStore
 */
export const selectKeys = (keys) => (state) => {
  const result = {};
  keys.forEach(key => {
    result[key] = state[key];
  });
  return result;
};

/**
 * Creates a selector function that combines multiple selectors
 * 
 * @param {Object} selectors - An object where keys are the desired property names and values are selector functions
 * @returns {Function} A combined selector function
 */
export const combineSelectors = (selectors) => (state) => {
  const result = {};
  Object.entries(selectors).forEach(([key, selector]) => {
    result[key] = selector(state);
  });
  return result;
};

/**
 * Creates a derived state selector
 * 
 * @param {Function} selector - The base selector function
 * @param {Function} derivation - Function that transforms the selected state
 * @returns {Function} A selector that returns the derived state
 */
export const createDerivedSelector = (selector, derivation) => (state) => {
  const selectedState = selector(state);
  return derivation(selectedState);
};

/**
 * Creates a selector that memoizes the result to prevent unnecessary re-renders
 * 
 * @param {Function} selector - The selector function to memoize
 * @returns {Function} A memoized selector function
 */
export const createMemoizedSelector = (selector) => {
  let lastState;
  let lastResult;
  
  return (state) => {
    if (state === lastState) {
      return lastResult;
    }
    
    lastState = state;
    lastResult = selector(state);
    return lastResult;
  };
};