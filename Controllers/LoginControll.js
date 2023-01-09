const path = require('path')
const User = require('../Models/Userdetails')
const bcrypt = require('bcrypt')




exports.loginData= (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../', 'views', 'Login.html' ))
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
                    res.status(201).json({message: 'Login Successful!' })
                    
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
