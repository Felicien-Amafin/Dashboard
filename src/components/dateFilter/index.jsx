import { useDispatch } from "react-redux";
import { CiCalendarDate } from "react-icons/ci";
import style from './style.module.css';
import '../genericStyle.css';
import { setCurrentWeekIndex } from "../../store/projectsListSlice";

const DateFilter = ({dates, lastDataDate})=> {
    const dispatch = useDispatch();
    const newDates = [lastDataDate, ...dates];

    return <div className={`searchOption ${style.dateFilter} flexRow`}>
        <div className={`icon flexColumn`}><CiCalendarDate /></div>
        <select 
            className={`input selectOption flexRow`} 
            onChange={(e)=>{dispatch(setCurrentWeekIndex(parseInt(e.target.value)))}}
        >
            {newDates.map((date, index)=> {
                return <option 
                value={index} 
                className="selectOption"
                key={`${date}-date`}
                >
                {date}
                </option>})}
        </select>
    </div>
}

export default DateFilter;