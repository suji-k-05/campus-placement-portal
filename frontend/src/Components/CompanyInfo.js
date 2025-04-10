import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CompanyInfo.css'

export default function CompanyInfo() {

  const[data,setData]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:3002/company/getcmpny')
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  },[])

  return (
<div>
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
                </div>
              </div>
            ))}
          </div>
</div>


  )
}
