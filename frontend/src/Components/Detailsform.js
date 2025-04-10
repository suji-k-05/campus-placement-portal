import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Detailsform.css'
import Men from '../Components/assets/men.png'
import axios from 'axios'
export default function Detailsform() {    
    const[data,setData]=useState({})
    const{sid}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3002/register/getdetails/${sid}`)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div className='details-form-container '>
    <button onClick={()=>navigate(-1)} className='back-btn'>Back</button>
    <div className='details-form'>
      <h2>Details of {data.firstname} {data.lastname}</h2>
      <p><strong>Name :</strong> {data.firstname} {data.lastname}</p>
      <p><strong>Date of Birth :</strong> {data.dateofbirth}</p>
      <p><strong>Gender :</strong> {data.gender}</p>
      <p><strong>College :</strong> {data.collegename}</p>
      <p><strong>Branch :</strong> {data.degree} {data.course}</p>
      <p><strong>CGPA :</strong> {data.cgpa}</p>

      <strong>Skills :</strong>
                <ul>
                    {(data.skills || []).map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>

                <strong>Language :</strong>
                <ul>
                    {(data.language || []).map((language, index) => <li key={index}>{language}</li>)}
                </ul>
      <p><strong>Area of Interest :</strong> {data.interest}</p>
      <p><strong>Projects :</strong> {data.Projects}</p>
      <p><strong>Internship :</strong> {data.Internship}</p>

      <p><strong>Address :</strong> {data.address}</p>
      <p><strong>Mobile Number :</strong> {data.mobilenumber}</p>
      <p><strong>Alternative Mobile Number :</strong> {data.alternativenumber}</p>
      <p><strong>Email :</strong> {data.email}</p>
      <p><strong>GitHub :</strong><a href={data.github} target='blank' className='link'>{data.github}</a></p>
      <p><strong>Linkedin :</strong><a href={data.linkedin} target='blank' className='link'>{data.linkedin}</a></p>
      

    </div>
    </div>
  )
}
