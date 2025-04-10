const express = require("express");
const router = express.Router();
const RegisterModel = require("../models/RegisterModel");


router.post("/register", async (req, res) => {
  try {
    let details = new RegisterModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mobilenumber: Number(req.body.mobilenumber),
      alternativenumber: Number(req.body.alternativenumber),
      dateofbirth:req.body.dateofbirth,
      email: req.body.email,
      gender: req.body.gender,
      collegename: req.body.collegename,
      github: req.body.github,
      linkedin: req.body.linkedin,
      degree: req.body.degree,
      course: req.body.course,
      cgpa: parseFloat(req.body.cgpa),
      address: req.body.address,
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(","), // Convert to array
      interest: req.body.interest,
      language: Array.isArray(req.body.language) ? req.body.language : req.body.language.split(","),// Convert to array
      Projects:req.body.Projects,
      Internship:req.body.Internship,
      twelveschool:req.body.twelveschool,
      twelve:parseInt(req.body.twelve),
      certifications:req.body.certifications
      
    });


    const savedUser = await details.save();
    res.json({ message: "User registered successfully!", data: savedUser });


  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: err.message });
  }

});












router.get('/getdetails',(req,res)=>{
    RegisterModel.find()
    .then(resp=>res.send(resp))
    .catch(err=>res.send(err))
})

router.get('/getdetails/:id',(req,res)=>{
    RegisterModel.findById(req.params.id)
    .then(resp=>res.send(resp))
    .catch(err=>res.send(err))
})

router.put('/update/:id', (req, res) => {
    const IdQuery = req.params.id;
    RegisterModel.findByIdAndUpdate(IdQuery, req.body)
        .then(resp => res.send(resp))
        .catch(err => res.status(500).send(err));
});

router.delete('/delete/:id', (req, res) => {
  const IdQuery = req.params.id;
  RegisterModel.findByIdAndDelete(IdQuery)
  .then(resp => res.send({ message: "Deleted Successfully", resp }))
  .catch(err => res.status(500).send(err));
});


router.get('/register/getdetailsbyemail/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await RegisterModel.findOne({ email }); // Assuming you use MongoDB
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.put('/update/:id', async (req, res) => {
  try {
      const updatedUser = await RegisterModel.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body }, 
          { new: true, runValidators: true }
      );

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      res.json({ message: "Profile updated successfully!", data: updatedUser });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});






module.exports=router
