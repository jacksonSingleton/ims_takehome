import React, { useContext } from 'react';
import styles from '../styles/Navbar.module.css';
import MagnitudeContext from '../Contexts/magnitude-context';

function Navbar(){
    const { magnitude, setMagnitude } = useContext(MagnitudeContext);
    function handleChange(e: any){
        if(e.key === 'Backspace' || e.key === '.'){
            return;
        }
        else if(e.key === 'Enter'){
            e.preventDefault();
            return;
        }
        else{
            setMagnitude(Number(e.target.value));
        }
    }
    return(
        <div className={ styles.navbar }>
            <h1>SEISMA</h1>
            <div className={styles['magnitude-input']}>
                <label htmlFor="magnitude">Minimum Magnitude</label>
                <input name="magnitude" type="number" placeholder={`Currently: ${magnitude.toFixed(1).toString()}`} onKeyUp={e => handleChange(e)}/>
            </div>
        </div>
    )
}

export default Navbar;
