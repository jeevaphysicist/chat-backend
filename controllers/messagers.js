const messager = require('../models/messagerModel');
const shortid = require('shortid');

exports.addusers = (req,res)=>{
      let {userid_1,userid_2} = req.body;
      
      let filter ={$or: [{userFriends:[userid_1,userid_2]},{userFriends:[userid_2,userid_1]}]} ;
    //   console.log("filter",filter);
      messager.find(filter).then(result=>{
        if(result.length < 1){
            let conversation_id = shortid.generate();
            
            let data = {
                userFriends:[userid_1,userid_2],
                conversation_id : conversation_id
            }
            messager.create(data).then(result=>{
                res.status(201).json({
                    message:"API is connected successfully",
                    data:result
                })

            })
            .catch(err=>{
                res.status(500).json({
                    message:"something went wrong in database",
                    error:err
                })
            })

        }
        else{
            console.log("result : ",result[0].conversation_id);
            res.status(200).json({
                message:"Already conversation ID is generated"
            })
           
           

        }
      })
      .catch(err=>{
        res.status(500).json({
            message:"error in database",
            error:err
        })

      })
}

exports.getallconversation_id = (req,res)=>{
    messager.find().then(result=>{
        res.status(200).json({
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