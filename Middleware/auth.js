const jwt = require('jsonwebtoken');
const User = require('../Models/Userdetails');


const authenticate = (req, res, next) =>{
    try{
        const token = req.header('Authorization');
    console.log(token);
    const user = jwt.verify(token,'secret');
    console.log('----------------------------------------------',user.userId)
    User.findByPk(user.userId).then( user =>{
        console.log('user',user)
        req.user = user;
        next();
    }).catch(err =>{
        throw new Error(err)
    })

    }catch(err){
        console.log(err);
       return  res.status(500).json({success:false})
    }
}

module.exports = {authenticate }