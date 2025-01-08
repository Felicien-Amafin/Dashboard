import { CiSearch } from "react-icons/ci";
import style from './style.module.css';
import '../genericStyle.css';
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/projectsListSlice";

const SearchBubble = ()=> {
    const dispatch = useDispatch();

    const handleSearch = (e)=> {
        dispatch(setSearchTerm(e.target.value));
    }

    return <form 
    className={`searchOption ${style.searchBubble} flexRow`}
    onSubmit={(e)=> {e.preventDefault()}}
    >
        <input onChange={handleSearch} className="input" type="text" placeholder="Rechercher un projet"/>
        <div className="icon flexColumn"><CiSearch /></div>
    </form>
}

export default SearchBubble;