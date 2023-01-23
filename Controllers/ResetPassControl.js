const path = require('path')

const bcrypt =require('bcrypt')
const sendGrid = require('@sendgrid/mail');
const uuid = require('uuid')

const User = require('../Models/Userdetails');
const Forgotpassword  = require('../Models/forgotpasword');
require('dotenv').config();

//const Api = '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'


exports.fogetpassDetails =  (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'ResetPass.html'));
}

exports.forgotpassword = async (req, res,next)=>{
    try{
        const { email } = req.body;
    const user = await User.findOne({where : { email }});
    if(user){
        const id = uuid.v4();
        user.createForgotpassword ({id, active:true})
        .catch(err =>{
            throw new Error(err)
        })
        sendGrid.setApiKey(process.env.SENGRID_API_KEY)

        const msg = {
            to: email,
            from: 'shashisharde@gmail.com',
            subject:'Reset PassWord',
            text:'Resetting the password , email sent from Shashi Domain',
            html: `<a href="54.178.119.246:3000/password/resetpassword/${id}">Reset password</a>`
        }
        console.log(msg)
        sendGrid.send(msg).then((response)=>{
            return res.status(response[0].statusCode).json({message: 'Link Sent To Your Mail For Resetting The PassWord', success:true})
        }).catch((err) =>{
            throw new Error(err)
        })
    }else{
        throw new Error('User Doesnt Exist ')
    }
    }catch(err){
        console.log(err)
       return res.json({message : err, success:false})
    }
}

exports.resetpassword = async(req,res,next) =>{
    
    const id = req.params.id;
    Forgotpassword.findOne({ where: { id }}).then(forgotpasswordrequest =>{
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                    function formsubmitted(e){
                                        e.preventDefault();
                                        console.log('called)
                                    }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="GET">
                                    <lable for="newpassword"> Enter New PassWord</lable>
                                    <input name="newpassword" type="password" required></input>
                                    <button>Reset PassWord</button>
                                    </form>

                                </html>`
                            )
            res.end()
        }
    })
}

exports.updatepassword = async (req, res, next)=>{
    try{
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne( {where :{ id: resetpasswordid }}).then(resetpasswordrequest =>{
        User.findOne( { where : {id : resetpasswordrequest.userId}}).then(user =>{
            if(user){
                const saltround = 10;
                bcrypt.genSalt(saltround, function(err, salt){
                    if(err){
                        console.log(err)
                        throw new Error(err)
                    }
                    bcrypt.hash(newpassword, salt, function(err, hash){
                        if(err){
                            console.log(err)
                            throw new Error(err)    
                        }
                        user.update({password:hash}).then(()=>{
                            res.status(201).json({message: 'Successfuly update the new password'})
                        })

                    })
                })
            }else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
        })
    })


    }catch(err){
        return res.status(403).json({ error, success: false } )
    }
    
}