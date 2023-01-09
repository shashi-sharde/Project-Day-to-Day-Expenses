const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./utill/database')
const signupRoute = require('./Routes/SignupRoutes')
const loginRoute = require('./Routes/LoginRoutes');
const expenseRoute = require('./Routes/ExpenseRoute');


const cors = require('cors')
const Expense = require('./Models/ExpenseDetails')
const User = require('./Models/Userdetails')

const app = express()

app.use(express.json())
app.use(cors())

app.use(signupRoute);

app.use(loginRoute);
app.use(expenseRoute)

User.hasMany(Expense);
Expense.belongsTo(User)

sequelize.sync({force:false}).then(result =>{
    console.log('Server started at 3000');
    app.listen(3000); 
}).catch(err=>{
    console.log(err);
}); 