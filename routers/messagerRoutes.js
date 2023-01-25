const express = require('express');
const router = express.Router();
const messager = require('../controllers/messagers');

router.post("/addusers",messager.addusers);
router.get("/getusers",messager.getallconversation_id);



module.exports = router;