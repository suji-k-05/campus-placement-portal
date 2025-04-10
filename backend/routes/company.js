var express=require('express')
var router=express.Router()
var CompanyModel=require('../models/CompanyModel')

router.post('/postcmpny',(req,res)=>{
    const{name,desc,date,mode,venue,eligibility,link}=req.body

    let Company=new CompanyModel({
        name,desc,date,mode,venue,eligibility,link
    })

    Company.save()
  .then(resp=>res.status(200).json({message:"Posted Successfully"}))
  .catch(err=>res.status(500).json({message:err}))
})

router.get('/getcmpny',(req,res)=>{
  CompanyModel.find()
  .then(resp=>res.send(resp))
})


router.delete('/deletecmpny/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedCompany = await CompanyModel.findByIdAndDelete(id);

      if (!deletedCompany) {
          return res.status(404).json({ message: "Company not found" });
      }

      res.status(200).json({ message: "Deleted Successfully", deletedCompany });
  } catch (err) {
      console.error("Delete Error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports=router