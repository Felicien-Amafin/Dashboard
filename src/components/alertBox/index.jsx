import style from './style.module.css';

const AlertBox = ({mess, children})=> {
    return <div className={`${style.alertContainer} flexColumn`}>
        <div className={`${style.alert} flexColumn`}>
            <p className={style.mess}>{mess}</p>
            <div className={`${style.alertBtn} flexRow`}>{children}</div>
        </div>
    </div>
}

export default AlertBox;