import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Updateform.css'

export default function Updatestudent() {
    const[data,setData]=useState({

    })
    const {uid}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
    axios.get(`http://localhost:3002/register/getdetails/${uid}`)
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
    },[])


    const [deglist, setDeglist] = useState(['B.E', 'B.Sc', 'B.Tech']);
    const [course, setcourse] = useState(['Computer Science and Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Civil Engineering']);
    const [prgmlng, setprgmlng] = useState(['Java', 'Python', 'C', 'C++', 'C#', 'JavaScript', 'PHP', 'Ruby', 'Flutter', 'Dart', '.NET']);
    const [lang, setLang] = useState(['English', 'Tamil', 'Hindi']);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'skills') {
                setData((prev) => ({
                    ...prev,
                    skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value)
                }));
            } else if (name === 'language') {
                setData((prev) => ({
                    ...prev,
                    language: checked ? [...prev.language, value] : prev.language.filter((lang) => lang !== value)
                }));
            }
        } else {
            setData({ ...data, [name]: value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("update data",data)
        axios.put(`http://localhost:3002/register/update/${data._id}`, data)
            .then(() => {
                alert('Updated Successfully');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function back(){
        navigate(-1)
    }

    return (
        <div className='container2'>
            <button className='back-btn' onClick={back}>Back</button>
    <h4 className='head'>Update {data.firstname}{data.lastname} details</h4>

    <form className='register' onSubmit={handleSubmit}>
        <h2>Personal Info</h2>

        <label htmlFor='firstname' >Name:</label>
        <label htmlFor='mobilenumber' id='num'>Mobile Number:</label><br></br>        
        <input type='text' id='name' name='firstname' value={data.firstname} onChange={handleChange} placeholder="Enter First Name" required />
        <input type='number' id='number' name='mobilenumber' value={data.mobilenumber} onChange={handleChange} placeholder="Enter Mobile Number" required /><br></br>
        <input type='text' id='lname' name='lastname' value={data.lastname} onChange={handleChange} placeholder="Enter Last Name" required />
        <input type='number' id='anum' name='alternativenumber' value={data.alternativenumber} onChange={handleChange} placeholder="Enter Alternative Number" /><br></br>

        <label htmlFor='dob'>Date of Birth:</label>
        <label htmlFor='email' id='mail'>Email Address:</label><br></br>
        <input type='text' id='dob' name='dateofbirth' value={data.dateofbirth} onChange={handleChange} required />
        <input type='email' id='email' name='email' value={data.email} onChange={handleChange} placeholder="Enter Email Address" required /><br></br>

        <label>Gender:</label>
        <label htmlFor='github' id='git'>GitHub Link:</label><br></br>
        <label htmlFor='male'>Male</label> <input type='radio' id='male' name='gender' value='Male' checked={data.gender === 'Male'} onChange={handleChange} required />
        <label htmlFor='female' id='femalel'>Female</label> <input type='radio' id='female' name='gender' value='Female' checked={data.gender === 'Female'} onChange={handleChange} required />
        <input type='text' id='github' name='github' value={data.github} onChange={handleChange} placeholder="Enter GitHub Profile" /><br></br>

        <label htmlFor='collegename'>Name of the College:</label>
        <label htmlFor='linkedin' id='link'>LinkedIn Link:</label><br></br>   
        <input type='text'  id='clg' name='collegename' value={data.collegename} onChange={handleChange} placeholder="Enter College Name" required />
        <input type='text' id='linkedin' name='linkedin' value={data.linkedin} onChange={handleChange} placeholder="Enter LinkedIn Profile" /><br></br>

        <label htmlFor='degree'>Degree:</label>
        <label htmlFor='course' id='cour'>Branch:</label><br></br>
        <select id='deg' name='degree' value={data.degree} onChange={handleChange} required>
            <option value="">Select Degree</option>
            {deglist.map(x => <option key={x} value={x}>{x}</option>)}
        </select>

        <select id='course' name='course' value={data.course} onChange={handleChange} required>
            <option value="">Select Branch</option>
            {course.map(x => <option key={x} value={x}>{x}</option>)}
        </select><br></br>

        <label htmlFor='cgpa'>Cumulative Grade Point Average : (CGPA)</label><br></br>
        <input type='number' id='cgpa' step="0.01" name='cgpa' value={data.cgpa} onChange={handleChange} placeholder="Enter CGPA" required /><br></br>

        <label htmlFor='address' id='addr'>Address:</label><br></br>
        <textarea id='address' name='address' value={data.address} onChange={handleChange} placeholder="Enter Address" required></textarea><br></br>

        <h2>Technical Skills</h2>

        <label>Programming Languages Known:</label>
        {prgmlng.map(skill => (
            <div key={skill}>
                <label>
                    <input type="checkbox" id={skill} name='skills' value={skill} checked={data.skills?.includes(skill)} onChange={handleChange} />
                    {skill}
                </label>
            </div>
        ))}

        <label htmlFor='interest'>Area of Interest:</label><br></br>
        <input type='text' id='interest' name='interest' value={data.interest} onChange={handleChange} placeholder="Enter Area of Interest" /><br></br>

        <label>Languages Known:</label>
        {lang.map(language => (
            <div key={language}>
                <label>
                    <input type='checkbox' id={language} name='language' value={language} checked={data.language?.includes(language)} onChange={handleChange} />
                    {language}
                </label>
            </div>
        ))}

        {/*<label htmlFor='resume'>Resume:</label>
        <input type='file' id='resume' name='resume' onChange={handleChange} />*/}

        <button type='submit' id='applybtn'>Update</button>
    </form>
</div>

    );
}
