const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users-route')

const app = express();

app.use('/api/users',usersRoute);

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Server Error: An unknown Error Ocurred." })
})

app.listen(5000)

