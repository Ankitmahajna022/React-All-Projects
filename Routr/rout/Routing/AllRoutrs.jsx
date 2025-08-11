import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/components/Home'
import Product from '../src/components/Product'
import AddProduct from '../src/components/AddProduct'
import Loing from '../src/components/Loing'
import EditPage from '../src/components/EditPage'

function AllRoutrs() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product" element={<Product/>}></Route>
        <Route path="/addproduct" element={<AddProduct/>}></Route>
        <Route path="/editpage" element={<EditPage/>}></Route>
        <Route path="/login" element={<Loing/>}></Route>
      </Routes>
    </div>
  )
}

export default AllRoutrs