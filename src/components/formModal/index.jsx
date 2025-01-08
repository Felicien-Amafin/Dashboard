import ProjectForm from "../form/projectForm";
import style from './style.module.css';
import { IoMdClose } from "react-icons/io";

const FormModal = ({onSubmit, onClose, form, values})=> {
    return <div className={`${style.modal} flexRow`}>
        <button 
        type="button" 
        className={style.closeForm} 
        onClick={()=>{onClose()}}
        >
        <IoMdClose/>
        </button>
        {<ProjectForm onSubmit={onSubmit} form={form} values={values}/>}
    </div>
}

export default FormModal;