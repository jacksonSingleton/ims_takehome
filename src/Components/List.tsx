import React, { useEffect, useRef } from "react";
import "../styles/List.css";
import MagnitudeContext from "../Contexts/magnitude-context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

type ListProps = {
    items: any[];
};

function List({ items }: ListProps) {
    const {magnitude, setMagnitude} = React.useContext(MagnitudeContext);
    const [maxItems, setMaxItems] = React.useState(10);
    const [startItem, setStartItem] = React.useState(0);
    const [sortDirection, setSortDirection] = React.useState("asc");
    const [sortBy, setSortBy] = React.useState("");
    const [metric, setMetric] = React.useState(true);

    const nextRef = useRef<HTMLButtonElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);

    function sortTable(sortBy: string){
        setSortBy(sortBy);
        if(sortBy === "mag"){
            if(sortDirection === "asc"){
                items.sort((a, b) => (a.properties.mag > b.properties.mag) ? 1 : -1);
                setSortDirection("desc");
            } else if(sortDirection === "desc"){
                items.sort((a, b) => (a.properties.mag > b.properties.mag) ? -1 : 1);
                setSortDirection("asc");
            }
        } else if(sortBy === "time"){
            if(sortDirection === "asc"){
                items.sort((a, b) => (a.properties.time > b.properties.time) ? 1 : -1);
                setSortDirection("desc");
            } else if(sortDirection === "desc"){
                items.sort((a, b) => (a.properties.time > b.properties.time) ? -1 : 1);
                setSortDirection("asc");
            }
        }

    }
    function getDate(time: number){
        return new Date(time).toString();
    }

    function handlePageChange(e: any, direction: string){
        const numItems = items.filter(item => item.properties.mag >= magnitude).length;
        if(direction === "next"){
            if(startItem + maxItems  < numItems){
                setStartItem(startItem + maxItems);
                if(nextRef.current) nextRef.current.disabled = false;
                if(prevRef.current) prevRef.current.disabled = false;
            } else {
                if(nextRef.current) nextRef.current.disabled = true;
            }
        } else if(direction === "prev"){
            if(startItem - maxItems >= 0){
                setStartItem(startItem - maxItems);
                if(prevRef.current) prevRef.current.disabled = false;
                if(nextRef.current) nextRef.current.disabled = false;
            } else {
                if(prevRef.current)prevRef.current.disabled = true;
            }
        }
    }
    function checkUnit(item: any){
        if(metric){
            return item.properties.place;
        } else {
            return Math.round(item.properties.place.split("km ")[0] * 0.61) + " mi" + item.properties.place.split("km")[1]
        }
    }
    useEffect(() => {
            setStartItem(0);
            if(nextRef.current) nextRef.current.disabled = false;
            if(prevRef.current) prevRef.current.disabled = false;
        } , [magnitude, maxItems]);
    return (
        <div className="list">
            <h1>List of Earthquakes Recorded in the Past 24 hours</h1>
            <div className="list-buttons">
                <label htmlFor="product-count">Number of Earthquakes to Display:</label>
                <select name="product-count" onChange={(
                    e: React.ChangeEvent<HTMLSelectElement>) => {
                    setMaxItems(parseInt(e.target.value));
                }}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
                <button onClick={() =>  sortTable("mag") } className="btn">Sort by Magnitude <FontAwesomeIcon icon={ faArrowUp } className={sortBy === "mag" ? sortDirection : "hidden"}/></button>
                <button onClick={() =>  sortTable("time") } className="btn">Sort by Time <FontAwesomeIcon icon={ faArrowUp } className={sortBy === "time" ? sortDirection : "hidden"}/></button>
                <button onClick={() => setMetric(!metric) } className="btn">Show {metric ? "Miles" : "Kilometers"}</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Magnitude</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.filter((i: any) => i.properties.mag >= magnitude).slice(startItem, (startItem + maxItems + 1))
                        .map((item: any, index: number) => (
                        <tr key={index}>
                            <td><a href={item.properties.url} target="_blank">{checkUnit(item)}</a></td>
                            <td>{item.properties.mag.toFixed(2)}</td>
                            <td>{getDate(item.properties.time)}</td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>

                <div className="list-buttons">
                    <button className="btn" ref={prevRef} onClick={(e) => handlePageChange(e, "prev")}>Previous</button>
                    <button className="btn" ref={nextRef} onClick={(e) => handlePageChange(e, "next")}>Next</button>
                </div>
        </div>
    );
}
export default List;
