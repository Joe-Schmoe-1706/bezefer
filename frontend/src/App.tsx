import ThempeProvider from './Context/ThemeContext'
import Classes from './pages/Classes/Classes'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from "react-router-dom"
import Students from './pages/Students/Students'
import Create from './pages/Create/Create'
import { useAppDispatch } from './hooks'
import { changeStatus, initializeState } from './state/reducers/classroomSlice'
import { useEffect, useState } from 'react'
import { getAllClassrooms } from './api/classrooms.api'
import { StatusOptions } from './Types/types'
import { fetchStudents } from './state/reducers/studentSlice'
import { routes } from './consts/routes'

const App : React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initState = async () => {
      try {
          const classrooms = await getAllClassrooms();
          dispatch(initializeState({
          classrooms: classrooms
        }));
        
        dispatch(changeStatus({
          status: "done"
        }))
      } catch (error) {
        dispatch(changeStatus({
          status: "failed"
        }))
      }
    }

    dispatch(fetchStudents());
    initState();
  });

  return (
    <ThempeProvider>
      <Navbar />
      <Routes>
        {routes.map((route) => 
          <Route path={route.path} element={route.component}/>
        )}
      </Routes>
    </ThempeProvider>
  )
}

export default App
