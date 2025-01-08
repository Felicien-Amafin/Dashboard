import style from './style.module.css';
import '../genericStyle.css';
import { PiPlusBold } from "react-icons/pi";
import FormModal from '../formModal';
import { newProjectForm } from '../../assets/constants';
import { addNewProject, getProjectDataFromApi, trimData } from '../../utils/projectsList-functions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addProjectToList } from '../../store/projectsListSlice';

const AddNewProject = ({onLoad, onTaskCompleted})=> {
    const [ isFormOpened, setIsFormOpened ] = useState(false);
    const dispatch = useDispatch();

    const form = newProjectForm;

    const handleNewProject = async (e, project)=> {
        e.preventDefault();
        onLoad('Ajout en cours...');
        const date = new Date();
        project.creation_date =  date.toLocaleDateString();
        const modifiedProject = trimData(project);
        await addNewProject(modifiedProject.id, modifiedProject); 
        const projectData = await getProjectDataFromApi(modifiedProject);
        setIsFormOpened(false);
        onLoad('');
        dispatch(addProjectToList(projectData));
        onTaskCompleted('Ajout effectué.');
    }

    return <>
        <button className={`${style.btn} flexRow`} onClick={()=> {setIsFormOpened(true)}} >
            <p className={style.text}>Ajouter un projet</p>
            <i className={`${style.crossIcon} flexRow`}><PiPlusBold/></i>
        </button>
        {isFormOpened && <FormModal
        onSubmit={handleNewProject}
        onClose={()=> {setIsFormOpened(false)}}
        form={form}
        values={null}
        />}
    </>
}

export default AddNewProject;