const users=require('../models/users')
const userServices=require('../services/user.services')
const {validationResult}=require('express-validator')

module.exports.registerUser=async(req,res,next)=>{
const errors=validationResult(req)
validationResult(req) //request par run hui validations ke errors collect karke ek Result object return karta hai.

if(!errors.isEmpty()){
    return res.status(400).json({
        errors:errors.array()
    })
}
const { FullName, email, password } = req.body;
const { FirstName, LastName } = FullName;
const hashedPassword=await users.hashPassword(password)

const user=await userServices.createUser({
    FirstName,
    LastName,
    email,
    password:hashedPassword
})

const token =user.generateAuthToken();
res.status(201).json({token,user});
}
