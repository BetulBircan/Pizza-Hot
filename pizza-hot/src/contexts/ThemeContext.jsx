import { createContext, useState, useReducer } from "react";
import {themeReducer} from "../reducers/themeReducer";

export const ThemeContext = createContext();
export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, { color: "primary", mode: "light" });

  function changeColor(color) {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  }

  function changeMode(mode) {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
