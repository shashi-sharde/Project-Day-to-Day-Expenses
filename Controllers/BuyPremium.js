const Razorpay  = require('razorpay'); //Envoking the Razorpay Library 
const Order = require('../Models/orders') // Envoking the Orders Model 
const  userController = require('./Usercontrol');
const jwt = require('jsonwebtoken')

function generateAccessToken(id, username,isPremiumUser){
    return jwt.sign({ userId : id , username : username, isPremiumUser}, 'secret')
}
//


// Creating the backend for the Razorpay integration.
// Means what happens when user clicks on the Buy Premium Button 
const buyPremium = async (req, res,next) => { //  taking an Async Function
    try{
//Creating the Razor pay object and invoking the generated key id and Secret key given by razor pay so when it gets clicked
// So that Razorpay knows for which company is making request 
        var rzp = new Razorpay ({                
            key_id:'rzp_test_iS08Qma4gfjRdo',
            key_secret:'fH0Nk6T2c4MzZE651RDX58B7'
        })
        const amount = 2500; // Now giving the amount for the order
        rzp.orders.create({ amount, currency:'INR'}, (err, order) =>{ // At this poins we are creating the order and it gets created at 
     //razorpay as when frontend sends the order id and key id it knows  it knows the price and currency
            if(err){
                throw new Error(JSON.stringify(err));
            }
            //At this point order is getting created when buyPremium Button gets clicked and it sends the order id and key id
            req.user.createOrder({ orderid: order.id,status: 'PENDING'}).then(() =>{
                return res.status(201).json({ order, key_id : rzp.key_id});
            }).catch(err =>{
                throw new Error(err)
            })
        })
    }catch(err){
        console.log(err);
        res.status(403).json({message: "Something Went Wrong", error:err})

    }
}

//After the payment gets completed and if it is successfull this function gets hit.

const updateTransactionStatus = async (req, res, next ) => {
    try {
        // storing the id from user table
        const userId = req.user.id; 
        // taking the details of payment id and order id
        const { payment_id, order_id} = req.body; 
         // finding the order using order id 
        const order  = await Order.findOne({where : {orderid : order_id}})

        if(payment_id == null){
            const promise1 = order.update({ status: 'FAILED'});
            const promise2 =  req.user.update({ isPremiumUser: false }) 
            Promise.all([promise1, promise2]).then(()=> {
                return res.status(407).json({sucess: false, message: "Transaction Failed", token: generateAccessToken(userId, undefined , false)});
            }).catch((error ) => {
                throw new Error(error)
            })
    
            
        }
        else{
            //updating the payment id and status only after the payment is successfull 
        const promise3 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 

        // Upon successfull payment and status is updated ,updating the user table as user is premium or not 
        const promise4 =  req.user.update({ isPremiumUser: true }) 
        


        // Now setting the promise and sending the satus as on which user above promises will be applied.
        Promise.all([promise3, promise4]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful", token: generateAccessToken(userId, undefined , true) });
        }).catch((error ) => {
            throw new Error(error)
        })

        }

        

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: err, message: 'Sometghing went wrong' })

    }
}


//exporting the the both functions.
module.exports ={ buyPremium, updateTransactionStatus};