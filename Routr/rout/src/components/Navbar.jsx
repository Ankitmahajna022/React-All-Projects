import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavbarData = [
    {
        id:1,
        name:"Home",
        path:"/"
    },
    {
        id:2,
        name:"Product",
        path:"/product"
    },
    {
        id:3,
        name:"Add Product",
        path:"/addproduct"
    },
    {
        id:4,
        name:"Edit Page",
        path:"/editpage"
    },
    {
        id:5,
        name:"Login",
        path:"/login"
    }
]
function Navbar() {
  return (
    <div style={{backgroundColor:"black",color:"white",height:"30px"}}>
      <nav style={{display:"flex",gap:"20px",justifyContent:"space-around", margin:"5px", alignContent:"center",}}>
        {
            NavbarData.map((el,i)=>{
                
                return(<div key={i}><NavLink style={({isActive})=>(isActive?{textDecoration:"none",color:"red"}:{color:"white",textDecoration:"none"})} to={el.path}>{el.name}</NavLink></div>)
                   
            
            })
        }
      </nav>
    </div>
  )
}

export default Navbar
