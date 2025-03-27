import React from 'react'
import { useTheme } from "../../context/ThemeContext";

const Select = ({ options, onChange, value, SelectClassName,OptionClassName, lebel, bgimg }) => {
    const {theme} = useTheme()
   
        return (
            <div className='w-full'>
                {lebel && <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>}
                <select  onChange={onChange} value={value} className={` px-4   ${bgimg && `selectImg`} relative outline-none py-2 rounded-md  focus:outline-none cursor-pointer  ${SelectClassName}`}>
                    {options?.map((option, index) => (
                        <option key={index} className={`option cursor-pointer ${OptionClassName}`} value={option?.value} disabled={option?.disabled} selected={option?.selected}>
                            {option?.label}
                        </option>
                    ))}
                </select>
            </div>)
    
    


};




export default Select