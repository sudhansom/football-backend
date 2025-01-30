const express = require('express');
const uuid = require('uuid')

const { getSchedules, createSchedule } = require('../controller/schedule-controller');


const router = express.Router()

router.get('/', getSchedules);
router.post('/', createSchedule);



module.exports = router;