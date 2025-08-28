import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componentes/Navbar'
import Medio from './componentes/Medio'
import Futer from './componentes/Futer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Medio  greeting="¡Bienvenido a Estudio Fem!" />
      <Futer/>
    </>
  ) 
}

export default App
