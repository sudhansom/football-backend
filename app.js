const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');
// const cors = require('cors');


const usersRoute = require('./routes/users-route');
const pricesRoute = require('./routes/price-route')
const schedulesRoute = require('./routes/schedule-route')
const messagesRoute = require('./routes/message-route')
const feedbackRoute = require('./routes/feedback-route.js')


const HttpError = require('./models/http-error');

const app = express();

const port = 5000;

// app.use(cors());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With, Origin, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(path.join("backend/images")))


app.use('/api/users', usersRoute);
app.use('/api/prices', pricesRoute);
app.use('/api/schedules', schedulesRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/feedbacks', feedbackRoute);


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


mongoose.connect(`mongodb+srv://football321:${process.env.DB_PASSWORD}@cluster0.3wccq.mongodb.net/football`).then(()=>
    {
        console.log(chalk.whiteBright('Mongo DB connected....'));
        app.listen(port, async ()=>{
            console.log(chalk.blueBright(`server running at:: http://localhost:${port}`));
        })
        
    }
).catch(err=>console.log('Error connecting mongoose', err))

