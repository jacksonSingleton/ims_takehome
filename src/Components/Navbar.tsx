import React, { useContext } from "react";
import styles from "../styles/Navbar.module.css";
import MagnitudeContext from "../Contexts/magnitude-context";
import ThemeContext from "../Contexts/theme-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const { magnitude, setMagnitude } = useContext(MagnitudeContext);
    const { theme, setTheme } = useContext(ThemeContext);
    function handleChange(e: any) {
        if (e.key === "Backspace" || e.key === ".") {
            return;
        } else if (e.key === "Enter") {
            e.preventDefault();
            return;
        } else {
            setMagnitude(Number(e.target.value));
        }
    }
    function changeScheme() {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <div className={styles.navbar}>
            <h1>SEISMA</h1>
            <div className={styles["magnitude-input"]}>
                <label htmlFor="magnitude">Minimum Magnitude</label>
                <input
                    name="magnitude"
                    type="number"
                    placeholder={`Currently: ${magnitude
                        .toFixed(1)
                        .toString()}`}
                    onKeyUp={(e) => handleChange(e)}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    id="checkbox"
                    onChange={() => changeScheme()}
                />
                <label htmlFor="checkbox" className={styles["checkbox-label"]}>
                    <FontAwesomeIcon
                        icon={faMoon}
                        className={styles["fa-moon"]}
                    />
                    <FontAwesomeIcon
                        icon={faSun}
                        className={styles["fa-sun"]}
                    />
                    <span className={styles.ball}></span>
                </label>
            </div>
        </div>
    );
}

export default Navbar;
