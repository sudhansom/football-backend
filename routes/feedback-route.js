const express = require('express');

const { getFeedbacks, createFeedback, deleteFeedback, updateFeedback } = require("../controller/feedback-controller.js")

const router = express.Router()

const verifyAdmin = require("../middleware/verifyAdmin.js")



router.get('/', getFeedbacks);
router.post('/', createFeedback);
router.patch('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);


module.exports = router;