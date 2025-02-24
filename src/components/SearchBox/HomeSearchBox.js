import { useEffect, useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import InputField from "../../Miner components/Input Feilds/Input";
import StateNames from '../../Assets/StaticData/StateName';
import Cities from '../../Assets/DynamicData/CityFatch'
import Select from "../../Miner components/Input Feilds/Select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";






const PropertySearch = () => {
    const Navigate = useNavigate();
    const [activatedSearchTab, setActivatedSearchTab] = useState("Buy");
    const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([]);
    const [stateInput, setStateInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isCityDisabled, setIsCityDisabled] = useState(true);
    const [filter,setFilter] = useState('')


    const handleSearchFilterChange = (event) => {
        setFilter(event.target.value);
    };

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
        { value: 'Comercial Plot/Land', label: 'Comercial Plot/Land' }
      ] },
      { label: "Projects", options: [
        { value: 'Residential', label: 'Residential Projects' },
        { value: 'Commercial', label: 'Commercial Projects' },
        { value: 'Mixed-use', label: 'Mixed use' }
      ] }
    ];

    useEffect(()=>{
        setFilter(searchTabs.find(tab => tab.label === activatedSearchTab).options[0].value)
    },[activatedSearchTab])

    const handleStateInputChange = (event) => {
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

        Navigate(`/search-results?${new URLSearchParams(params).toString()}`);

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

    const handleStateSelect = async (state) => {
        setStateInput(state);
        setFilteredStates([]);
        setIsCityDisabled(false);
        setFilteredCities(Cities.filter(city => city.state === state));
        setFilteredCitiesForFilter(Cities.filter(city => city.state === state));
    };

    const handleCityInputChange = (event) => {
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
    };

    const handleCitySelect = (city) => {
        setCityInput(city);
        setFilteredCities([]);
    };

    return (
        <>
            <div className="hidden md:flex flex-col absolute  items-center  rounded-lg p-2 shadow-lg w-full max-w-3xl bg-white">
                <div className="hidden md:grid grid-cols-6 w-full h-10 items-center">
                    {searchTabs.map((item, key) => (
                        <div 
                            className={`cursor-pointer h-full flex items-center justify-center ${activatedSearchTab === item.label ? 'border-b-2 border-blue-700' : ''}`} 
                            key={key} 
                            onClick={() => setActivatedSearchTab(item.label)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
                <div className="flex w-full items-center border-t ">
                    <div className="px-3 py-2 border-r outline-none text-gray-700">
                        <Select onChange={handleSearchFilterChange} options={searchTabs.find(tab => tab.label === activatedSearchTab)?.options} />
                    </div>
                    <div className="flex items-center justify-between flex-grow px-3">
                        <div className="relative w-1/2 -top-2">
                            <div className=" w-full">
                                <input
                                    type="text"
                                    placeholder="State"
                                    name='State'
                                    value={stateInput}
                                    onChange={handleStateInputChange}
                                    className="inputImg md:w-full mt-4 px-4 py-2 outline-none"
                                />
                            </div>
                            {filteredStates.length > 0 && (
                                <ul className="absolute bg-white border border-gray-300 left-1/2 -translate-x-1/2 rounded-md mt-1 w-[63vw] md:w-full max-h-40 overflow-y-auto z-20">
                                    {filteredStates.map((state, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleStateSelect(state)}
                                        >
                                            {state}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="relative w-1/2 -top-2 ml-5">
                            <div className=" w-full">
                                <input
                                    name='City'
                                    type="text"
                                    placeholder="City"
                                    value={cityInput}
                                    onChange={handleCityInputChange}
                                    className="inputImg w-[63vw] md:w-full mt-4 px-4 py-2 outline-none border-b"
                                    disabled={isCityDisabled}
                                />
                            </div>
                            {filteredCities.length > 0 && (
                                <ul className="absolute bg-white border border-gray-300 left-1/2 -translate-x-1/2 rounded-md mt-1 w-[63vw] md:w-full max-h-40 overflow-y-auto z-20">
                                    {filteredCities.map((city, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleCitySelect(city.name)}
                                        >
                                            {city.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex w-full md:hidden justify-center">
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="inputImg mt-4 px-4 py-2 rounded-full outline-none text-white"
                    onClick={() => Navigate('/search')}
                />
            </div>
        </>
    );
};

export default PropertySearch;
