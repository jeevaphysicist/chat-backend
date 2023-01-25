const express = require('express');
const router = express.Router();
const conversation = require('../controllers/conversation');

router.post("/addmessages",conversation.addmessages);
router.post("/getmessages",conversation.getmessages);





module.exports = router;