import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import StateNames from '../../Assets/StaticData/StateName';
import Cities from '../../Assets/DynamicData/CityFatch';
import Select from '../../Miner components/Input Feilds/Select';
import Navbar from '../../components/navbar/Navbar';

const SearchPage = () => {
    const navigate = useNavigate();
    const [activatedSearchTab, setActivatedSearchTab] = useState("Buy");
    const [stateInput, setStateInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);
    const [isCityDisabled, setIsCityDisabled] = useState(true);
    const [filter, setFilter] = useState('');

    const searchTabs = [ 
      { label: "Buy", options: [
        { value: 'FlatApartment', label: 'Flat/Apartment' },
        { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
        { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
        { value: 'PlotLand', label: 'Plot/Land' },
        { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
        { value: 'ServicedApartment', label: 'Serviced Apartment' },
        { value: 'Farmhouse', label: 'Farmhouse' },
        { value: 'others', label: 'Others' }
      ] },
      { label: "Rent", options: [
        { value: 'FlatApartment', label: 'Flat/Apartment' },
        { value: 'IndependentHouseVilla', label: 'Independent House/Villa' },
        { value: 'IndependentBuilderFloor', label: 'Independent/Builder Floor' },
        { value: 'PlotLand', label: 'Plot/Land' },
        { value: 'RKStudioApartment', label: '1 RK/Studio Apartment' },
        { value: 'ServicedApartment', label: 'Serviced Apartment' },
        { value: 'Farmhouse', label: 'Farmhouse' },
        { value: 'others', label: 'Others' }
      ] },
      { label: "PG", options: [
        { value: 'PG', label: 'PG' },
      ] },
      { label: "Commercial", options: [
        { value: 'Office', label: 'Office' },
        { value: 'Retail', label: 'Retail' },
        { value: 'CommercialPlotLand', label: 'Commercial Plot/Land' },
        { value: 'Storage', label: 'Storage' },
        { value: 'Industry', label: 'Industry' },
        { value: 'Hospitality', label: 'Hospitality' },
        { value: 'others', label: 'Others' }
      ] },
      { label: "Plots/Land", options: [
        { value: 'Plot/Land', label: 'Plot/Land' },
        { value: 'CommercialPlotLand', label: 'Commercial Plot/Land' }
      ] },
      { label: "Projects", options: [
        { value: 'Residential', label: 'Residential Projects' },
        { value: 'Commercial', label: 'Commercial Projects' },
        { value: 'Mixed-use', label: 'Mixed use' }
      ] }
    ];

    useEffect(() => {
        setFilter(searchTabs.find(tab => tab.label === activatedSearchTab)?.options[0]?.value);
    }, [activatedSearchTab]);

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
        setFilteredStates([]);
        setIsCityDisabled(false);
        const cities = Cities.filter(city => city.state === state);
        setFilteredCities(cities);
        setFilteredCitiesForFilter(cities);
    };

    const handleCityInputChange = (event) => {
        const inputValue = event.target.value;
        setCityInput(inputValue);
        setFilteredCities(inputValue ? 
            filteredCitiesForFilter.filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase())) : 
            []
        );
    };
    const handleCitySelect = (city) => {
        setCityInput(city);
        setFilteredCities([]);
    };

    const handleSearch = () => {
        if (!activatedSearchTab || !stateInput || !cityInput || !filter) {
            toast.error('Please fill all required fields', { position: "bottom-right" });
            return;
        }

        const isValidState = StateNames.includes(stateInput);
        const isValidCity = filteredCitiesForFilter.some(city => 
            city.state === stateInput && city.name === cityInput
        );

        if (!isValidState || !isValidCity) {
            toast.error('Invalid State or city');
            return;
        }

        const params = activatedSearchTab === "Projects" ? {
            projectType: filter,
            page: 1,
            city: cityInput,
            state: stateInput
        } : {
            propertyType: filter,
            transactionType: activatedSearchTab,
            page: 1,
            city: cityInput,
            state: stateInput
        };

        console.log(params)

        navigate(`/search-results?${new URLSearchParams(params).toString()}`);

        // const apiUrl = activatedSearchTab === "Projects" ?
        //     `${process.env.REACT_APP_backendUrl}/api/projects/search` :
        //     `${process.env.REACT_APP_backendUrl}/api/properties/search`;

        // axios.get(apiUrl, { params: new URLSearchParams(params) })
        //     .then(response => {
        //         const results = activatedSearchTab === "Projects" ? 
        //             response.data.projects : 
        //             response.data.data;
                
        //         if (results) {
        //             navigate(`/search-results?${new URLSearchParams(params).toString()}`, {
        //                 state: { response: results }
        //             });
        //         }
        //     })
        //     .catch(error => {
        //         toast.error(`Error searching ${activatedSearchTab.toLowerCase()}`);
        //     });
    };

    return (
        <>
            <Navbar searchbar={false}/>
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center ">
                <div className="w-full max-w-full  bg-white p-10">
                    <h1 className="text-3xl mt-10 font-extrabold text-center text-gray-900 mb-12 tracking-tight">
                        Discover Your <span className="text-blue-600">Dream</span> Property
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-3 pb-6">
                        {searchTabs.map((tab) => (
                            <button
                                key={tab.label}
                                className={`px-4 py-2.5 text-lg font-semibold rounded-2xl transition-all duration-200 ${
                                    activatedSearchTab === tab.label 
                                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-indigo-200'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm ring-1 ring-gray-200 hover:ring-indigo-200'
                                }`}
                                onClick={() => setActivatedSearchTab(tab.label)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-8 mt-10">
                        <div className="space-y-3">
                            <label className="text-gray-700 font-semibold text-lg">Property Type</label>
                            <Select 
                                options={searchTabs.find(tab => tab.label === activatedSearchTab)?.options || []}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full ring-1 ring-gray-200 rounded-xl px-4 py-3.5 text-lg hover:ring-indigo-300 focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                            <div className="space-y-3 relative">
                                <label className="text-gray-700 font-semibold text-lg">State</label>
                                <input
                                    type="text"
                                    placeholder="Search state..."
                                    value={stateInput}
                                    onChange={handleStateInputChange}
                                    className="w-full px-4 py-3.5 text-lg ring-1 ring-gray-200 rounded-xl placeholder-gray-400 
                                           focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                />
                                {filteredStates.length > 0 && (
                                    <div className="absolute z-10 w-full bg-white ring-1 ring-gray-200 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg">
                                        {filteredStates.map((state) => (
                                            <div
                                                key={state}
                                                className="px-4 py-3.5 text-gray-600 hover:bg-indigo-50 cursor-pointer transition-colors 
                                                       border-b last:border-b-0 text-lg"
                                                onClick={() => handleStateSelect(state)}
                                            >
                                                {state}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 relative">
                                <label className="text-gray-700 font-semibold text-lg">City</label>
                                <input
                                    type="text"
                                    placeholder="Search city..."
                                    value={cityInput}
                                    onChange={handleCityInputChange}
                                    className="w-full px-4 py-3.5 text-lg ring-1 ring-gray-200 rounded-xl placeholder-gray-400 
                                           focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-50"
                                    disabled={isCityDisabled}
                                />
                                {filteredCities.length > 0 && (
                                    <div className="absolute z-10 w-full bg-white ring-1 ring-gray-200 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg">
                                        {filteredCities.map((city) => (
                                            <div
                                                key={city.name}
                                                className="px-4 py-3.5 text-gray-600 hover:bg-indigo-50 cursor-pointer transition-colors 
                                                       border-b last:border-b-0 text-lg"
                                                onClick={() => handleCitySelect(city.name)}
                                            >
                                                {city.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            className="w-[90vw] fixed bottom-3 bg-blue-600 left-1/2 -translate-x-1/2 hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl 
                                   transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            onClick={handleSearch}
                        >
                            🔍 Explore Properties
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;