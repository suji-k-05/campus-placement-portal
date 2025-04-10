import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';  // Import XLSX for Excel Download
import './Admin.css';

export default function Admin() {
  const [detail, setDetail] = useState([]);
  const [studata, setStudata] = useState('');
  const navigate = useNavigate();
  const originalData = useRef([]); // Store full student data

  useEffect(() => {
    axios.get('http://localhost:3002/register/getdetails')
      .then(res => {
        setDetail(res.data); // Store in state
        originalData.current = res.data; // Store original full data
      })
      .catch(err => console.log(err));
  }, []);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 🔍 Search Students
  const handleSearch = () => {
    const queries = studata?.toLowerCase().trim().split(" ") || []; // Split input by space
  
    const filteredData = originalData.current.filter(student => {
      return queries.every(query => {  // Check all queries
        return (
          student.firstname.toLowerCase().includes(query) ||
          student.lastname.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.skills.some(skill => skill.toLowerCase().includes(query)) ||
          (!isNaN(query) && parseFloat(student.cgpa) >= parseFloat(query)) ||  // CGPA filter
          student.mobilenumber.toString().includes(query) // ✅ Convert to string before using includes()
        );
      });
    });
  
    setDetail(filteredData);
  };
  
  

  // 🗑 Delete Student
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/register/delete/${id}`)
      .then(res => {
        alert('Deleted Successfully');
        setDetail(prev => prev.filter(item => item._id !== id));
      })
      .catch(err => console.log(err));
  };

  // ✏ Edit Student
  const handleEdit = (data) => {
    navigate(`/updateform/${data._id}`);
  };

  // 📥 Download Excel
  const handleDownloadExcel = () => {
    if (detail.length === 0) {
      alert("No data to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(detail.map(student => ({
      Name: student.firstname + " " + student.lastname,
      Email: student.email,
      Skills: student.skills.join(', '),
      CGPA: student.cgpa,
      mobilenumber: student.mobilenumber
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "Student_Details.xlsx");
  };

  return (
    <div>
      {/* 🚀 Admin Navigation */}
      <nav className='adminnav'>
        <h2 className='admintxt'>Admin Page</h2>
        <NavLink to='/admindashboard'>Students Dashboard</NavLink>
        <NavLink to='/admincompany'>Company</NavLink>
      </nav>

      {/* 🔍 Search + 📥 Download */}
      <div id='search'>
        <input 
          type='search' 
          id='studentssearch' 
          placeholder='Search Students...' 
          ref={inputRef}  
          value={studata} 
          onChange={(e) => setStudata(e.target.value)} 
        />
        <button id='search-btn' onClick={handleSearch}>Search</button>
      </div>

      {/* 📋 Student List */}
      {detail.map(x => (
        <div className='firstname' key={x._id}>
          <h3 className='sname'>{x.firstname} {x.lastname}</h3>
          <div className='admin-btns'>
            <button className='admin-btn' onClick={() => handleEdit(x)}>Update</button>
            <button className='admin-btn' onClick={() => handleDelete(x._id)}>Delete</button>
            <button className='admin-btn' onClick={() => navigate(`/details/${x._id}`)}>View</button>
          </div>
        </div>
      ))}

      <div id='download-section'>
        <button className='admin-btn' onClick={handleDownloadExcel}>
          Download
        </button>
      </div>
    </div>
  );
}
