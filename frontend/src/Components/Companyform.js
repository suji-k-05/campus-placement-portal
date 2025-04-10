import React, { useState } from 'react'
import './Companyform.css'
import axios from 'axios'
export default function Companyform({setpopup}) {

    const [formdata,setFormdata]=useState({
        name:'',
        desc:'',
        date:'',
        mode:'',
        venue:'',
        companyimage:''
    })

    function handleChange(e){
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }


    function handlePost(e){
        e.preventDefault();
        axios.post('http://localhost:3002/company/postcmpny',formdata)
        .then(res=>{
            alert('Posted Successfully');
            setFormdata({
                name:'',
                desc:'',
                date:'',
                mode:'',
                venue:'',
                eligibility:'',
                link:''
            });
            
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className="overlay">
    <div className='formcnt'>
        <form className='cmpnyform' onSubmit={handlePost}>
        <button onClick={()=>setpopup(false)} id='close'>Close</button>

        <label htmlFor='cmpny'>Company Name:</label><br></br>
        <input type='text' id='cmpny' placeholder='Company Name' name='name' value={formdata.name} onChange={handleChange}/><br></br>

        <label>Description:</label><br></br>
        <textarea id='desc' placeholder='Company Description...' name='desc' value={formdata.desc} onChange={handleChange}></textarea><br></br>

        <label htmlFor='date'>Date of Visit:</label><br></br>
        <input type='text' id='date' name='date' placeholder='DD/MM/YYYY' value={formdata.date} onChange={handleChange}/><br></br>

        <label>Mode of Interview:</label><br></br>
        <input type='text' id='mode' placeholder='Mode of Interview' name='mode' value={formdata.mode} onChange={handleChange}/><br></br>

        <label>Venue:</label><br></br>
        <input type='text' id='venue' placeholder='Venue' name='venue' value={formdata.venue} onChange={handleChange}/><br></br>

        <label>Eligibility:</label><br></br>
        <textarea id='eligibility' placeholder='Eligibility' name='eligibility' value={formdata.eligibility} onChange={handleChange}/><br></br>

        <label>Application Link:</label><br></br>
        <input type='text' id='applicationlink' placeholder='Application Link' name='link' value={formdata.link} onChange={handleChange}/><br></br>


        <button type='submit' id='post'>Post</button>

        </form>
    </div>
    </div>
  )
}
