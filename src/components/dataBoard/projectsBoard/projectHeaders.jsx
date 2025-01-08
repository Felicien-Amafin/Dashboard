import '../style.module.css';
import BoardHeaders from '../boardHeaders';

const ProjectHeaders = ({headers, options, date})=> {
  return <BoardHeaders>
    {headers.map((header, index)=>{
      const days = 7;
      //Multiply number of week by number of days
      let daysNumIV1 = (date.weeks[date.current_week_index] * days); 
      let daysNumIV2 = (date.weeks[(date.current_week_index + 1)] * days);
      
      let content = header;
      
      if(index === 2 || index === 5) {
        content = daysNumIV1 === 0 ? header : `${header} J - ${daysNumIV1}`;
      }

      if(index === 3) {
        content = `${header} J - ${daysNumIV2}`;
      }
      
      return <th 
      scope="col" 
      key={`${header}-${index}`}>
      {content}
      </th>
      })}
    {options.map((option, index)=>{
      return <th 
      scope="col" 
      key={`option-${index}`}>
      {option}
      </th>
      })}
  </BoardHeaders>
}

export default ProjectHeaders;