import ThempeProvider from './Context/ThemeContext'
import Classes from './components/Classes/Classes'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from "react-router-dom"
import Students from './components/Students/Students'
import Create from './components/Create/Create'
import { useAppDispatch } from './hooks'
import { initializeState } from './state/reducers/classroomSlice'
import { useEffect } from 'react'
import { getAllClassrooms } from './api/classrooms.api'

const App : React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initState = async () => {
      const classrooms = await getAllClassrooms();
      dispatch(initializeState({
        classrooms: classrooms
      }));
    }

    initState();
  });

  return (
    <ThempeProvider>
      <Navbar />
      <Routes>
        <Route path='/' Component={Classes} />
        <Route path='/students' Component={Students} />
        <Route path='/create' Component={Create} />
      </Routes>
    </ThempeProvider>
  )
}

export default App
