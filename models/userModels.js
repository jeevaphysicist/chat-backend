const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    bioData:{
        type:String,
        required:true
    },
    addFriends:{
        type:Array,
        require:true
    }
});


module.exports = mongoose.model("users",usersSchema,"users");