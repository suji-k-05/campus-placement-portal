import React, { useState } from 'react'
import './Registeration.css'
import axios from 'axios'
export default function Registration() {

  const [registrationformdata,setRegistrationformdata]=useState({
    firstname:'',
    lastname:'',
    mobilenumber:'',
    alternativenumber:'',
    dateofbirth:'',
    email:'',
    gender:'',
    github:'',
    collegename:'',
    linkedin:'',
    degree:'',
    course:'',
    cgpa:'',
    address:'',
    skills:[],
    interest:'',
    language:[],
    Projects:[],
    Internship:[]
    
  })

  const[deglist,setDeglist]=useState(['B.E','B.Sc','B.Tech'])
  const[course,setcourse]=useState(['Computer Science and Engineering','Electronics and Communication Engineering','Mechanical Engineering','Civil Engineering'])
  const[prgmlng,setprgmlng]=useState(['Java','Python','C','C++','C#','JavaScript','PHP','Ruby','Flutter','Dart','.NET'])
  const[lang,setLang]=useState(['English','Tamil','Hindi'])   
  // const today = new Date().toISOString().split('T')[0]; //Current date

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'skills') {
        setRegistrationformdata((prev) => ({
          ...prev,
          skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value)
        }));
      } else if (name === 'language') {
        setRegistrationformdata((prev) => ({
          ...prev,
          language: checked ? [...prev.language, value] : prev.language.filter((lang) => lang !== value)
        }));
      }
    } else {
      setRegistrationformdata({ ...registrationformdata, [name]: value });
    }
  }

  function addProject() {
    setRegistrationformdata((prev) => ({
      ...prev,
      Projects: [...prev.Projects, ""],
    }));
  }

  function updateProject(index, value) {
    const updatedProjects = [...registrationformdata.Projects];
    updatedProjects[index] = value;
    setRegistrationformdata((prev) => ({ ...prev, Projects: updatedProjects }));
  }

  function removeProject(index) {
    const updatedProjects = registrationformdata.Projects.filter(
      (_, i) => i !== index
    );
    setRegistrationformdata((prev) => ({ ...prev, Projects: updatedProjects }));
  }

  function addInternship() {
    setRegistrationformdata((prev) => ({
      ...prev,
      Internship: [...prev.Internship, ""],
    }));
  }

  function updateInternship(index, value) {
    const updatedInternship = [...registrationformdata.Internship];
    updatedInternship[index] = value;
    setRegistrationformdata((prev) => ({
      ...prev,
      Internship: updatedInternship,
    }));
  }

  function removeInternship(index) {
    const updatedInternship = registrationformdata.Internship.filter(
      (_, i) => i !== index
    );
    setRegistrationformdata((prev) => ({
      ...prev,
      Internship: updatedInternship,
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();

    console.log("🔼 Sending Data to Backend:", registrationformdata);
    axios.post('http://localhost:3002/register/register', registrationformdata)
    .then(() => {
      alert('Registered Successfully');
      setRegistrationformdata(prev => ({
        ...prev,
        firstname: '',
        lastname: '',
        mobilenumber: '',
        alternativenumber: '',
        dateofbirth: '',
        email: '',
        gender: '',
        github: '',
        collegename: '',
        linkedin: '',
        degree: '',
        course: '',
        cgpa: '',
        address: '',
        skills: [],
        interest: '',
        language: [],
        Projects:[],
        Internship:[]
      }));
    }) 
    .catch(err => console.log(err));
}


  return (
    <div className='container2'>


    <h4 className='head'>Registration Form</h4>

    <form className='register' onSubmit={handleSubmit}>
    <h2>Personal Info</h2>
    <label htmlFor='name'>Name :</label>
    <label htmlFor='number' id='num'>Mobile Number :</label><br></br> 
    <input type='text' required name='firstname' placeholder='First Name' id='name' onChange={handleChange} /> 
    <input type='number' required name='mobilenumber' id='number' placeholder='Mobile Number' onChange={handleChange}/> <br></br>
    <input type='text' required name='lastname' placeholder='Last Name' id='lname' onChange={handleChange}/>
    <input type='number' required name='alternativenumber' placeholder='Alternative Mobile Number' id='anum' onChange={handleChange}/><br></br>

    <label htmlFor='dob'>Date of birth :</label>
    <label htmlFor='email' id='mail'>Email Address:</label> <br></br>
    <input type='text' required name='dateofbirth' id='dob' placeholder='DD/MM/YYYY' onChange={handleChange}/>
    <input type='email' required name='email' placeholder='Email Address' id='email' onChange={handleChange}/><br></br>   

    <label htmlFor='gender'>Gender :</label> 
    <label htmlFor='github' id='git'>GitHub Link :</label><br></br>
    <label htmlFor='male'>Male</label><input type='radio' id='male' required name='gender' value='Male' onChange={handleChange}/>
    <label htmlFor='female' id='femalel'>Female</label><input type='radio' id='female' required name='gender'value='Female' onChange={handleChange}/>
    <input type='text' required name='github' id='github' placeholder='GitHub Link' onChange={handleChange}/><br></br>

    <label htmlFor='clg'>Name of the College :</label>
    <label htmlFor='linkedin' id='link'>Linkedin Link :</label><br></br>
    <input type='text' required name='collegename' placeholder='College Name' id='clg' onChange={handleChange}/>
    <input type='text' required name='linkedin' placeholder='Linkedin Link' id='linkedin' onChange={handleChange}/><br></br>

    <label htmlFor='deg'>Degree :</label>
    <label htmlFor='course' id='cour'>Branch:</label><br></br>
    <select id='deg' required name='degree' value={registrationformdata.degree} onChange={handleChange}> 
    <option value="">Select Degree</option>
       {deglist.map(x=><option value={x}>{x}</option>)}
    </select>

    <select id='course' required name='course' value={registrationformdata.course} onChange={handleChange}>
    <option value="">Select Branch</option>
        {course.map(x=><option value={x}>{x}</option>)}
    </select><br></br>


    <label htmlFor='cgpa'>Cumulative Grade Point Average : (CGPA)</label><br></br>
    <input type='number'  step="0.01" required name='cgpa' placeholder='Overall CGPA' id='cgpa' onChange={handleChange}/><br></br>

   {/* <label htmlFor='twelveschool'>12th School:</label><br></br>
    <input type='text' required name='twelveschool' placeholder='twelveschool' id='twelveschool' onChange={handleChange}/><br></br>

    <label htmlFor='twelve'>12th mark : </label><br></br>
    <input type='number'  step="1" required name='twelve' placeholder='12th Mark' id='twelve' onChange={handleChange}/><br></br>*/}


    <label htmlFor='address' id='addr'>Address :</label><br></br>
    <textarea id='address' required name='address' placeholder='Address' onChange={handleChange}></textarea><br></br>


    <h2>Technical Skills</h2>

    <label>Programming Languages Known :</label>
    {prgmlng.map(skills => (<div> <label> <input type="checkbox"  name='skills' id='skills' value={skills} onChange={handleChange}/> {skills} </label> </div>))}

    <label htmlFor='interest'>Area of Interest:</label><br></br>
    <input type='text' required name='interest' placeholder='Area of Interest' id='interest' onChange={handleChange}/><br></br>

    <h2>Projects</h2>
        {registrationformdata.Projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              value={project}
              onChange={(e) => updateProject(index, e.target.value)}
              placeholder="Enter Project Name"
            />
            <button type="button" onClick={() => removeProject(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addProject}>
          Add Project
        </button>

        <h2>Internships</h2>
        {registrationformdata.Internship.map((intern, index) => (
          <div key={index}>
            <input
              type="text"
              value={intern}
              onChange={(e) => updateInternship(index, e.target.value)}
              placeholder="Enter Internship Details"
            />
            <button type="button" onClick={() => removeInternship(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addInternship}>
          Add Internship
        </button><br></br>


   {/* <label htmlFor='certifications' id='certifications'>certifications :</label><br></br>
    <textarea id='certifications' required name='certifications' placeholder='certifications' onChange={handleChange}></textarea><br></br>*/}

    <label>Languages Known:</label><br></br>
    {lang.map(language=><div><label><input type='checkbox'  name='language' id='language' value={language} onChange={handleChange}/>{language}</label></div>)}

    <button type='submit' id='applybtn'>Apply</button>

    </form>

    </div>

  )
}