import style from './style.module.css';

const BoardTitle = ({title})=> {
    return <h2 className={style.boardTitle}>{title}</h2>
}

export default BoardTitle;