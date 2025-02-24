import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import InputField from '../../../Miner components/Input Feilds/Input';
import { FiHome, FiMapPin, FiGlobe } from 'react-icons/fi';
import StateNames from '../../../Assets/StaticData/StateName';
import Cities from '../../../Assets/DynamicData/CityFatch';
import {toast} from 'react-toastify';

const searchTabs = [
    { label: "Buy", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'FlatApartment', label: 'Flat/Apartment' },
      { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
      { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
      { value: 'PlotLand', label: 'Plot/Land' },
      { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
      { value: 'ServicedApartment', label: 'Serviced Apartment' },
      { value: 'Farmhouse', label: 'Farmhouse' },
      { value: 'others', label: 'Others' }
    ] },
    { label: "Rent", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'FlatApartment', label: 'Flat/Apartment' },
      { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
      { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
      { value: 'PlotLand', label: 'Plot/Land' },
      { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
      { value: 'ServicedApartment', label: 'Serviced Apartment' },
      { value: 'Farmhouse', label: 'Farmhouse' },
      { value: 'others', label: 'Others' }
    ] },
    { label: "PG", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'PG', label: 'PG' },
    ] },
    { label: "Commercial", icon: <FiHome className="w-5 h-5" />, options: [
      { value: 'Office', label: 'Office' },
      { value: 'Retail', label: 'Retail' },
      { value: 'CommercialPlotLand', label: 'Commercial Plot/Land' },
      { value: 'Storage', label: 'Storage' },
      { value: 'Industry', label: 'Industry' },
      { value: 'Hospitality', label: 'Hospitality' },
      { value: 'others', label: 'Others' }
    ] },
    { label: "Plots/Land", icon: <FiMapPin className="w-5 h-5" />, options: [
      { value: 'Plot/Land', label: 'Plot/Land' },
      { value: 'CommercialPlot/Land', label: 'Commercial Plot/Land' }
    ] },
    { label: "Projects", icon: <FiGlobe className="w-5 h-5" />, options: [
      { value: 'Residential', label: 'Residential Projects' },
      { value: 'Commercial', label: 'Commercial Projects' },
      { value: 'Mixed-use', label: 'Mixed use' }
    ] }
];

const SideMenu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('propertyType') || '',
    projectType: searchParams.get('projectType') || '',
    transactionType: searchParams.get('transactionType') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 10000000
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
      maxPrice: Number(searchParams.get('maxPrice')) || 10000000
    };
    
    if (transactionType === 'Projects') {
      newFilters.propertyType = '';
    } else {
      newFilters.projectType = '';
    }
    
    setFilters(newFilters);
    setStateInput(newFilters.state);
    setCityInput(newFilters.city);
    
    if (newFilters.state) {
      const cities = Cities.filter(city => city.state === newFilters.state);
      setFilteredCitiesForFilter(cities);
      setIsCityDisabled(false);
    }
  }, [searchParams]);

  const handleStateInputChange = (event) => {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setFilteredStates(inputValue ? 
        StateNames.filter(state => state.toLowerCase().includes(inputValue.toLowerCase())) : 
        []
    );
  };

  const handleStateSelect = (state) => {
    setStateInput(state);
    setFilters(prev => ({ ...prev, state, city: '' }));
    setFilteredStates([]);
    setIsCityDisabled(false);
    const cities = Cities.filter(city => city.state === state);
    setFilteredCities(cities);
    setFilteredCitiesForFilter(cities);
    setCityInput('');
  };

  const handleCityInputChange = (event) => {
    const inputValue = event.target.value;
    setCityInput(inputValue);
    setFilteredCities(inputValue ? 
        filteredCitiesForFilter.filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase())) : 
        []
    );
  };

  const handleCitySelect = (cityName) => {
    setCityInput(cityName);
    setFilters(prev => ({ ...prev, city: cityName }));
    setFilteredCities([]);
  };

  const handleFilterChange = (e) => {
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
  };

  const handleSubmit = (e) => {
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

    navigate(`/search-results?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      propertyType: '',
      projectType: '',
      transactionType: '',
      city: '',
      state: '',
      minPrice: 0,
      maxPrice: 10000000
    });
    setStateInput('');
    setCityInput('');
    setIsCityDisabled(true);
  };

  return (
    <div className="fixed top-4 py-20 left-4 w-80 p-6 bg-white rounded-xl border border-gray-100 h-[calc(100vh-2rem)] overflow-y-auto">
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
            <select
              name={filters.transactionType === 'Projects' ? 'projectType' : 'propertyType'}
              value={filters.transactionType === 'Projects' ? filters.projectType : filters.propertyType}
              onChange={handleFilterChange}
              className="w-full py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 appearance-none"
            >
              <option value="">Select</option>
              {searchTabs.find(tab => tab.label === filters.transactionType)?.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Location</h3>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search state..."
                value={stateInput}
                onChange={handleStateInputChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl placeholder-gray-400 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {filteredStates.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {filteredStates.map((state) => (
                    <div
                      key={state}
                      className="px-4 py-2 text-gray-600 hover:bg-blue-50 cursor-pointer transition-colors 
                             border-b last:border-b-0 text-sm"
                      onClick={() => handleStateSelect(state)}
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                value={cityInput}
                onChange={handleCityInputChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl placeholder-gray-400 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50"
                disabled={isCityDisabled}
              />
              {filteredCities.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {filteredCities.map((city) => (
                    <div
                      key={city.name}
                      className="px-4 py-2 text-gray-600 hover:bg-blue-50 cursor-pointer transition-colors 
                             border-b last:border-b-0 text-sm"
                      onClick={() => handleCitySelect(city.name)}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Min Price</label>
              <input
                type="range"
                name="minPrice"
                min="0"
                max="10000000"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full"
              />
              <span className="text-sm text-gray-600">${filters.minPrice.toLocaleString()}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Max Price</label>
              <input
                type="range"
                name="maxPrice"
                min="0"
                max="10000000"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full"
              />
              <span className="text-sm text-gray-600">${filters.maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-semibold text-sm shadow-sm"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl text-gray-600 hover:text-gray-700 text-sm font-medium transition-all"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SideMenu;
