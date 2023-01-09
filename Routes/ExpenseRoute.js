const path = require('path');
const User = require('../Models/ExpenseDetails');

const expenseController = require('../Controllers/ExpenseControl');

const Userauthentication = require('../Middleware/auth')

const express = require('express');
const router = express.Router();



router.get('/users/login/expense', expenseController.getExpense)

router.get('/users/login/get-expense',Userauthentication.authenticate,  expenseController.getExpenses);

router.post('/users/login/add-expense', Userauthentication.authenticate,expenseController.postAddExpenses);

router.delete('/users/login/delete-expense/:expenseId', expenseController.deleteExpense);


module.exports = router;