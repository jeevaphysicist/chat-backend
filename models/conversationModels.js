const mongoose = require('mongoose');
const conversationSchema = mongoose.Schema({
    sender_id:{
            type:String,
            required:true
             },
   conversation_id:{
                type:String,
                required:true
                 }, 
     text:{
        type:String,
        required:true
          }                  
},
{ timestamps: true });

module.exports = mongoose.model("conversation",conversationSchema,"conversation");