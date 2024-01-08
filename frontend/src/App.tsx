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

const App : React.FC = () => {
  const dispatch = useAppDispatch();

  const [classesStatus, setClassesStatus] = useState<StatusOptions>("loading");

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
        setClassesStatus("done");
      } catch (error) {
        dispatch(changeStatus({
          status: "failed"
        }))
        setClassesStatus("failed");
      }
    }

    dispatch(fetchStudents());
    initState();
  });

  return (
    <ThempeProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Classes/>} />
        <Route path='/students' element={<Students/>} />
        <Route path='/create' Component={Create} /> 
      </Routes>
    </ThempeProvider>
  )
}

export default App
