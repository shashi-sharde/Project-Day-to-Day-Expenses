const path = require('path');
const User = require('../Models/ExpenseDetails');

const expenseController = require('../Controllers/ExpenseControl');

const express = require('express');
const router = express.Router();

//router.post('/', expenseController.postExpense)

router.get('/users/login/add-user', expenseController.getExpense)

router.get('/users/login/get-user', expenseController.getExpenses);

router.post('/users/login/add-user', expenseController.postAddExpenses);

router.delete('/users/login/delete-user/:userId', expenseController.deleteExpense);


module.exports = router;