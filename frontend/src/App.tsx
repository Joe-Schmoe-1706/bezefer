import ThempeProvider from './Context/ThemeContext'
import Classes from './components/Classes/Classes'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from "react-router-dom"
import Students from './components/Students/Students'
import Create from './components/Create/Create'
import { useAppDispatch } from './hooks'
import { initializeState } from './state/reducers/classroomSlice'
import { useEffect, useState } from 'react'
import { getAllClassrooms } from './api/classrooms.api'
import { StatusOptions } from './Types/types'

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

        setClassesStatus("done");
      } catch (error) {
        setClassesStatus("failed");
      }
    }

    initState();
  });

  return (
    <ThempeProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Classes status={classesStatus}/>} />
        <Route path='/students' element={<Students status={classesStatus}/>} />
        <Route path='/create' Component={Create} /> 
      </Routes>
    </ThempeProvider>
  )
}

export default App
