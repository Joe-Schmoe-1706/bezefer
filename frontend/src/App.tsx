import ThempeProvider from './Context/ThemeContext'
import Classes from './components/Classes/Classes'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from "react-router-dom"
import Students from './components/Students/Students'
import Create from './components/Create'

const App : React.FC = () => {
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
