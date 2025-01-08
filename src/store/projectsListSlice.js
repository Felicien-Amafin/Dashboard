import { createSlice } from '@reduxjs/toolkit';

const projectsList = createSlice({
    name: 'projectsList',
    initialState: {
        projects: null,
        date_filter: {
            weeks: [0, 1, 4, 8, 12, 16],
            current_week_index: 0
        },
        search: ''
    },
    reducers: {
        setProjectsList: (state, action)=> {
            state.projects = action.payload;
        },
        addProjectToList: (state, action)=> {
            state.projects.push(action.payload);
        },
        deleteProjectFromList: (state, action)=> {
            state.projects = state.projects.filter((project)=> {
                return project.id !== action.payload;
            })
        },
        updateProjectInList: (state, action)=> {
            if(state.projects.length > 1) {
                state.projects = state.projects.filter((project)=> {
    
                    return project.id !== action.payload.id;
                })
                state.projects.push(action.payload);
            } else {
                state.projects = [action.payload];
            }
        },
        setCurrentWeekIndex: (state, action)=> {
            state.date_filter.current_week_index = action.payload;
        },
        setSearchTerm: (state, action)=> {
            state.search = action.payload;
        }
    }
});

export default projectsList.reducer;

export const { setProjectsList, 
    addProjectToList, 
    deleteProjectFromList,
    setCurrentWeekIndex,
    updateProjectInList,
    setSearchTerm
} = projectsList.actions;