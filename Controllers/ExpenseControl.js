const path = require('path')
const Expense = require('../Models/ExpenseDetails')

exports.getExpense =  (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'Expense.html'));
  }


  exports.postAddExpenses = async(req, res, next) => {
    console.log('Adding an Expense');
    try{
      
      const { MoneySpent, Description, Categories } = req.body;
  
      if(!Categories){
        throw new Error('please select categories!');
      }
  
      const data = await Expense.create({ MoneySpent, Description, Categories, userId: req.user.id})
      res.status(201).json({newExpenseDetails: data});
    }
    catch(error){
      console.log(error);
      res.status(500).json({error:error});
    }
  }
   
  exports.getExpenses = async (req,res,next)=>{
      console.log("Getting Expenses");
  
      try{
        
       const data =  await Expense.findAll({where: {userId: req.user.id}})
       res.status(201).json(data);
      }
      catch(error) {
        console.log(error);
        res.status(500).json({error:error});
      }
      
     
  }
  
 
  
  
  exports.deleteExpense = async (req,res,next)=>{
    
    try{
      let expenseId = req.params.expenseId;
      if(!expenseId){
        res.status(400).json({error:'id missing'});
      }
      await Expense.destroy({where:{id:expenseId}});
      res.sendStatus(200);
      
    }
    catch(error){
      console.log(error);
      res.status(500).json('error occured');
    };
  
  
  
  }