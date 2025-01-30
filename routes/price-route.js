const express = require('express');
const uuid = require('uuid')

const { getPrices, createPrice } = require("../controller/price-controller.js")

const router = express.Router()

router.get('/', getPrices);
router.post('/', createPrice);


module.exports = router;