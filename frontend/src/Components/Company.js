import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Companyform from './Companyform'
import axios from 'axios'
import './Company.css'

export default function Hello() {
    const[popup,setPopup]=useState(false)
    const[data,setData]=useState([])
    function handleAdd(){
        setPopup(true)
    }

    useEffect(()=>{
      axios.get('http://localhost:3002/company/getcmpny')
      .then(res=>setData(res.data))
      .catch(err=>console.log(err))
    },[])

    function handleDelete(id) {
      console.log("Attempting to delete company with ID:", id);
  
      axios.delete(`http://localhost:3002/company/deletecmpny/${id}`)
          .then(res => {
              console.log(res.data.message); // Log success response
              alert('Deleted Successfully');
  
              // Remove deleted company from UI
              setData(prev => prev.filter(company => company._id !== id));
          })
          .catch(err => {
              console.error("Error deleting:", err);
              alert("Delete failed. Check console for details.");
          });
  }
  
    
  return (
    <div>

          <nav className='adminnav'>
            <NavLink to='/admindashboard'>Students Dashord</NavLink>
            <NavLink to='/admincompany'>Company</NavLink>
          </nav>
          <button id='cmpny-btn' onClick={handleAdd}>Add Company</button>       {/* Index.css */}

          {popup && <Companyform setpopup={setPopup}/>}


          <div className="cmpnyinfo">
            
            {data.map((x) => (
              <div className="cmpnybar neon-glow" key={x.id}>
                <div className="cmpncontent">
                  <h2 className="cmpnytitle">{x.name}</h2>
                  <p className="cmpnydesc">{x.desc}</p>
                  <ul className="cmpnydetails">
                    <li>📅 <strong>{x.date}</strong></li>
                    <li>🌍 <strong>{x.mode}</strong></li>
                    <li>📍 <strong>{x.venue}</strong></li>
                  </ul>
                  <h3 className="eligibility">Eligibility:</h3>
                  <p className="cmpnydesc">{x.eligibility}</p>
                  <button className='application-btn'><a href={x.link} className='apply-link' target='blank'>Apply</a></button><br></br>
                  <button className="delete-button" onClick={()=>handleDelete(x._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          </div>
)}