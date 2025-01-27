const express = require('express');
const { check } = require('express-validator')

const { getUserById, getAllUsers, createUser, deleteUser, updateUser } = require("../controller/user-controller.js")

const router = express.Router()


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', [check('name').not().isEmpty(), check('name').isLength({min: 4})], createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;