import React from 'react'
import  './Home.css'
import image from '../Components/assets/placement.png'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Home() {
  const navigate=useNavigate()
    function nav(){
      navigate('/registration')
    }
    
  return (

    <div className='container1'>

    <div className='content'>

    <div className='info'>
        <div className='header'>
        <h1 className='main'>Welcome Students </h1>
        <h1 className='mainex'> !</h1>
        </div>
        <p1 className='homecnt'>
        Welcome to your Placement Portal
        </p1><br></br>
        <p1 className='homecnt'>
        Explore career opportunities, 
        </p1><br></br>
        <p1 className='homecnt'>
        company profiles,and upcoming interviews.
        </p1><br></br>

        <button onClick={nav} className='apply'>Apply</button>
    </div>

    <div className='image'>
    <img src={image}/>
    </div>

    </div>
    

    </div>

  )
}