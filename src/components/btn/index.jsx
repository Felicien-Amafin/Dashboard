import style from './style.module.css';

const Btn = ({btnStyle, text, type, onClick})=> {
    return <button 
    type={type} 
    className={`${style[btnStyle]} ${style.btnHover}`} 
    onClick={onClick}>
    {text}
    </button>
}

export default Btn;