import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './Auth'

export default function Navbar() {
    const auth=useAuth()
  return (
    <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/registration'>Register</NavLink>
        {/*<NavLink to='/dashboard'>Dashboard</NavLink>*/}
        <NavLink to='/companyinfo'>Company Info</NavLink>
        <NavLink to='/about'>About</NavLink>
        {auth.user && <NavLink to='/profile'>Profile</NavLink>}
        {!auth.user && <NavLink to='/login'>Login</NavLink>}
        {!auth.user && <NavLink to='/signup'>Signup</NavLink>}
    </nav>
  )
}