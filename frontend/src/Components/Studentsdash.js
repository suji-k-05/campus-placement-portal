import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'

export default function Studentsdash() {

  const[list,setList]=useState([])
  const [studata ,setstudata ]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:3002/register/getdetails`)
    .then(res=>setList(res.data))
    .catch(err=>console.log(err))
  },[])

  const inputref=useRef(null)
  useEffect(()=>{
    inputref.current.focus()
  })

  const handleSearch=()=>{
    axios.get(`http://localhost:3002/register/getdetails`)
    .then(res=>setList(res.data.filter(x=>x.firstname===studata || x.lastname===studata)))
    .catch(err=>console.log(err))
  }


  return (
    <div>
      <div id='search'>
      <input type='search' id='studentssearch' placeholder='Search Students...' ref={inputref}  value={studata} onChange={(e)=>{setstudata(e.target.value)}}/>
      <button id='search-btn' onClick={handleSearch}>Search</button>
      </div>
      {list.map(x=>(
      <div className='firstname'>
        <h3 className='sname'>{x.firstname} {x.lastname}</h3>
        <button onClick={()=>{navigate(`/details/${x._id}`)}} className='view'>View Details</button>
      </div>
      ))}
    </div>
  )
}
