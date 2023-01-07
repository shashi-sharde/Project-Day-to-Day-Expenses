const path = require('path')
const User = require('../Models/Userdetails')

exports.signUpData =  (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'SignUp.html'));
  }

exports.loginData= (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../', 'views', 'Login.html' ))
}


exports.signUp = async(req, res, next)=>{
    console.log('Ready To Signup')
        try{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password

        if (username == undefined || username.length === 0 || email.length === 0 || email == null || password.length === 0 || password ==null){
            return res.status(400).json({err: 'Bad Parameters . Something is missing.'})
        }

        await User.create({
            username: username,
            email: email,
            password: password
        })
            
            res.status(201).json({message: "User Created Successfully!"})
            
        }catch(error){
            console.log(error)
            res.status(500).json({error: error})
        }   
}

exports.login =async(req,res,next)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findAll({where:{email}})

        

        if(user.length > 0){
            if(user[0].password === password){
                res.status(201).json({message: 'Login Successful!'})
            }else{
                res.status(401).json({message :'Wrong Password'})
            }
            
        }
        else{
            res.status(207).json({message: 'User not found'})
        }
    }catch(err){
        res.status(450).json({err:err})
    }
}