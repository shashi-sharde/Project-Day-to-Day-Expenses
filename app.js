const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./utill/database')
const userRoute = require('./Routes/SignupRoutes')


const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRoute)

sequelize.sync().then(result =>{
    console.log('Server started at 3000');
    app.listen(3000); 
}).catch(err=>{
    console.log(err);
}); 