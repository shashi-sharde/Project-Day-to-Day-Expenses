const path = require('path')
const User = require('../Models/Userdetails')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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








exports.loginData= (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../', 'views', 'Login.html' ))
}

function generateAccessToken(id, username,isPremiumUser){
    return jwt.sign({ userId : id , username : username, isPremiumUser}, 'secret')
}

exports.login =async(req,res,next)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findAll({where:{email}})

        

        if(user.length > 0){

            bcrypt.compare(password, user[0].password, (err, result) =>{
                if(err){
                    throw new error("Something went wrong!")
                }
                if(result === true){
                    res.status(201).json({message: 'Login Successful!', token : generateAccessToken(user[0].id ,  user[0].username, user[0].isPremiumUser) })
                    
                }else{
                    return res.status(401).json({message :'Wrong Password' })
                }

            })      
        }
        else{
              return res.status(207).json({message: 'User not found!'})
        }
    }catch(err){
        res.status(500).json({err:err})
    }
}
