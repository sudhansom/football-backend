const express = require('express');

const { getMessages, createMessage, updateMessage, deleteMessage } = require("../controller/message-controller")

const router = express.Router()

router.get('/', getMessages);
router.post('/', createMessage);
router.patch('/:id', updateMessage)
router.delete('/:id', deleteMessage)


module.exports = router;