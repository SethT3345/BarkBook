
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Liked from './Liked'
import Comments from './Comments'
import Account from './Account'


function App(){

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Liked" element={<Liked />} />
        <Route path="/Comments" element={<Comments />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
  )
}

export default App
