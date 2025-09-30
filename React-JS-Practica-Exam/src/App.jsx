
import './App.css'
import Products from './Components/Products/Products'
import AddProduct from './Components/AddProducts/AddProducts'
import EditProduct from './Components/Edit/Edit'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
      </>
  )
}

export default App
