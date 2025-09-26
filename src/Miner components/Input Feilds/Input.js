import React from 'react'

const InputField = ({ type, placeholder, value, onChange, InputClassName, bgImg, name,disabled }) => {
    
    return (
        <input
            name={name}
            type={type}
            readOnly={disabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`mt-4 px-4 w-full ${bgImg && `inputImg`} outline-none py-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${InputClassName}`}
        />
    );
};

export default InputField;
