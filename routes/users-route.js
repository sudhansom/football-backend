const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const uuid = require('uuid')

const verifyToken = require( "../middleware/verifyToken.js")
const verifyAdmin = require("../middleware/verifyAdmin.js")

const { getUserById, 
        getAllUsers, 
        createUser, 
        deleteUser, 
        updateUser, 
        editPayments, 
        editMeasures, 
        editSkills, 
        deleteSkill,   
        loginUser 
    } = require("../controller/user-controller.js")

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
        cb(null, name + '-' + uuid.v4() + '.' + ext);
    },

})

router.get('/', verifyToken,  getAllUsers);
router.get('/:id',verifyToken, getUserById);
router.post('/login', loginUser);
router.post('/', multer({storage:storage}).single('image'), [check('name').not().isEmpty(), check('name').isLength({min: 4})], createUser);
router.patch('/:id',verifyToken, updateUser);
router.delete('/:id',verifyToken, deleteUser);
router.patch('/payments/:id',verifyToken, editPayments);
router.patch('/measures/:id',verifyToken, editMeasures);
router.patch('/skills/:id',verifyToken, editSkills);
router.patch('/skills/delete/:id',verifyAdmin, deleteSkill);

module.exports = router;