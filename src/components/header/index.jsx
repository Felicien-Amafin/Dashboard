import style from './style.module.css';
import '../../index.css';
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from 'react';
import Settings from '../settings';

const Header = ()=> {
    const [isSettingsOpened, setIsSettingsOpened] = useState(false);

    const handleSettings = ()=> {
        setIsSettingsOpened((prev)=> {
            return !prev;
        })
    }
    return <header className={`${style.header} flexRow`}>
        <h1>Uuup SEO</h1>
        <button 
        className={`${style.btn} flexRow`} 
        type="button" role="button" 
        aria-label="settings"
        onClick={handleSettings}
        >
            <IoSettingsOutline />
        </button>
        {isSettingsOpened && <Settings/>}
    </header>
}

export default Header;