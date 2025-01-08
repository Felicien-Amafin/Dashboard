import DateFilter from "../dateFilter";
import SearchBubble from "../searchBubble";
import style from './style.module.css';
import { dates } from "../../assets/constants";

const SearchOptions = ({isAdmin, projects})=> {
    const lastDataDate = (projects && projects.length > 0) ? projects[0].vi[0]?.agg_date : null;

    return <div className={style.searchBar}>
        {(isAdmin && projects && projects.length > 0)  && <>
        <SearchBubble/>
        <DateFilter 
        dates={dates}
        lastDataDate={lastDataDate}
        />
        </>}
        {!isAdmin && <DateFilter 
        dates={dates}
        lastDataDate={lastDataDate}
        />}
    </div>
}

export default SearchOptions;