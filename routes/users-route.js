const express = require('express');

const router = express.Router()

const users = [
    {
        id: 1,
        name: "Bal Krishna",
        age: "45",
        address: "United Kingdom"
    },
    {
        id: 2,
        name: "Sudhan Krishna",
        age: "42",
        address: "Danmark"
    },
    {
        id: 3,
        name: "Resham Krishna",
        age: "40",
        address: "Kathmandu"
    },
    {
        id: 4,
        name: "Birendra Kumar",
        age: "40",
        address: "Pokhara"
    },
]

router.get('/:uid', (req, res, next)=> {
    const userId = req.params.uid;
    const user = users.find(u => u.id == userId);
    res.json({user}) ;
})

module.exports = router;