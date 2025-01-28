const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');


const usersRoute = require('./routes/users-route');
const HttpError = require('./models/http-error');

const app = express();

const port = 5000;

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


mongoose.connect('mongodb+srv://football321:football321@cluster0.3wccq.mongodb.net/football').then(()=>
    {
        console.log(chalk.whiteBright('Mongo DB connected....'));
        app.listen(port, async ()=>{
            console.log(chalk.blueBright(`server running at:: http://localhost:${port}`));
        })
        
    }
).catch(err=>console.log('Error connecting mongoose', err))

