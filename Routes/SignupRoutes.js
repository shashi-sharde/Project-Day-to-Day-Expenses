const path = require('path')
const User = require('../Models/Userdetails')



const userController = require('../Controllers/Usercontrol')

const express = require('express')
const router = express.Router();

router.get('/users/signup', userController.signUpData)
router.post('/users/signup', userController.signUp)

module.exports = router