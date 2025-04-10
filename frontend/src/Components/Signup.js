import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './Signup.css'
import Person from '../Components/assets/person.png'
import Lock from '../Components/assets/Signuplock.png'
import Mail from '../Components/assets/email.png'
import Register from '../Components/assets/registration.png'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

const[formData,setformData]=useState({
  username:'',
  email:'',
  password:''
})

const navigate=useNavigate()

function handleChange(e){
  setformData({...formData,[e.target.name]:e.target.value})
}

function handleSubmit(e){
  e.preventDefault()
  axios.post('http://localhost:3002/authentication/signup',formData)
  .then(res=>{
    alert(`Welcome to Placement Portal ${formData.username}! \n Please Login to Apply for Jobs`);
    setTimeout(()=>{
      navigate('/login')
    },1000)
    
  })
  .catch(err=>{console.log(err)})

}


// const inputref=useRef(null) //Auto Focusing the Username input
// useEffect(()=>{
//   inputref.current.focus()
// },[])

  return (
    <div>
      <h3 className='stop'>Signup </h3>

        <form className='signupform' onSubmit={handleSubmit}>
          <div className='name'>
            <div className='img1'><img src={Person} className='image'/></div>
          <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} required/>
          </div>

          <div className='mail'>
            <div className='img3'><img src={Mail} className='image'/></div>
          <input type='email' name='email' id='emailaddress' placeholder='Email Address' onChange={handleChange} required/><br></br>
          </div>

          <div className='spass'>
            <div className='img4'><img src={Lock} className='image'/></div>
          <input type='Password' name='password' id='password' placeholder='Password' onChange={handleChange} required/><br></br>
          </div>

          <button id='signupbtn' type='submit'>Signup</button>
        </form>
    </div>
  )
}
