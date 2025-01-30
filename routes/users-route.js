const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');

const { getUserById, getAllUsers, createUser, deleteUser, updateUser, editPayments, editMeasures, editSkills, deleteSkill } = require("../controller/user-controller.js")

const router = express.Router()

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const invalid = MIME_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid mimetype')
        if(invalid){
            err = null;
        }
        cb(err, 'backend/images')
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + new Date() + '.' + ext);
    },

})

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', multer({storage:storage}).single('image'), [check('name').not().isEmpty(), check('name').isLength({min: 4})], createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/payments/:id', editPayments);
router.patch('/measures/:id', editMeasures);
router.patch('/skills/:id', editSkills);
router.patch('/skills/delete/:id', deleteSkill);

module.exports = router;