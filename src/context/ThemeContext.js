import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  // Set the theme explicitly if passed, otherwise toggle
  const toggleTheme = (newTheme) => {
    setTheme((prevTheme) => 
      newTheme ? newTheme.toLowerCase() : (prevTheme === "light" ? "dark" : "light")
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
