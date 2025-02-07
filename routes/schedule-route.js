const express = require('express');
const uuid = require('uuid')

const { getSchedules, createSchedule, updateParticipate } = require('../controller/schedule-controller');


const router = express.Router()

router.get('/', getSchedules);
router.post('/', createSchedule);
router.patch('/:id', updateParticipate);



module.exports = router;