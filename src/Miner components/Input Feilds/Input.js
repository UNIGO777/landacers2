import React from 'react';
import { useTheme } from "../../context/ThemeContext";

const InputField = ({ type, placeholder, value, onChange, InputClassName, bgImg, name,disabled }) => {
    const {theme }= useTheme();
    
    return (
        <input
            name={name}
            type={type}
            readOnly={disabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`mt-4 px-4 w-full ${bgImg && `inputImg`} outline-none py-2  rounded-md text-black bg-${theme}-background focus:outline-none focus:ring-2 focus:ring-${theme}-primary ${InputClassName}`}
        />
    );
};

export default InputField;
