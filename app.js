const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users-route')

const app = express();

app.use('/api/users',usersRoute)

app.listen(5000)

