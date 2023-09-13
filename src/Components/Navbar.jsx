import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav>
    <ul>
      <li>
        <NavLink  className="link" to="/" >Registration</NavLink>
      </li>
      <li>
        <NavLink className ="link" to="/employee" >Employee List</NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar