import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaHome, FaBuilding, FaBed, FaMapMarked, FaRupeeSign } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { BiSolidLandscape } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
import StateNames from '../../Assets/StaticData/StateName';
import Cities from '../../Assets/DynamicData/CityFatch'
import Select from "../../Miner components/Input Feilds/Select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const PropertySearch = () => {
    const Navigate = useNavigate();
    const [activatedSearchTab, setActivatedSearchTab] = useState("Buy");
    const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);
    const [stateInput, setStateInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isCityDisabled, setIsCityDisabled] = useState(true);
    const [filter, setFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCommercial, setIsCommercial] = useState(false);
    const [commercialLandType, setCommercialLandType] = useState('');
    const [budgetRange, setBudgetRange] = useState('');
    const [isBudgetExpanded, setIsBudgetExpanded] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isMobileBudgetExpanded, setIsMobileBudgetExpanded] = useState(false);
    const searchBoxRef = useRef(null);

    const handleSearchFilterChange = useCallback((event) => {
        setFilter(event.target.value);
    }, []);

    const handleSearchQueryChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const toggleSearchBox = useCallback(() => {
        setIsSearchBoxOpen(prev => {
            const newState = !prev;
            document.body.style.overflow = newState ? 'hidden' : 'auto';
            return newState;
        });
    }, []);

    // Ensure body scroll is reset when component unmounts
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Commercial property type mapping
    const commercialPropertyTypes = useMemo(() => ({
        'Land': [
            { value: 'Commercial Land', label: 'Commercial Land' },
            { value: 'Agricultural / Farm Land', label: 'Agricultural / Farm Land' },
            { value: 'Industrial Land', label: 'Industrial Land' }
        ],
        'Plot': [
            { value: 'Commercial Plot', label: 'Commercial Plot' },
            { value: 'Industrial Plot', label: 'Industrial Plot' }
        ]
    }), []);

    const searchTabs = useMemo(() => [
        {
            label: "Buy", options: [
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
            ]
        },
        {
            label: "Rent", options: [
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
            ]
        },
        {
            label: "PG", options: [
                { value: 'PG', label: 'PG' },
               
            ]
        },
        {
            label: "Projects", options: [
                { value: 'Residential', label: 'Residential Projects' },
                { value: 'Commercial', label: 'Commercial Projects' },
                { value: 'Mixed-use', label: 'Mixed use' }
            ]
        }
    ], []);

    useEffect(() => {
        setFilter(searchTabs.find(tab => tab.label === activatedSearchTab).options[0].value);
        setBudgetRange(''); // Reset budget when changing tabs
    }, [activatedSearchTab, searchTabs])

    const handleStateInputChange = useCallback((event) => {
        const inputValue = event.target.value;
        setStateInput(inputValue);
        if (inputValue) {
            const filtered = StateNames.filter(state =>
                state.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredStates(filtered);
        } else {
            setFilteredStates([]);
        }
    }, []);

    const handleSearch = useCallback(() => {
        if (!activatedSearchTab || !stateInput || !cityInput || !filter) {
            toast.error('Please fill all required fields (State, City, Property Type)', { position: "bottom-right" });
            return;
        }
        
        // Validate state and city selections
        const isValidState = StateNames.includes(stateInput);
        const isValidCity = filteredCitiesForFilter.some(city =>
            city.state === stateInput && city.name === cityInput
        );

        if (!isValidState || !isValidCity) {
            toast.error('Please select valid State and City from the dropdown');
            return;
        }

        // Validate commercial land type if commercial is selected and property type is Land or Plot
        if (isCommercial && (filter === 'Land' || filter === 'Plot') && !commercialLandType) {
            toast.error(`Please select a Commercial ${filter} Type`);
            return;
        }

        const params = activatedSearchTab === "Projects" ? {
            projectType: filter,
            page: 1,
            city: cityInput,
            state: stateInput,
            searchQuery: searchQuery.trim(),
        } : {
            propertyType: filter,
            transactionType: activatedSearchTab,
            page: 1,
            city: cityInput,
            state: stateInput,
            locality: '', // Optional: Add if you want to support locality search
            searchQuery: searchQuery.trim(),
        };
        
        // Add budget parameters
        if (budgetRange) {
            // Convert budget range to min/max prices
            const [min, max] = budgetRange.split('-');
            if (min && min !== '0') {
                // Convert lakhs to actual numbers (25L = 2500000)
                const minValue = parseFloat(min);
                params.minPrice = minValue >= 100 ? minValue * 10000000 : minValue * 100000; // Crore vs Lakh
            }
            if (max && max !== '+') {
                // Convert lakhs to actual numbers (50L = 5000000)
                const maxValue = parseFloat(max);
                params.maxPrice = maxValue >= 100 ? maxValue * 10000000 : maxValue * 100000; // Crore vs Lakh
            }
        } else if (minPrice || maxPrice) {
            // Use individual min/max prices from mobile interface
            if (minPrice) params.minPrice = parseInt(minPrice);
            if (maxPrice) params.maxPrice = parseInt(maxPrice);
        }
        
        // Handle commercial property settings
        if(isCommercial === true){
            params.isCommercial = true;
            
            // Add commercial land type if applicable
            if (filter === 'Land' || filter === 'Plot') {
                params.commercialLandType = commercialLandType;
            }
        }
        Navigate(`/search-results?${new URLSearchParams(params).toString()}`);
    }, [activatedSearchTab, stateInput, cityInput, filter, filteredCitiesForFilter, searchQuery, Navigate, isCommercial, commercialLandType, budgetRange]);

    const handleStateSelect = useCallback(async (state) => {
        setStateInput(state);
        setFilteredStates([]);
        setIsCityDisabled(false);
        const filteredCities = Cities.filter(city => city.state === state);
        setFilteredCities(filteredCities);
        setFilteredCitiesForFilter(filteredCities);
    }, []);

    const handleCityInputChange = useCallback((event) => {
        const inputValue = event.target.value;
        setCityInput(inputValue);
        if (inputValue) {
            const filtered = filteredCitiesForFilter.filter(city =>
                city.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    }, [filteredCitiesForFilter]);

    const handleCitySelect = useCallback((city) => {
        setCityInput(city);
        setFilteredCities([]);
    }, []);

    // Budget ranges
    const budgetRanges = useMemo(() => ({
        'Buy': [
            { value: '0-25', label: 'Under ₹25 Lakh' },
            { value: '25-50', label: '₹25 - ₹50 Lakh' },
            { value: '50-75', label: '₹50 - ₹75 Lakh' },
            { value: '75-100', label: '₹75 Lakh - ₹1 Crore' },
            { value: '100-150', label: '₹1 - ₹1.5 Crore' },
            { value: '150-200', label: '₹1.5 - ₹2 Crore' },
            { value: '200+', label: 'Above ₹2 Crore' }
        ],
        'Rent': [
            { value: '0-10', label: 'Under ₹10,000' },
            { value: '10-20', label: '₹10,000 - ₹20,000' },
            { value: '20-30', label: '₹20,000 - ₹30,000' },
            { value: '30-50', label: '₹30,000 - ₹50,000' },
            { value: '50-75', label: '₹50,000 - ₹75,000' },
            { value: '75-100', label: '₹75,000 - ₹1,00,000' },
            { value: '100+', label: 'Above ₹1,00,000' }
        ],
        'PG': [
            { value: '0-5', label: 'Under ₹5,000' },
            { value: '5-10', label: '₹5,000 - ₹10,000' },
            { value: '10-15', label: '₹10,000 - ₹15,000' },
            { value: '15-20', label: '₹15,000 - ₹20,000' },
            { value: '20+', label: 'Above ₹20,000' }
        ],
        'Projects': [
            { value: '0-50', label: 'Under ₹50 Lakh' },
            { value: '50-100', label: '₹50 Lakh - ₹1 Crore' },
            { value: '100-200', label: '₹1 - ₹2 Crore' },
            { value: '200+', label: 'Above ₹2 Crore' }
        ]
    }), []);

    const handleCommercialToggle = useCallback(() => {
        setIsCommercial(prev => !prev);
        if (isCommercial) {
            setCommercialLandType('');
        }
    }, [isCommercial]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setIsExpanded(false);
                setIsBudgetExpanded(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get icon for each tab
    const getTabIcon = useCallback((label) => {
        switch (label) {
            case 'Buy': return <FaHome className="mr-2" />;
            case 'Rent': return <FaBuilding className="mr-2" />;
            case 'PG': return <FaBed className="mr-2" />;
            case 'Commercial': return <HiOfficeBuilding className="mr-2" />;
            case 'Land': return <BiSolidLandscape className="mr-2" />;
            case 'Plot': return <FaMapMarked className="mr-2" />;
            case 'Projects': return <BsBuildings className="mr-2" />;
            default: return <FaHome className="mr-2" />;
        }
    }, []);

    // Get property type specific icons
    const getPropertyTypeIcon = useCallback((propertyType) => {
        switch (propertyType) {
            case 'FlatApartment': return <FaBuilding className="w-full h-full text-blue-600" />;
            case 'IndependentHouseVilla': return <FaHome className="w-full h-full text-blue-600" />;
            case 'IndependentBuilderFloor': return <BsBuildings className="w-full h-full text-blue-600" />;
            case 'RKStudioApartment': return <FaBed className="w-full h-full text-blue-600" />;
            case 'ServicedApartment': return <HiOfficeBuilding className="w-full h-full text-blue-600" />;
            case 'Farmhouse': return <BiSolidLandscape className="w-full h-full text-blue-600" />;
            case 'Office': return <HiOfficeBuilding className="w-full h-full text-blue-600" />;
            case 'Retail': return <FaBuilding className="w-full h-full text-blue-600" />;
            case 'Storage': return <BsBuildings className="w-full h-full text-blue-600" />;
            case 'Industry': return <HiOfficeBuilding className="w-full h-full text-blue-600" />;
            case 'Hospitality': return <FaBuilding className="w-full h-full text-blue-600" />;
            case 'Land': return <BiSolidLandscape className="w-full h-full text-blue-600" />;
            case 'Plot': return <FaMapMarked className="w-full h-full text-blue-600" />;
            case 'PG': return <FaBed className="w-full h-full text-blue-600" />;
            case 'Residential': return <FaHome className="w-full h-full text-blue-600" />;
            case 'Commercial': return <HiOfficeBuilding className="w-full h-full text-blue-600" />;
            case 'Mixed-use': return <BsBuildings className="w-full h-full text-blue-600" />;
            default: return <FaHome className="w-full h-full text-blue-600" />;
        }
    }, []);

    // Animation variants - optimized for performance and smoothness
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother motion
                when: "beforeChildren",
                staggerChildren: 0.04
            }
        },
        exit: {
            opacity: 0,
            y: 0,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smoother motion
            }
        }
    };

    const dropdownVariants = {
        hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
        visible: {
            opacity: 1,
            scaleY: 1,
            transition: { 
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smoother motion
            }
        },
        exit: {
            opacity: 0,
            scaleY: 0,
            transition: { 
                duration: 0.15,
                ease: [0.25, 0.1, 0.25, 1] 
            }
        }
    };

    const searchBoxVariants = {
        closed: {
            height: "60px",
            borderRadius: "9999px",
            scale: 0.98,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1], // Improved cubic-bezier for smoother animation
                type: "tween"
            }
        },
        open: {
            height: "auto",
            borderRadius: "1rem",
            scale: 1,
            opacity: 1,
            transition: { 
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1], // Improved cubic-bezier for smoother animation
                type: "tween",
                when: "beforeChildren",
                staggerChildren: 0.05
            }
        }
    };

    // Optimized overlay animation
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    // Optimized dropdown animation
    const dropdownListVariants = {
        hidden: { opacity: 0, y: -5, transformOrigin: "top" },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1] 
            }
        },
        exit: { 
            opacity: 0, 
            y: 0,
            transition: { 
                duration: 0.15,
                ease: [0.25, 0.1, 0.25, 1] 
            }
        }
    };

    return (
        <div className="w-full mx-auto">
            {/* Mobile Compact Search Bar */}
            <div className="block md:hidden">
                <div 
                    className="bg-white rounded-full shadow-lg border border-gray-200 p-4 cursor-pointer hover:shadow-xl transition-all duration-200"
                    onClick={toggleSearchBox}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                            <FaMapMarkerAlt className="text-blue-500 mr-3" />
                            <div className="flex-1">
                                <p className="text-gray-800 font-medium text-sm">
                                    {stateInput && cityInput ? `${cityInput}, ${stateInput}` : 'Search By City, Locality, Project'}
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-600 p-2 rounded-full">
                            <FaSearch className="text-white text-sm" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tablet Compact Search Bar */}
            <div className="hidden md:block lg:hidden">
                <div 
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 cursor-pointer hover:shadow-xl transition-all duration-200"
                    onClick={toggleSearchBox}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                            <FaMapMarkerAlt className="text-blue-500 mr-4 text-lg" />
                            <div className="flex-1">
                                <p className="text-gray-800 font-medium text-base">
                                    {stateInput && cityInput ? `${cityInput}, ${stateInput}` : 'Search By City, Locality, Project'}
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    {activatedSearchTab} • {filter ? searchTabs.find(tab => tab.label === activatedSearchTab)?.options.find(opt => opt.value === filter)?.label : 'Select Property Type'}
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-600 p-3 rounded-xl">
                            <FaSearch className="text-white text-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Search Container */}
            <div className="hidden lg:block bg-white rounded-3xl border border-gray-100">
                {/* Search Tabs */}
                <div className="flex  items-center rounded-t-3xl bg-blue-50 border-b border-blue-200 px-4 py-4">
                    {searchTabs.map((tab) => (
                        <button
                            key={tab.label}
                            className={`flex items-center px-3 xl:px-4 py-2 mr-2 mb-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 ${
                                activatedSearchTab === tab.label 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-white text-gray-700 hover:bg-blue-100 border border-blue-200'
                            }`}
                            onClick={() => setActivatedSearchTab(tab.label)}
                        >
                            {getTabIcon(tab.label)}
                            {tab.label}
                        </button>
                    ))}
                    <button 
                        className={`flex items-center px-3 xl:px-4 py-2 mr-2 mb-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 ${
                            isCommercial 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-white text-gray-700 hover:bg-blue-100 border border-blue-200'
                        }`}
                        onClick={handleCommercialToggle}
                    >
                        <HiOfficeBuilding className="mr-2" />
                        Commercial
                    </button>
                    <button className="flex items-center px-3 xl:px-4 py-2 mb-2 rounded-lg text-xs xl:text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200">
                        Post Free Property Ad
                    </button>
                </div>

                {/* Desktop Search Form */}
                <div className="p-4 lg:p-6">
                    <div className="flex flex-row  gap-3 lg:gap-4 items-end">
                        {/* State Input */}
                        <div className=" min-w-0 lg:min-w-[50px]">
                            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">State</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                <input
                                    type="text"
                                    placeholder="Select State"
                                    value={stateInput}
                                    onChange={handleStateInputChange}
                                    className="w-[200px] pl-10 pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-500 text-sm lg:text-base"
                                />
                                
                                {/* State Dropdown */}
                                {filteredStates.length > 0 && (
                                    <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                                        {filteredStates.map((state) => (
                                            <button
                                                key={state}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                                                onClick={() => handleStateSelect(state)}
                                            >
                                                {state}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* City Input */}
                        <div className="flex-1 min-w-0 lg:min-w-[100px]">
                            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">City</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                <input
                                    type="text"
                                    placeholder={isCityDisabled ? "Select State First" : "Select City"}
                                    value={cityInput}
                                    onChange={handleCityInputChange}
                                    disabled={isCityDisabled}
                                    className={`w-full pl-10 pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-500 text-sm lg:text-base ${
                                        isCityDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                                    }`}
                                />
                                
                                {/* City Dropdown */}
                                {filteredCities.length > 0 && !isCityDisabled && (
                                    <div className="absolute z-20 mt-1 w-[200px] bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                                        {filteredCities.map((city) => (
                                            <button
                                                key={city.name}
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

                        {/* Property Type Dropdown */}
                        <div className="flex-1 min-w-0 lg:min-w-[120px]">
                            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Property Type</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-4 py-2.5 lg:py-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <div className="flex items-center min-w-0">
                                        <FaHome className="mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm lg:text-base truncate">
                                            {searchTabs.find(tab => tab.label === activatedSearchTab)?.options.find(opt => opt.value === filter)?.label || 'Select Property Type'}
                                        </span>
                                    </div>
                                    <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Property Type Dropdown */}
                                {isExpanded && (
                                    <div className="absolute z-20 mt-1 w-[200px] bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                                        <div className="py-1">
                                            {searchTabs.find(tab => tab.label === activatedSearchTab)?.options.map((option) => (
                                                <button
                                                    key={option.value}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${filter === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                                                    onClick={() => {
                                                        setFilter(option.value);
                                                        setIsExpanded(false);
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

                        {/* Budget Dropdown */}
                        <div className="flex-1 min-w-0 lg:min-w-[100px]">
                            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Budget</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-4 py-2.5 lg:py-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onClick={() => setIsBudgetExpanded(!isBudgetExpanded)}
                                >
                                    <div className="flex items-center min-w-0">
                                        <FaRupeeSign className="mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm lg:text-base truncate">
                                            {budgetRange ? budgetRanges[activatedSearchTab]?.find(range => range.value === budgetRange)?.label : 'Select Budget'}
                                        </span>
                                    </div>
                                    <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isBudgetExpanded ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Budget Dropdown */}
                                {isBudgetExpanded && (
                                    <div className="absolute z-20 mt-1 w-[200px] bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60">
                                        <div className="py-1">
                                            {budgetRanges[activatedSearchTab]?.map((range) => (
                                                <button
                                                    key={range.value}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${budgetRange === range.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                                                    onClick={() => {
                                                        setBudgetRange(range.value);
                                                        setIsBudgetExpanded(false);
                                                    }}
                                                >
                                                    {range.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex-shrink-0  xl:w-auto">
                            <button
                                onClick={handleSearch}
                                className="w-full xl:w-auto flex items-center justify-center px-6 lg:px-8 py-2.5 lg:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg min-w-[120px] mt-4 xl:mt-7 text-sm lg:text-base"
                            >
                                <FaSearch className="mr-2" />
                                Search
                            </button>
                        </div>

                        {/* Commercial Land Type Dropdown - Show only when commercial is selected and property type is Land or Plot */}
                        {isCommercial && (filter === 'Land' || filter === 'Plot') && (
                            <div className="flex-1 min-w-0 lg:min-w-[220px] w-full xl:w-auto">
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Commercial {filter} Type</label>
                                <div className="relative">
                                    <Select
                                        value={commercialLandType}
                                        onChange={(e) => setCommercialLandType(e.target.value)}
                                        options={commercialPropertyTypes[filter] || []}
                                        placeholder={`Select Commercial ${filter} Type`}
                                        className="w-full px-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-base"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile & Tablet Full-Screen Search Modal */}
            <AnimatePresence>
                {isSearchBoxOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 lg:hidden"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleSearchBox} />
                        
                        {/* Modal Content */}
                        <motion.div
                            className="relative bg-gradient-to-br from-blue-50 to-white h-full overflow-y-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-blue-200 px-4 py-4 flex items-center justify-between z-10 shadow-sm">
                                <h2 className="text-xl font-bold text-blue-900">Find Your Dream Property</h2>
                                <button
                                    onClick={toggleSearchBox}
                                    className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                                >
                                    <IoClose className="w-6 h-6 text-blue-600" />
                                </button>
                            </div>

                            {/* Search Tabs */}
                            <div className="px-4 md:px-6 py-4 md:py-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {searchTabs.map((tab) => (
                                        <button
                                            key={tab.label}
                                            className={`flex items-center justify-center px-3 md:px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                                                activatedSearchTab === tab.label 
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl' 
                                                    : 'bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-200'
                                            }`}
                                            onClick={() => setActivatedSearchTab(tab.label)}
                                        >
                                            <div className="mr-2">{getTabIcon(tab.label)}</div>
                                            <span className="hidden sm:inline">{tab.label}</span>
                                            <span className="sm:hidden text-xs">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                                    <button 
                                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                                            isCommercial 
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl' 
                                                : 'bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-200'
                                        }`}
                                        onClick={handleCommercialToggle}
                                    >
                                        <HiOfficeBuilding className="mr-2" />
                                        Commercial
                                    </button>
                                    <button className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        <span className="text-xs bg-yellow-700 px-2 py-1 rounded-full mr-2">FREE</span>
                                        Post Ad
                                    </button>
                                </div>
                            </div>

                            {/* Mobile & Tablet Search Form */}
                            <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                                {/* Location Selection */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
                                    {/* State Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">State</label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" />
                                            <input
                                                type="text"
                                                placeholder="Select State"
                                                value={stateInput}
                                                onChange={handleStateInputChange}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-500 bg-blue-50/50"
                                            />
                                            
                                            {/* State Dropdown */}
                                            {filteredStates.length > 0 && (
                                                <div className="absolute z-20 mt-2 w-full bg-white shadow-xl rounded-xl border-2 border-blue-200 overflow-auto max-h-48">
                                                    {filteredStates.map((state) => (
                                                        <button
                                                            key={state}
                                                            className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-gray-700 transition-colors"
                                                            onClick={() => handleStateSelect(state)}
                                                        >
                                                            {state}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* City Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">City</label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" />
                                            <input
                                                type="text"
                                                placeholder={isCityDisabled ? "Select State First" : "Select City"}
                                                value={cityInput}
                                                onChange={handleCityInputChange}
                                                disabled={isCityDisabled}
                                                className={`w-full pl-12 pr-4 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-500 bg-blue-50/50 ${
                                                    isCityDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                                                }`}
                                            />
                                            
                                            {/* City Dropdown */}
                                            {filteredCities.length > 0 && (
                                                <div className="absolute z-20 mt-2 w-full bg-white shadow-xl rounded-xl border-2 border-blue-200 overflow-auto max-h-48">
                                                    {filteredCities.map((city) => (
                                                        <button
                                                            key={city.name}
                                                            className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-gray-700 transition-colors"
                                                            onClick={() => handleCitySelect(city.name)}
                                                        >
                                                            {city.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Budget Range */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Range</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" />
                                            <input
                                                type="number"
                                                placeholder="Min Price"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-blue-200 rounded-xl text-gray-700 placeholder-gray-500 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/50"
                                            />
                                        </div>
                                        <div className="relative">
                                            <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" />
                                            <input
                                                type="number"
                                                placeholder="Max Price"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-blue-200 rounded-xl text-gray-700 placeholder-gray-500 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/50"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Budget Range Presets */}
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md"
                                            onClick={() => setIsMobileBudgetExpanded(!isMobileBudgetExpanded)}
                                        >
                                            <span className="text-sm text-blue-800 font-semibold">
                                                {budgetRange ? budgetRanges[activatedSearchTab]?.find(range => range.value === budgetRange)?.label : 'Quick Budget Selection'}
                                            </span>
                                            <FaChevronDown className={`w-4 h-4 text-blue-600 transition-transform duration-200 ${isMobileBudgetExpanded ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Budget Presets Dropdown */}
                                        {isMobileBudgetExpanded && (
                                            <div className="mt-3 bg-white shadow-xl rounded-xl border-2 border-blue-200 overflow-auto max-h-48">
                                                <div className="py-2">
                                                    {budgetRanges[activatedSearchTab]?.map((range) => (
                                                        <button
                                                            key={range.value}
                                                            className={`w-full text-left px-6 py-3 text-sm hover:bg-blue-50 transition-colors ${budgetRange === range.value ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500' : 'text-gray-700'}`}
                                                            onClick={() => {
                                                                setBudgetRange(range.value);
                                                                setIsMobileBudgetExpanded(false);
                                                                // Clear individual min/max when using preset
                                                                setMinPrice('');
                                                                setMaxPrice('');
                                                            }}
                                                        >
                                                            {range.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Property Type */}
                                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-blue-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Type</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                        {searchTabs.find(tab => tab.label === activatedSearchTab)?.options.map((option) => (
                                            <button
                                                key={option.value}
                                                className={`flex flex-col items-center p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                                    filter === option.value 
                                                        ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg' 
                                                        : 'border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 bg-blue-50/30'
                                                }`}
                                                onClick={() => setFilter(option.value)}
                                            >
                                                <div className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3">
                                                    {getPropertyTypeIcon(option.value)}
                                                </div>
                                                <span className="text-xs md:text-sm font-semibold text-gray-700 text-center leading-tight">{option.label}</span>
                                                {filter === option.value && (
                                                    <div className="w-4 h-4 md:w-5 md:h-5 mt-2 md:mt-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                            </div>

                            {/* Bottom Action Button */}
                            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent border-t border-blue-200 p-6">
                                <button 
                                    onClick={handleSearch}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-xl transform hover:scale-105 active:scale-95"
                                >
                                    <FaSearch className="mr-3 text-xl" />
                                    Find My Dream Property
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertySearch;
