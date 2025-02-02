const express = require('express');

const { getMessages, createMessage, updateMessage } = require("../controller/message-controller")

const router = express.Router()

router.get('/', getMessages);
router.post('/', createMessage);
router.patch('/:id', updateMessage)


module.exports = router;