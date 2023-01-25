const path = require('path')
const Expense = require('../Models/ExpenseDetails')
const Downloadurl = require('../Models/downloadUrl')
const S3Services =require('../sevices/S3Services')
const UserServices = require('../sevices/UserServices')



exports.downloadexpense = async(req, res, next)=>{
  try{
    const expenses = await UserServices.getExpenses(req);
    console.log(expenses)
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id


    const filename = `expenses${userId}/${new Date}.csv`
    const fileURl = await S3Services.uploadtoS3(stringifiedExpenses,filename);
    const urldata = await req.user.createDownloadurl({
      filename:filename,
      fileurl:fileURl
    })

    

    res.status(201).json( {fileURl, urldata, success:true})
  } catch (err){
    console.log(err)
    res.status(500).json({fileURl : " ", success:false,err:err})
  }
  
}


 exports.getDownloadUrls = async (req,res,next)=>{
  try{
    const data = await Downloadurl.findAll({where: {userId: req.user.id}})
    console.log("dsahrjkrwhsakjhrekjwa" ,data)
    if(!data){
      return res.status(404).json({ message:'no urls found with this user' , success: false});
    }
  return  res.status(200).json({ data , success: true })
    

  
  }catch (err) {
    res.status(500).json({err:err})
}
  

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
        const isPremiumUser = req.user.isPremiumUser;

        // const data =  await Expense.findAll({where: {userId: req.user.id}})
        //     res.status(201).json(data);
      
        if(isPremiumUser === true){
          const data =  await Expense.findAll({where: {userId: req.user.id}})
            res.status(201).json({isPremiumUser:true, data:data});//isPremiumUser:true, data:data === data

        }
      
        else{
          
          const data =  await Expense.findAll({where: {userId: req.user.id}})
          
            res.status(201).json({isPremiumUser:false, data:data});
        

        }
          
        
       
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