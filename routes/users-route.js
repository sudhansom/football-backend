const express = require('express');

const {getUserById} = require("../controller/user-controller.js")

const router = express.Router()



router.get('/:uid', getUserById)

module.exports = router;