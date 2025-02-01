const express = require('express');

const { getMessages, createMessage } = require("../controller/message-controller")

const router = express.Router()

router.get('/', getMessages);
router.post('/', createMessage);


module.exports = router;