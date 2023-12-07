import ThempeProvider from './Context/ThemeContext'
import Navbar from './components/Navbar'

const App : React.FC = () => {
  return (
    <ThempeProvider>
      <Navbar />
    </ThempeProvider>
  )
}

export default App
