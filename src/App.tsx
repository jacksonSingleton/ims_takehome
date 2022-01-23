import React, { useEffect }  from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import List from "./Components/List";
import MagnitudeContext from "./Contexts/magnitude-context";
import axios from "axios";

function App() {
    const [magnitude, setMagnitude] = React.useState(1);
    const [features, setFeatures] = React.useState([]);
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
    filterData(magnitude);
    let value = { magnitude, setMagnitude };
    return (
        <div className="App">
            <MagnitudeContext.Provider value={value}>
                <Navbar />
                <Map features={features} />
                <List items={features} />
            </MagnitudeContext.Provider>
        </div>
    );
}

export default App;

