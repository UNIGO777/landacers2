import React from "react";
import { useTheme } from "./context/ThemeContext";

function Temp() {
  const { theme, toggleTheme } = useTheme();

  

  return (
    <div
      className={`bg-${theme}-background text-${theme}-text min-h-screen flex flex-col items-center justify-center`}
    >
      <h1 className={`text-3xl font-bold underline text-${theme}-primary`}>
        Temp
      </h1>
      <button
        onClick={() => toggleTheme()}
        className={`mt-4 px-4 py-2 bg-${theme}-secondary text-${theme}-text rounded`}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default Temp;
