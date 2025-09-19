import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './page/auth/SignIn'; // Corrected path
import SignUp from './page/auth/SignUp'; // Corrected path
import Home from './page/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;