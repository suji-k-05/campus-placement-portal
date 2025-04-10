const mongoose=require('mongoose')
// const AuthSchema=new mongoose.Schema({
//     username:String,
//     email:String,
//     registartionnumber:Number,
//     password:String
// },{timestamps:true})
const AuthSchema=new mongoose.Schema({
    username:String,
    email:{type:String,unique:true},
    password:String,
},{timestamps:true}
)


const AuthenticationModel=mongoose.model('authentications',AuthSchema)
module.exports=AuthenticationModel