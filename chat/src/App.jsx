import SignIn from '../page/Auth/SignIn/SignIn'
import SignUp from '../page/Auth/SignUp/SignUp'
import Home from '../page/Home/Home'
import './App.css'
import {Route, Routes} from 'react-router-dom'


function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/Home' element={<Home/>} />
        
      </Routes>
    </>
  )
}

export default App
