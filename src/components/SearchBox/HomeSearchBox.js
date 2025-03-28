import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaHome, FaBuilding, FaBed, FaMapMarked } from "react-icons/fa";
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
        setFilter(searchTabs.find(tab => tab.label === activatedSearchTab).options[0].value)
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
            toast.error('Please fill all required fields', { position: "bottom-right" });
            return;
        }
        
        // Validate state and city selections
        const isValidState = StateNames.includes(stateInput);
        const isValidCity = filteredCitiesForFilter.some(city =>
            city.state === stateInput && city.name === cityInput
        );

        if (!isValidState || !isValidCity) {
            toast.error('Invalid State or city');
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
        
        // Handle commercial property settings
        if(isCommercial === true){
            params.isCommercial = true;
            
            // Add commercial land type if applicable
            if (filter === 'Land' || filter === 'Plot') {
                params.commercialLandType = commercialLandType;
            }
        }
        Navigate(`/search-results?${new URLSearchParams(params).toString()}`);
    }, [activatedSearchTab, stateInput, cityInput, filter, filteredCitiesForFilter, searchQuery, Navigate, isCommercial, commercialLandType]);

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

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setIsExpanded(false);
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
        <>
            {/* Overlay when search box is open */}
            <AnimatePresence mode="wait">
                {isSearchBoxOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={overlayVariants}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={toggleSearchBox}
                        style={{ willChange: "opacity" }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                ref={searchBoxRef}
                className={`relative max-w-5xl mx-auto transform ${isSearchBoxOpen ? 'z-[999] fixed -mt-24 md:mt-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] px-4 sm:px-6 md:px-0' : 'z-50 -translate-x-1/2 translate-y-1/2'}`}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ willChange: "transform, opacity" }}
                layoutId="searchBoxContainer"
            >
                {/* Responsive Search Box */}
                <motion.div
                    className={`bg-gradient-to-r from-white to-blue-50 shadow-xl border border-blue-100/50 overflow-hidden w-full backdrop-blur-sm`}
                    variants={searchBoxVariants}
                    initial="closed"
                    animate={isSearchBoxOpen ? "open" : "closed"}
                    style={{ willChange: "height, border-radius" }}
                    layoutId="searchBox"
                >
                    {/* Simple Search Bar when closed */}
                    {!isSearchBoxOpen && (
                        <div className="flex items-center justify-between px-4 sm:px-6 h-[60px] cursor-pointer hover:bg-blue-50/50 transition-colors duration-300" onClick={toggleSearchBox}>
                            <div className="flex items-center">
                                <FaSearch className="text-blue-500 mr-2 text-lg" />
                                <span className="text-gray-600 font-medium">Search for properties...</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2 hidden sm:inline">Press to search</span>
                                <FaChevronDown className="text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                    )}

                    {/* Expanded Search Box when open */}
                    {isSearchBoxOpen && (
                        <div className="p-5 ">
                            {/* Close button */}
                            <div className="flex justify-end mb-2">
                                <button 
                                    onClick={toggleSearchBox}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Close search"
                                >
                                    <IoClose className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                            
                            {/* Search Tabs */}
                            <motion.div 
                                className="flex flex-wrap gap-2 mb-6"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } }
                                }}
                            >
                                {searchTabs.map((tab) => (
                                    <motion.button
                                        key={tab.label}
                                        variants={itemVariants}
                                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${activatedSearchTab === tab.label ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        onClick={() => setActivatedSearchTab(tab.label)}
                                    >
                                        {getTabIcon(tab.label)}
                                        {tab.label}
                                    </motion.button>
                                ))}
                            </motion.div>

                            {/* Property Type Dropdown */}
                            <motion.div 
                                className="mb-6"
                                variants={itemVariants}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        <span className="block truncate">
                                            {searchTabs.find(tab => tab.label === activatedSearchTab)?.options.find(opt => opt.value === filter)?.label || 'Select property type'}
                                        </span>
                                        {isExpanded ? <FaChevronUp className="w-4 h-4 text-gray-500" /> : <FaChevronDown className="w-4 h-4 text-gray-500" />}
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60"
                                            >
                                                <div className="py-1">
                                                    {searchTabs.find(tab => tab.label === activatedSearchTab)?.options.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${filter === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                                                            onClick={() => {
                                                                setFilter(option.value);
                                                                setIsExpanded(false);
                                                            }}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Location Inputs */}
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                                variants={itemVariants}
                            >
                                {/* State Input */}
                                <div className="relative">
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
                                        <motion.div 
                                            variants={dropdownListVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60"
                                        >
                                            {filteredStates.map((state) => (
                                                <button
                                                    key={state}
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                                                    onClick={() => handleStateSelect(state)}
                                                >
                                                    {state}
                                                </button>
                                            ))}
                                        </motion.div>
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
                                        <motion.div 
                                            variants={dropdownListVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-auto max-h-60"
                                        >
                                            {filteredCities.map((city) => (
                                                <button
                                                    key={city.name}
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                                                    onClick={() => handleCitySelect(city.name)}
                                                >
                                                    {city.name}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Commercial Property Options */}
                            <motion.div 
                                className="mb-6"
                                variants={itemVariants}
                            >
                                <div className="flex items-center mb-3">
                                    <input
                                        type="checkbox"
                                        id="isCommercial"
                                        checked={isCommercial}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setIsCommercial(isChecked);
                                            if (!isChecked) {
                                                setCommercialLandType('');
                                            }
                                        }}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="isCommercial" className="ml-2 block text-sm text-gray-700">
                                        Only Commercial
                                    </label>
                                </div>
                                
                                {/* Commercial Land Type Selection */}
                                {isCommercial && (filter === 'Land' || filter === 'Plot') && (
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Commercial {filter} Type
                                        </label>
                                        <select
                                            value={commercialLandType}
                                            onChange={(e) => setCommercialLandType(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select {filter} Type</option>
                                            {commercialPropertyTypes[filter]?.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </motion.div>

                            {/* Search Query Input */}
                            <motion.div 
                                className="mb-6"
                                variants={itemVariants}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (Optional)</label>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by keywords, property name, etc."
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </motion.div>

                            {/* Search Button */}
                            <motion.button
                                variants={itemVariants}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98]"
                                onClick={handleSearch}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaSearch className="mr-2" />
                                Search Properties
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
};

export default PropertySearch;
