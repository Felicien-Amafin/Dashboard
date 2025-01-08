import ClipLoader from "react-spinners/PulseLoader";
import style from './style.module.css';

const override = {
    display: "block",
    margin: "0 auto",
};

const Loader = ({mess})=> {
    return <div className={`${style.loaderContainer} flexColumn`}>
        <p className={style.mess}>{mess}</p>
        <ClipLoader
        color="grey"
        loading={true}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
}

export default Loader;