const express = require('express');
const uuid = require('uuid')

const { getSchedules, createSchedule, updateParticipate } = require('../controller/schedule-controller');

const verifyAdmin = require("../middleware/verifyAdmin.js")

const router = express.Router()

router.get('/', getSchedules);
router.post('/',verifyAdmin, createSchedule);
router.patch('/:id',verifyAdmin, updateParticipate);



module.exports = router;