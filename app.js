const path = require('path') //invoking the path
const express = require('express') // invoking Express Module
const bodyParser = require('body-parser') 


//Envoking All the routers to the application
const sequelize = require('./utill/database')
const signupRoute = require('./Routes/SignupRoutes')
const loginRoute = require('./Routes/LoginRoutes');
const expenseRoute = require('./Routes/ExpenseRoute');
const purchaseRoute = require('./Routes/Purchase');
const premiumfeatureRoute = require('./Routes/leaderboardRoute')


const cors = require('cors') // Used for the cross origin platform 
// Envoking all the  Models database table 
const Expense = require('./Models/ExpenseDetails')
const User = require('./Models/Userdetails')
const Order = require('./Models/orders')


//Crating Express Application
const app = express()

//Making all the application request as Json 
app.use(express.json())
app.use(cors())

// Using all the routers
app.use(signupRoute);
app.use(loginRoute);
app.use(expenseRoute)
app.use('/purchase',purchaseRoute);
app.use('/premium',premiumfeatureRoute)

//Defining Relationship Between the User and Expense Table
User.hasMany(Expense);
Expense.belongsTo(User)

//Defigning Relationship Between The User and Order
User.hasMany(Order);
Order.belongsTo(User)


// Execution of server Using sequelize and server port
sequelize.sync({force:false}).then(result =>{
    console.log('Server started at 3000');
    app.listen(3000); 
}).catch(err=>{
    console.log(err);
}); 