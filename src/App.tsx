import React, { useEffect }  from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import List from "./Components/List";
import MagnitudeContext from "./Contexts/magnitude-context";
import ThemeContext from "./Contexts/theme-context";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
    const [magnitude, setMagnitude] = React.useState(1);
    const [features, setFeatures] = React.useState([]);
    const [theme, setTheme] = React.useState("light");
    const [cookies, setCookie] = useCookies(["theme"]);
    function filterData(magnitude: number){
        return features.filter((feature: any) => {
            if(feature.properties.mag >= magnitude){
                return feature;
            }
        })
    }
    useEffect(() => {
        axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson")
        .then(res => {
            setFeatures(res.data.features);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    useEffect(() => {
        setTheme(cookies.theme);
    }, []);
    filterData(magnitude);
    let magValue = { magnitude, setMagnitude };
    let themeValue = { theme, setTheme };
    return (
        <div className={"App" + theme}>
            <ThemeContext.Provider value={themeValue}>
                <MagnitudeContext.Provider value={magValue}>
                    <Navbar />
                    <Map features={features} />
                    <List items={features} />
                </MagnitudeContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;

