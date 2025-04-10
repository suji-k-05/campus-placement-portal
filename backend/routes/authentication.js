var express = require('express');
var router = express.Router();
const bcrypt=require('bcryptjs')
var AuthenticationModel=require('../models/AuthenticationModel')

router.post('/signup', async (req, res)=>{
  try{
    const {username,email,password}=req.body

    const mailFounder=await AuthenticationModel.findOne({email})       //Searching the Email
        if(mailFounder){
            return res.status(409).json({message:'Email Already Registerd'})   
        }

  const hashedPassword=await bcrypt.hash(password,10)
  
  let AuthDetails=new AuthenticationModel({
    username,email,password:hashedPassword
  })
  await AuthDetails.save()
  .then(resp=>res.status(200).json({message:"Signup Successful"}))
  .catch(err=>res.status(500).json({message:err}))
  }
  catch(err){
    res.status(500).json({message:err})
  }
})




router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body
    let user=await AuthenticationModel.findOne({email})

    if(!user)
      {
          return res.status(404).json({message:"User Not Found"})
      }
     
    let isMatched=await bcrypt.compare(password,user.password)
    if(!isMatched)
      {
          return res.status(404).json({message:"Password in correct"})
      }

      res.status(200).json({message:"Login Successful",email:user.email})
    }
    catch(err){
        res.status(500).json({message:"Server Error",err})
    }
})





                      //For Normal Signup

// router.post('/signup',async(req,res)=>{
  
// const {username,email,password}=req.body

// const hashedPassword=await bcrypt.hash(password,10)

// let AuthDetails=new AuthenticationModel({
//   username,email,password:hashedPassword
// })
// await AuthDetails.save()
// .then(resp=>res.status(200).json({message:"Signup Successful"}))
// .catch(err=>res.status(500).json({message:err}))

// })



module.exports = router;
