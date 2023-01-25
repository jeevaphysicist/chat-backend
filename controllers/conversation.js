const conversation = require('../models/conversationModels');
const messager = require('../models/messagerModel');

exports.addmessages = (req,res)=>{
    const {userid_1,userid_2,text} = req.body;
    let filter ={$or: [{userFriends:[userid_1,userid_2]},{userFriends:[userid_2,userid_1]}]} ;

    messager.find(filter).then(result=>{
        if(result.length > 0){
            let data = {
                sender_id:userid_1,
                conversation_id:result[0].conversation_id,
                text:text
             };
            //  console.log(data);
            conversation.create(data).then(result=>{
                res.status(201).json({
                    message:"API  is connected successfuly",
                   data:result
                })
            })
            .catch(err=>{
                res.status(505).json({
                    message:"something wemt wrong",
                    error:err
                })
            });

        }
    })
    .catch(err=>{
        res.status(505).json({
            message:"Something went wrong in database",
            Error:err
        })
    })
   
}

exports.getmessages = (req,res)=>{
    let {userid_1,userid_2} = req.body;
    let filter ={$or: [{userFriends:[userid_1,userid_2]},{userFriends:[userid_2,userid_1]}]} ;
      messager.find(filter).then(result=>{
        if(result.length > 0){
            let filter = {conversation_id: result[0].conversation_id}
            conversation.find(filter).then(result=>{
               res.status(201).json({
                   message:"API is connected successfully",
                   data:result
               })
        
            })
            .catch(err=>{
               res.status(505).json({
                   message:"something went wrong in database",
                   error:err
               })
            })

        }
      })
      .catch(err=>{
        res.status(505).json({
            message:"something went wrong in database",
            error:err
        })
      })
   
}