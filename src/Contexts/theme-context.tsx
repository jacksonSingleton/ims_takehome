import React from "react";

interface CtxState {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const ThemeContext = React.createContext({} as CtxState);

export default ThemeContext;
