const users = require("../models/userModels");
const shortid = require("shortid");

exports.addusers = (req,res)=>{
    const {userName,email,password,picture,dob, gender,bioData} = req.body;
    // console.log("req.body",req.body);
      const user_id = shortid.generate().toUpperCase();
    let filter= { $or: [{email:email},{user_id:user_id}]};
    users.find(filter).then(result=>{
        if(result.length < 1 ){          
            // console.log("test1");
           let userdata = {
                userName:userName,
                email:email,
                user_id:user_id,
                password:password,
                DOB:dob,
                gender:gender,
                bioData:bioData,
                picture:picture
               }
            
            users.create(userdata).then(results=>{
                res.status(201).json({
                    message : "API is successfully connected",
                    data:results
                })                   
                })
                .catch(err=>{
                    res.status(500).json({
                        message:"something went wrong",
                        error:err
                    })
        })

        }
        else{
            res.status(201).json({
                message:"Already exists"
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



// @POST method
// login controlls
exports.getusers = (req,res)=>{
     const {email,password} = req.body;
     let filter ={$and: [{email:email},{password:password}]};
     users.find(filter).then(result=>{
        if(result.length >0 ){
            res.status(201).json({
                message:"API is connected successfully",
                data:result
            })
        }
        else{
            res.status(201).json({
                message:"Not exist "
            })
        }
        
     })
     .catch(err=>{
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })

     })

}
// @GET METHOD
// current user 
exports.currentuser = (req,res)=>{
    const {user_id,email} = req.body;
    let filter ={user_id:user_id,email:email};
    // console.log("filter",filter);
    users.find(filter).then(result=>{
        res.status(201).json({
            message:"API is connected successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(505).json({
            message:"somethng went wrong in database",
            error:err
        })
    })
}

// @GET METHOD
// get all users
exports.users = (req,res)=>{
    const {message} = req.body
    users.find().then(result=>{
        res.status(200).json({
            message:"API is connected successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(505).json({
            message:"something wron in database",
            error:err
        })
    })
}

//@put method
// add friends

exports.addfriends = (req,res)=>{
    const {user_id,email,friend_id,friendName} = req.body;
    let query = {user_id:user_id,email:email};
    let data = {$push:{addFriends:{FriendID:friend_id,FriendName:friendName}}};
    // console.log("query = "+query);
    users.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"API is connected successfully",
            data:result
           });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database"
           });
    })
  
}

// @post method
// get friends

exports.getfriends=(req,res)=>{
    const {user_id} = req.body;
    // console.log('req.body',req.body);
    let filter = {user_id};
    users.find(filter).then(result=>{
         let friends = result[0].addFriends;
         let filters = [];
        //  console.log("friends",friends.length);
         if(friends.length >= 1){
            friends.map((element,index)=>{
                filters.push({user_id:element.FriendID});
             });
            //  console.log("filters",filters);
          users.find({$or:filters},{password:0,email:0}).then(result=>{
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
        });

         }
         else{
            res.status(200).json({
                message:"No friends"
            })
         }
         
       
    })
    .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database",
            error:err
        })
    });
  
}

// put method 
// delete friends

exports.deleteFriends = (req,res)=>{
    const {user_id,friend_id,email,friendName} = req.body;
    let query = {user_id:user_id,email:email};
    let data  = {$pull: {addFriends:{FriendID:friend_id,FriendName:friendName}}}
    users.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"friend deleted successfully",
            data:result
        })

    }).catch(err=>{
        res.status(505).json({
            message:"something went wrong",
            error:err
        })
    })
}


// @put method 
// add photos
exports.addphotos = (req,res)=>{
    const {user_id,email,photo} = req.body;
    let query = {user_id:user_id,email:email};
    let data = {$set: {picture:photo}};
    users.updateOne(query,data).then(result=>{
        res.status(200).json({
            message:"Photo updated successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(505).json({
            message:"somehting went wrong",
            error:err
        })
    })
   
}

// @put method
// Edit Friends Name

exports.EditfriendsName = (req,res)=>{
    const {user_id,friend_id,email,friendName} = req.body;
    let query = {user_id:user_id,email:email,"addFriends.FriendID":friend_id};
    let data  = {$set: {"addFriends.$.FriendName":friendName}};

    users.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"name update successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(505).json({
            message:"something went wrong in database",
            Error:err
        })
    })
    
}

// PUT METHOD
// username update
exports.editname = (req,res)=>{
    const {user_id,email,Name} =  req.body;
    let query = {user_id:user_id,email:email};
    let data = {$set: {userName:Name}};
   users.updateOne(query,data).then(result=>{
    res.status(201).json({
        message:"username update successfully",
        data:result
    })
   })
   .catch(err=>{
    res.status(505).json({
        message:"something went wrong in database"
    })
   })
}

// @PUT METHOD
// edit bio data
exports.editbio = (req,res)=>{
    const {user_id,email,biodata} =  req.body;
    let query = {user_id:user_id,email:email};
    let data = {$set: {bioData:biodata}};
   users.updateOne(query,data).then(result=>{
    res.status(201).json({
        message:"username update successfully",
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