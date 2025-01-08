import { configureStore } from '@reduxjs/toolkit';
import projectsListReducer from './projectsListSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projectsList: projectsListReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
  })
});