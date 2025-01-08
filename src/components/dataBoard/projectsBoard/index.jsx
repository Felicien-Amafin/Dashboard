import AlertBox from "../../alertBox";
import { useState } from "react";
import Btn from "../../btn";
import { deleteProjectFromDb, getProjectDataFromApi, getProjectFromDb, trimData } from "../../../utils/projectsList-functions";
import { useDispatch } from "react-redux";
import { deleteProjectFromList, updateProjectInList } from "../../../store/projectsListSlice";
import FormModal from "../../formModal";
import ProjectHeaders from "./projectHeaders";
import ProjectDataRow from "./projectDataRow";
import { modifyProjectForm } from "../../../assets/constants";
import { modifyProjectInDb } from "../../../utils/projectsList-functions";

const ProjectsBoard = ({headers, data, search, options, date, onLoad, onTaskCompleted})=> {
    const [ projectToDelete, setProjectToDelete ] = useState();
    const [ projectToModify, setProjectToModify ] = useState();
    const [ supprConfirm, setSupprConfirm ] = useState('');
    const [ isFormOpened, setIsFormOpened ] = useState(false);
    const dispatch = useDispatch();

    const form = modifyProjectForm;
    
    const handleDeletionConfirm = (projectData)=> {
        setProjectToDelete(projectData);
        setSupprConfirm(`Etes-vous sûr de vouloir supprimer "${projectData.name}" ?`)
    }
    
    const handleDeletion = ()=> {
        onLoad('Suppression en cours');
        deleteProjectFromDb(projectToDelete.id);
        onLoad('');
        dispatch(deleteProjectFromList(projectToDelete.id));
        setSupprConfirm('');
    }

    const getProjectToModify = (project)=> {
        const projetToModify = {
            id: project.id,
            values: {
                project_name: project.data[0],
                domain: project.data[1],
                status: project.data[4],
                category: project.data[6], 
            }
        };

        setProjectToModify(projetToModify);
        setIsFormOpened(true);
    } 


    const handleProjectDisplay = ()=> {
        console.log('Domain url page')
    }

    const handleModification = async (e, project)=> {
        e.preventDefault();
        onLoad('Modification en cours...');
        const modifiedProject = trimData(project);
        const modifiedProjectId = projectToModify.id;
        modifyProjectInDb(modifiedProjectId, modifiedProject);
        const projectFromDb = await getProjectFromDb(modifiedProjectId);
        const projectData = await getProjectDataFromApi(projectFromDb);
        setIsFormOpened(false);
        onLoad('');
        dispatch(updateProjectInList(projectData));
        onTaskCompleted('Modification éffectuée.');
    }

    return <>
        <table>
            <ProjectHeaders 
            headers={headers} 
            options={options}
            date={date}
            />
            {<tbody>
                {data.filter((project)=> {
                    const searchTerm = search.toLowerCase();
                    const projectName = project.row[0].toLowerCase();

                    if(search === '') {
                        return project;
                    }

                    if(projectName.includes(searchTerm)) {
                        return project
                    }
                }).map((project, index)=> {
                    return <ProjectDataRow 
                    key={`boardDataRow-${index}`} 
                    projectData={project}
                    options={options}
                    onDelete={handleDeletionConfirm}
                    onModify={getProjectToModify}
                    />
                })}
            </tbody>}
        </table>
        {supprConfirm && <AlertBox mess={supprConfirm}>
            <>
            <Btn
            btnStyle="alertBtn"
            text="OUI"
            type="button"
            onClick={()=> {handleDeletion()}}
            />
            <Btn
            btnStyle="alertBtn"
            text="NON"
            type="button"
            onClick={()=> {setSupprConfirm('')}}
            />
            </>
            </AlertBox>}
        {isFormOpened && <FormModal
        onSubmit={handleModification}
        onClose={()=> {setIsFormOpened(false)}}
        form={form}
        values={projectToModify.values}
        />}
    </>
}

export default ProjectsBoard;