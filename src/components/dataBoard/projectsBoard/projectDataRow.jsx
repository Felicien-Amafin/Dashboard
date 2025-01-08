import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Option from "../../option";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import '../style.module.css';
import BoardRow from "../boardRow";

const optionIcon = {
  Voir: <IoEyeOutline/>,
  Modifier: <FaRegEdit/>,
  Supprimer: <MdOutlineDelete/>
}
  
const ProjectDataRow = ({projectData, options, onDelete, onModify})=> {
  const dataRow = projectData.row;
  
  return <BoardRow head={dataRow[0]}>
    {dataRow.map((data, i)=>{
      let icon;
      
      if(dataRow[2] > dataRow[3]) {
        icon = <BiSolidUpArrow color='#28d728'/> 
      }

      if(dataRow[2] < dataRow[3]) {
        icon = <BiSolidDownArrow  color='#ff4a4a'/>
      }

      if(i !== 0) {
        return <td key={`data-${data}-${Math.floor(Math.random() * 10456)}`}>
          {data} {i === 2 && icon}
        </td>
      }
    })}
    {options.map((option, i)=> {
      let onClick;
   
      /* if(option === "Voir") {
        onClick = handleProjectDisplay;
      } */

      if(option === "Modifier") {
        onClick = ()=> {onModify({id: projectData.id, data: dataRow})};
      }

      if(option === "Supprimer") {
        onClick = ()=> {onDelete({id: projectData.id, name: projectData.row[0]})};
      }

      return <td key={`option-icon-${i}`}>
        <Option 
        onClick={onClick}
        >
        {optionIcon[option]}
        </Option>
      </td>
    })}
  </BoardRow>

}

export default ProjectDataRow;