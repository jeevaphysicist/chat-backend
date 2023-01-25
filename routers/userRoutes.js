const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontroller');

router.post("/createaccount",user.addusers);
router.post("/login",user.getusers);
router.post("/currentuser",user.currentuser);
router.post("/getusers",user.users)
router.put("/addfriends",user.addfriends);
router.post("/getfriends",user.getfriends);

router.put("/deletefriends",user.deleteFriends);
router.put("/addphoto",user.addphotos);
router.put("/editfriendname",user.EditfriendsName);
router.put("/editname",user.editname);
router.put("/editbio",user.editbio);



module.exports = router;


