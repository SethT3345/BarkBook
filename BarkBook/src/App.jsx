
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'



function App(){

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
  )
}

export default App
