const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users-route');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/users',usersRoute);

app.use((req, res, next)=>{
    const err = new HttpError('Page not found.', 404);
    throw err;
})

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Server Error: An unknown Error Ocurred." })
})

app.listen(5000)

