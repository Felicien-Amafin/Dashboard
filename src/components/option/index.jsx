import style from './style.module.css';
import '../genericStyle.css';

const Option = ({children, onClick})=> {
    return <button 
    className={style.optionIcon} 
    type="button" aria-label="option"
    onClick={onClick}
    >
    {children}
    </button>
}

export default Option;