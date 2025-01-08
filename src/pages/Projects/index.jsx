import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewProject from "../../components/addNewproject";
import BoardTitle from "../../components/boardTitle";
import SearchOptions from "../../components/searchOptions";
import { projectsBoardHeaders } from "../../assets/constants";
import { setProjectsList } from "../../store/projectsListSlice";
import style from './style.module.css';
import { getBoardData, getProjectsListData, getProjectsList, 
getProjectFromDb, getProjectDataFromApi } from "../../utils/projectsList-functions";
import Loader from "../../components/loader";
import AlertBox from "../../components/alertBox";
import Btn from "../../components/btn";
import ProjectsBoard from "../../components/dataBoard/projectsBoard";

const Projects = ()=> {
  const { user } = useSelector((state)=> state.auth);
  const { projects, date_filter, search } = useSelector((state)=> state.projectsList);
  const [ loadingMess, setLoadingMess ] = useState('');
  const [ taskCompletedMess, setTaskCompletedMess ] = useState('');
  const dispatch = useDispatch();

  const admin = user.uid === import.meta.env.VITE_ADMIN1;
  const boardHeaders = projectsBoardHeaders.list;
  const options = admin ? projectsBoardHeaders.admin_options : projectsBoardHeaders.client_options;

  let defaultMess;
  let boardData;

  if(projects === null) {
    defaultMess = 'Récupération des données...';
  }

  if(projects && projects.length === 0) {
    defaultMess = `Aucun projets en base de données. Cliquez sur "Ajouter un projet" pour commencer.`;
  }

  if(projects && projects.length > 0) {
    boardData = getBoardData(projects, date_filter.current_week_index, date_filter.weeks);
  }

  useEffect(()=> {
    if((projects === null) && admin) {
      getProjectsList('projects')
      .then(async (projectsList)=> {
        if(projectsList.length === 0) {
          dispatch(setProjectsList(projectsList));
          return;
        } 

        const newProjectsList = await getProjectsListData(projectsList);
        dispatch(setProjectsList(newProjectsList));
      })
      .catch((error)=> {
        alert(error);
      })
    }

    if((projects === null) && !admin) {
      getProjectFromDb(user.uid)
      .then(async (project)=> {
        const projectData = await getProjectDataFromApi(project);
        dispatch(setProjectsList([projectData]));
      })
      .catch((error)=> {
        alert(error);
      })
    }
  })
     
  return <>
    {projects === null && <Loader mess={defaultMess}/>}
    {projects !== null && <section className={`${style.projects} flexColumn`}>
      {admin && <AddNewProject
      onLoad={(mess)=> {setLoadingMess(mess)}}
      onTaskCompleted={(mess)=> {setTaskCompletedMess(mess)}}
      />}
      <div className={style.options}>
        <BoardTitle 
        title={admin ? "Mes projets": "Mon projet"}
        />
        <SearchOptions 
        isAdmin={admin} 
        projects={projects}
        />
      </div>
      {(projects && projects.length > 0) && <ProjectsBoard
        headers={boardHeaders}
        data={boardData}
        search={search}
        options={options}
        date={date_filter}
        onLoad={(mess)=> {setLoadingMess(mess)}}
        onTaskCompleted={(mess)=> {setTaskCompletedMess(mess)}}
        />}
      {projects.length === 0 && <p className={style.defaultmess}>{defaultMess}</p>}
      {loadingMess && <Loader mess={loadingMess}/>}
      {taskCompletedMess && <AlertBox mess={taskCompletedMess}>
        <Btn
        btnStyle="alertBtn"
        text="OK"
        type="button"
        onClick={()=> {setTaskCompletedMess('')}}
        />
      </AlertBox>}
    </section>}
  </>
}

export default Projects;
