import React from 'react'

const Button = ({ onClick, children, ButtonClassName }) => {
    return (
        <button
            onClick={onClick}
            className={`mt-4 px-6 py-2 rounded text-white font-semibold bg-blue-600 hover:bg-opacity-90 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${ButtonClassName}`}
        >
            {children}
        </button>
    );
};

export default Button;
