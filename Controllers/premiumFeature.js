
const Expense = require('../Models/ExpenseDetails');
const User = require('../Models/Userdetails');
const sequelize = require('../utill/database');

 exports.getPremiumLeaderBoard = async (req, res, next)=>{

    try{
       
        
            const leaderboardofUsers = await User.findAll({
                attributes:['id', 'username',[sequelize.fn('sum', sequelize.col('expenses.MoneySpent')), 'TotalCost']],
                include:[
                    {
                        model:Expense,
                        attributes:[]
                    }
                ],
                group:['user.id'],
                order:[['TotalCost', 'DESC']]
            })
            res.status(201).json(leaderboardofUsers);

        
        
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
 }