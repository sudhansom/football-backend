const express = require('express');

const { getUserById, getAllUsers, createUser, deleteUser, updateUser } = require("../controller/user-controller.js")

const router = express.Router()


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;