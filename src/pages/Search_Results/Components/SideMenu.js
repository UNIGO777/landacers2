import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiHome, FiMapPin, FiGlobe, FiSearch, FiChevronDown, FiChevronUp, FiDollarSign, FiSliders } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import StateNames from '../../../Assets/StaticData/StateName';
import Cities from '../../../Assets/DynamicData/CityFatch';
import { toast } from 'react-toastify';
import { HiOfficeBuilding } from 'react-icons/hi';
import { BiSolidLandscape } from 'react-icons/bi';
import { BsBuildings } from 'react-icons/bs';


const searchTabs = [
    { label: "Buy", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'FlatApartment', label: 'Flat/Apartment' },
      { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
      { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
      { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
      { value: 'ServicedApartment', label: 'Serviced Apartment' },
      { value: 'Farmhouse', label: 'Farmhouse' },
      { value: 'Office', label: 'Office' },
      { value: 'Retail', label: 'Retail' },
      { value: 'Storage', label: 'Storage' },
      { value: 'Industry', label: 'Industry' },
      { value: 'Hospitality', label: 'Hospitality' },
      { value: 'Land', label: 'Land' },
      { value: 'Plot', label: 'Plot' },
      { value: 'others', label: 'Others' }
    ] },
    { label: "Rent", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'FlatApartment', label: 'Flat/Apartment' },
      { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
      { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
      { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
      { value: 'ServicedApartment', label: 'Serviced Apartment' },
      { value: 'Office', label: 'Office' },
      { value: 'Retail', label: 'Retail' },
      { value: 'Storage', label: 'Storage' },
      { value: 'Industry', label: 'Industry' },
      { value: 'others', label: 'Others' }
    ] },
    { label: "PG", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'PG', label: 'PG' },
    ] },
    { label: "Projects", icon: <BsBuildings className="w-5 h-5" />, options: [
      { value: 'Residential', label: 'Residential Projects' },
      { value: 'Commercial', label: 'Commercial Projects' },
      { value: 'Mixed-use', label: 'Mixed use' }
    ] }
];

// Commercial property type mapping
const commercialPropertyTypes = {
  'Land': [
    { value: 'Commercial Land', label: 'Commercial Land' },
    { value: 'Agricultural / Farm Land', label: 'Agricultural / Farm Land' },
    { value: 'Industrial Land', label: 'Industrial Land' }
  ],
  'Plot': [
    { value: 'Commercial Plot', label: 'Commercial Plot' },
    { value: 'Industrial Plot', label: 'Industrial Plot' }
  ]
};

const SideMenu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isPropertyTypeExpanded, setIsPropertyTypeExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('searchQuery') || '');
  
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('propertyType') || '',
    projectType: searchParams.get('projectType') || '',
    transactionType: searchParams.get('transactionType') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 10000000,
    isCommercial: searchParams.get('isCommercial') === 'true',
    commercialLandType: searchParams.get('commercialLandType') || ''
  });

  const [stateInput, setStateInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);

  useEffect(() => {
    const transactionType = searchParams.get('transactionType') || '';
    const newFilters = {
      propertyType: searchParams.get('propertyType') || '',
      projectType: searchParams.get('projectType') || '',
      transactionType,
      page: 1,
      city: searchParams.get('city') || '',
      state: searchParams.get('state') || '',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 10000000,
      isCommercial: searchParams.get('isCommercial') === 'true'
    };
    
    if (transactionType === 'Projects') {
      newFilters.propertyType = '';
    } else {
      newFilters.projectType = '';
    }
    
    setFilters(newFilters);
    setStateInput(newFilters.state);
    setCityInput(newFilters.city);
    setSearchQuery(searchParams.get('searchQuery') || '');
    
    if (newFilters.state) {
      const cities = Cities.filter(city => city.state === newFilters.state);
      setFilteredCitiesForFilter(cities);
      setIsCityDisabled(false);
    }
  }, [searchParams]);

  const handleStateInputChange = useCallback((event) => {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setFilteredStates(inputValue ? 
        StateNames.filter(state => state.toLowerCase().includes(inputValue.toLowerCase())) : 
        []
    );
  }, []);

  const handleStateSelect = useCallback((state) => {
    setStateInput(state);
    setFilters(prev => ({ ...prev, state, city: '' }));
    setFilteredStates([]);
    setIsCityDisabled(false);
    const cities = Cities.filter(city => city.state === state);
    setFilteredCities(cities);
    setFilteredCitiesForFilter(cities);
    setCityInput('');
  }, []);

  const handleCityInputChange = useCallback((event) => {
    const inputValue = event.target.value;
    setCityInput(inputValue);
    setFilteredCities(inputValue ? 
        filteredCitiesForFilter.filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase())) : 
        []
    );
  }, [filteredCitiesForFilter]);

  const handleCitySelect = useCallback((cityName) => {
    setCityInput(cityName);
    setFilters(prev => ({ ...prev, city: cityName }));
    setFilteredCities([]);
  }, []);

  const handleSearchQueryChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFilters(prev => {
      const numericValue = name === 'minPrice' || name === 'maxPrice' 
        ? Math.max(0, Math.min(10000000, Number(value)))
        : value;
      
      const newValues = { ...prev, [name]: numericValue };
      
      if (name === 'minPrice') {
        newValues.maxPrice = Math.max(newValues.maxPrice, numericValue);
      } else if (name === 'maxPrice') {
        newValues.minPrice = Math.min(newValues.minPrice, numericValue);
      }
      
      return newValues;
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validation checks
    const missingFields = [];
    if (!filters.transactionType) missingFields.push('Transaction Type');
    if (filters.transactionType === 'Projects' && !filters.projectType) missingFields.push('Project Type');
    if (filters.transactionType !== 'Projects' && !filters.propertyType) missingFields.push('Property Type');
    if (!filters.state) missingFields.push('State');
    if (!filters.city) missingFields.push('City');

    if (missingFields.length > 0) {
      toast.error(`Please select: ${missingFields.join(', ')}`);
      return;
    }

    // Validate state and city
    const isValidState = StateNames.includes(filters.state);
    const isValidCity = filteredCitiesForFilter.some(city => 
      city.state === filters.state && city.name === filters.city
    );

    if (!isValidState || !isValidCity) {
      toast.error('Invalid State or City selection');
      return;
    }

    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'projectType') {
          params.set('projectType', value);
        } else if (key !== 'propertyType' || filters.transactionType !== 'Projects') {
          params.set(key, value);
        }
      }
    });

    // Add search query if provided
    if (searchQuery.trim()) {
      params.set('searchQuery', searchQuery.trim());
    }
    
    // Handle commercial land types
    if (filters.isCommercial && (filters.propertyType === 'Land' || filters.propertyType === 'Plot')) {
      params.set('commercialLandType', filters.commercialLandType);
    }

    navigate(`/search-results?${params.toString()}`);
  }, [filters, filteredCitiesForFilter, navigate, searchQuery]);

  const resetFilters = useCallback(() => {
    setFilters({
      propertyType: '',
      projectType: '',
      transactionType: '',
      city: '',
      state: '',
      minPrice: 0,
      maxPrice: 10000000,
      isCommercial: false,
      commercialLandType: ''
    });
    setStateInput('');
    setCityInput('');
    setSearchQuery('');
    setIsCityDisabled(true);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsPropertyTypeExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="fixed top-4 mt-10 py-20 left-4 w-80 p-6 bg-white rounded-xl border border-gray-100 h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 pb-4 mb-6 border-b border-gray-200">Refine Search</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Transaction Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {searchTabs.map((type) => (
              <button
                type="button"
                key={type.label}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  transactionType: type.label,
                  propertyType: '',
                  projectType: ''
                }))}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  filters.transactionType === type.label 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-600'
                }`}
              >
                {type.icon}
                <span className="text-sm font-medium mt-1.5">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            {filters.transactionType === 'Projects' ? 'Project Type' : 'Property Type'}
          </h3>
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              onClick={() => setIsPropertyTypeExpanded(!isPropertyTypeExpanded)}
            >
              <span className="block truncate">
                {filters.transactionType === 'Projects' 
                  ? searchTabs.find(tab => tab.label === 'Projects')?.options.find(opt => opt.value === filters.projectType)?.label || 'Select project type'
                  : searchTabs.find(tab => tab.label === filters.transactionType)?.options.find(opt => opt.value === filters.propertyType)?.label || 'Select property type'}
              </span>
              {isPropertyTypeExpanded ? <FiChevronUp className="w-4 h-4 text-gray-500" /> : <FiChevronDown className="w-4 h-4 text-gray-500" />}
            </button>
            
            {isPropertyTypeExpanded && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                <div className="py-1">
                  {searchTabs.find(tab => tab.label === filters.transactionType)?.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                        (filters.transactionType === 'Projects' ? filters.projectType : filters.propertyType) === option.value 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => {
                        if (filters.transactionType === 'Projects') {
                          setFilters(prev => ({ ...prev, projectType: option.value }));
                        } else {
                          setFilters(prev => ({ ...prev, propertyType: option.value }));
                        }
                        setIsPropertyTypeExpanded(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location Inputs */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Location</h3>
          
          {/* State Input */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter state"
                value={stateInput}
                onChange={handleStateInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {filteredStates.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                {filteredStates.map((state) => (
                  <button
                    key={state}
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                    onClick={() => handleStateSelect(state)}
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* City Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter city"
                value={cityInput}
                onChange={handleCityInputChange}
                disabled={isCityDisabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            {filteredCities.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                    onClick={() => handleCitySelect(city.name)}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            <div className="flex items-center">
              <FiDollarSign className="mr-2" />
              Price Range
            </div>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Price (₹)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                min="0"
                max="10000000"
                step="10000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Price (₹)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                min="0"
                max="10000000"
                step="10000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Min: ₹{filters.minPrice.toLocaleString()}</span>
                <span>₹{filters.maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange({ target: { name: 'minPrice', value: e.target.value } })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
              />
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Max: ₹{filters.minPrice.toLocaleString()}</span>
                <span>₹{filters.maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange({ target: { name: 'maxPrice', value: e.target.value } })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Commercial Property Options */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            <div className="flex items-center">
              <HiOfficeBuilding className="mr-2" />
              Commercial Options
            </div>
          </h3>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isCommercial"
              checked={filters.isCommercial}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setFilters(prev => ({
                  ...prev,
                  isCommercial: isChecked,
                  commercialLandType: isChecked ? prev.commercialLandType : ''
                }));
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isCommercial" className="ml-2 block text-sm text-gray-700">
              Only Commercial
            </label>
          </div>
          
          {/* Commercial Land Type Selection */}
          {filters.isCommercial && (filters.propertyType === 'Land' || filters.propertyType === 'Plot') && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commercial {filters.propertyType} Type
              </label>
              <select
                value={filters.commercialLandType}
                onChange={(e) => setFilters(prev => ({ ...prev, commercialLandType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select {filters.propertyType} Type</option>
                {commercialPropertyTypes[filters.propertyType]?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Search Query */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            <div className="flex items-center">
              <FiSearch className="mr-2" />
              Keywords
            </div>
          </h3>
          
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by keywords, property name, etc."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <FiSearch className="mr-2" />
            Apply Filters
          </button>
          
          <button
            type="button"
            onClick={resetFilters}
            className="w-full py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <FiSliders className="mr-2" />
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SideMenu;