const mongoose = require('mongoose');
const messageSchema  = mongoose.Schema({
    userFriends:{
        type:Array,
        required:true
    },
    conversation_id:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model("messager",messageSchema,"userFriends");
