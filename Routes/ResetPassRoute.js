const forgotPasswordController = require('../Controllers/ResetPassControl')
const express = require('express')

const router = express.Router()
router.get('/password/forgotpassword',forgotPasswordController.fogetpassDetails)

module.exports=router