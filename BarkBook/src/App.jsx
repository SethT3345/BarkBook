import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import Login from './Login.jsx';
import Home from './Home.jsx';
import Signup from './Signup.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
