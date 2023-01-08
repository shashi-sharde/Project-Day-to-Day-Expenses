const path = require('path');

const userController = require('../Controllers/userDetails');


const express = require('express')

const router = express.Router();

router.get('/users/login', userController.loginData);
router.post('/users/login',userController.login);

module.exports = router