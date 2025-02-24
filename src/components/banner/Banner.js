import React, { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";
import Select from '../../Miner components/Input Feilds/Select';
import InputField from '../../Miner components/Input Feilds/Input';
import Button from '../../Miner components/Buttons/button';
import StateNames from '../../Assets/StaticData/StateName';
import Cities from '../../Assets/DynamicData/CityFatch'
import SearchBox from '../SearchBox/SearchBox';
import HomeSearchBox from '../SearchBox/HomeSearchBox';


// dont accept state manual inputs only accept option we gived

function Banner() {
    const { theme } = useTheme();
    const options = [
        { value: '', label: 'Select an option' },
        { value: 'plots', label: 'Plots' },
        { value: 'lands', label: 'Lands' },
        { value: 'farmhouse', label: 'Farmhouse' }
    ];

    const handleSelectChange = (event) => {
        console.log(event.target.value); // Handle the selected value as needed
    };

    const images = [
      "https://images.unsplash.com/photo-1595247191348-fd605f104467?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1649441246954-388fb49cced9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [stateInput, setStateInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isCityDisabled, setIsCityDisabled] = useState(true);
    const [filteredCitiesForFilter, setFilteredCitiesForFilter] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
          setFade(true);
          setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(false);
            }, 500); // Duration of the fade effect
        }, 3000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [images.length]);

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
      <div className='bg-balck md:mb-16'>
        <div
            className={`relative min-h-[50vh] md:min-h-[50vh] bg-cover bg-center flex items-center justify-center  transition-opacity duration-500 ${fade ? 'opacity-90' : 'opacity-100'}`}
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }} 
        >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 text-center md:p-8 p-2 md:w-[80vw] lg:w-[60vw]">
                <h1 className={`md:text-5xl mb-3 md:mb-6 text-2xl font-bold text-white`}>
                    Discover Your Dream Properties Today with Us
                </h1>
                <p className='text-white text-sm md:text-lg mb-6'>
                    Explore premium agricultural, residential, and commercial properties tailored to your needs. Our expertise helps you find ideal investments or personal retreats across diverse landscapes.
                </p>

                <HomeSearchBox/>            

                
                {/* <div className="flex-col md:flex-row md:gap-4 flex">
                    <div className="relative ">
                        <InputField
                            type="text"
                            placeholder="State"
                            name='State'
                            value={stateInput}
                            onChange={handleStateInputChange}
                            InputClassName="inputImg rounded-full w-[63vw] md:w-[13vw] text-white"
                            bgImg
                        />
                        {filteredStates.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 left-[50%] -translate-x-1/2 rounded-md mt-1 w-[63vw] md:w-full max-h-40 overflow-y-auto z-20">
                                {filteredStates.map((state, index) => (
                                    <li
                                        key={index}
                                        className="p-2 cursor-pointer  hover:bg-gray-200"
                                        onClick={() => handleStateSelect(state)}
                                    >
                                        {state}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="relative ">
                        <InputField
                            name='City'
                            type="text"
                            placeholder="City"
                            value={cityInput}
                            onChange={handleCityInputChange}
                            InputClassName="inputImg rounded-full w-[63vw]  md:w-[13vw] text-white"
                            bgImg
                            disabled={isCityDisabled}
                        />
                        {filteredCities.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 left-[50%] -translate-x-1/2 rounded-md mt-1 w-[63vw] md:w-full max-h-40 overflow-y-auto z-20">
                                {filteredCities.map((city, index) => (
                                    <li
                                        key={index}
                                        className="p-2 cursor-pointer  hover:bg-gray-200"
                                        onClick={() => handleCitySelect(city.name)}
                                    >
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                   
                    <Select options={options} bgimg onChange={handleSelectChange} SelectClassName={`bg-gray-100 w-[63vw]  md:w-full text-white `} OptionClassName={`text-black`} value={undefined} />
                    
                </div>
                <div className='w-full flex justify-center'>
                <Button onClick={() => {}} ButtonClassName={`bg-${theme}-primary w-[63vw] md:w-full mt-5 rounded-xl block`}>
                    Search
                </Button>
                </div> */}
            </div>
        </div>
        </div>
    )
}

export default Banner
