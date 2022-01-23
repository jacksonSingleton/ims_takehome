import React from "react";

interface CtxState {
  magnitude: number;
  setMagnitude: React.Dispatch<React.SetStateAction<number>>;
}
const MagnitudeContext = React.createContext({} as CtxState);

export default MagnitudeContext;
