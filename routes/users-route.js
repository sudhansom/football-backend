const express = require('express');

const { getUserById, getAllUsers } = require("../controller/user-controller.js")

const router = express.Router()


router.get('/', getAllUsers);
router.get('/:uid', getUserById)

module.exports = router;