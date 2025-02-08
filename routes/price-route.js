const express = require('express');

const { getPrices, createPrice } = require("../controller/price-controller.js")

const router = express.Router()

const verifyAdmin = require("../middleware/verifyAdmin.js")



router.get('/', getPrices);
router.post('/',verifyAdmin, createPrice);


module.exports = router;