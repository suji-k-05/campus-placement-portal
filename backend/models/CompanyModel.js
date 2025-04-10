const mongoose=require('mongoose')
const CompanySchema = mongoose.Schema({
                name:String,
                desc:String,
                date:String,
                mode:String,
                venue:String,
                eligibility:String,
                link:String
})

const CompanyModel=new mongoose.model('company',CompanySchema)
module.exports=CompanyModel