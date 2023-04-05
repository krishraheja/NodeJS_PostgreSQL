
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../util/database');
// const User  = require('../models/user');
const route = require('../routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


// test route
app.get('/', (req, res, next) => res.send('hello world'));

// CRUD route
app.use('/users', route);


// Error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });

});


sequelize
    .sync()
    .then(result => {
        app.listen(port, () => {
            console.log(`app listening on port ${port}!`);
        });
    })
    .catch(err => console.log(`Error in connection ${err}`));
