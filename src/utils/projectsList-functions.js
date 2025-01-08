import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getProjectsList(collectionName) {

    const querySnapshot = await getDocs(collection(db, collectionName));

    const isListEmpty = querySnapshot._snapshot.docChanges.length === 0;
    
    if(isListEmpty) {
        return [];
    }

    const projectsList = [];
    
    querySnapshot.forEach((doc) => {
        projectsList.push(doc.data())
    });

    return projectsList;
}

export async function getProjectFromDb(projectId) {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export async function addNewProject(projectId, projectData) {
    await setDoc(doc(db, "projects", projectId), {...projectData});
}


export const getBoardData = (projects, currentWeeksIndex, weeks)=>{
    const boardData = [];

    projects.map((project)=> {
        const vi = weeks[currentWeeksIndex];
        const viMinus_x = weeks[(currentWeeksIndex + 1)];
        const data = {
            id: project.id,
            row: [
                project.project_name, 
                project.domain, 
                project.vi[vi]?.visibility_index,
                project.vi[viMinus_x]?.visibility_index,
                project.status,
                project.pos[vi]?.page_count,
                project.category,
                project.creation_date
            ]
        }

        boardData.push(data);
    })

    return boardData;
}

export const getProjectsListData = async (projectsList)=> {
        let newProjectsList = [];

        await Promise.all(projectsList.map( async (project)=> {
        const data = await getDomainOverview(project.domain, import.meta.env.VITE_APP_OVWIEW_URL);

        project.vi = data.visibility_index_history.results.reverse();
        project.pos = data.positions_and_pages_history.results.reverse();
        newProjectsList.push(project)
    }));

    return newProjectsList;
}


export const getDomainOverview = async (domainUrl, apiUrl)=> {
    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({domain_url: domainUrl})
        })

        if(!res.ok) {
            throw new Error();
        }
        
        const data = res.json();
        return data;

    } catch (error) {
        const mess = error.message || 'Erreur lors du chargement des données.'
        alert(mess);
    }
}

export const getProjectDataFromApi = async (project)=> {
    const data = await getDomainOverview(project.domain, import.meta.env.VITE_APP_OVWIEW_URL);

    project.vi = data.visibility_index_history.results.reverse();
    project.pos = data.positions_and_pages_history.results.reverse();

    return project;
}

export const deleteProjectFromDb = async (projectId)=> {
    await deleteDoc(doc(db, "projects", projectId));
}

export const modifyProjectInDb = async (projectId, data)=> {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, data);
}

export const trimData = (project)=> {
    let trimedData = {...project};

    for (const [key, value] of Object.entries(trimedData)) {
        trimedData[key] = value.trim();
    }

    return trimedData;
}