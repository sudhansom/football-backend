const express = require('express');

const { getUserById, getAllUsers, createUser } = require("../controller/user-controller.js")

const router = express.Router()


router.get('/', getAllUsers);
router.get('/:uid', getUserById);
router.post('/', createUser);

module.exports = router;