const express = require('express');

const { getMessages, createMessage, updateMessage, deleteMessage } = require("../controller/message-controller")

const verifyAdmin = require("../middleware/verifyAdmin.js")


const router = express.Router()

router.get('/', getMessages);
router.post('/',verifyAdmin, createMessage);
router.patch('/:id',verifyAdmin, updateMessage)
router.delete('/:id',verifyAdmin, deleteMessage)


module.exports = router;