const path = require('path')
const User = require('../Models/Userdetails')
const bcrypt = require('bcrypt')

exports.signUpData =  (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'SignUp.html'));
  }

  
exports.signUp = async(req, res, next)=>{
console.log('Ready To Signup')
    try{
    const {username, email, password} =req.body

    if (username == undefined || username.length === 0 || email.length === 0 || email == null || password.length === 0 || password ==null){
        return res.status(400).json({err: 'Bad Parameters . Something is missing.'})
    }
    const saltround = 10
    bcrypt.hash(password, saltround, async(err, hash)=>{
        await User.create({username,email, password:hash})
            
        res.status(201).json({message: "User Created Successfully!"})
        
    })

        }catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }   
}