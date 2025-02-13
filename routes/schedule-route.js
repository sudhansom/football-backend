const express = require('express');
const uuid = require('uuid')

const { getSchedules, createSchedule, updateParticipate, resetParticipate } = require('../controller/schedule-controller');

const verifyAdmin = require("../middleware/verifyAdmin.js")
const verifyToken = require("../middleware/verifyToken.js")

const router = express.Router()

router.get('/', getSchedules);
router.post('/',verifyAdmin, createSchedule);
router.patch('/:id',verifyToken, updateParticipate);
router.patch('/reset/:id',verifyToken, resetParticipate);




module.exports = router;