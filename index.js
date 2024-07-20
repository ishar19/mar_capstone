const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
dotenv.config();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use((req, res, next) => {
    const reqString = `${req.method} ${req.url} ${Date.now()}\n`;
    fs.writeFile('log.txt', reqString, { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
        }
    }
    );
    next();
});


app.use('/v1/auth', authRoute);
app.use((err, req, res, next) => {
    const reqString = `${req.method} ${req.url} ${Date.now()} ${err.message}\n`;
    fs.writeFile('error.txt', reqString, { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
        }
    }
    );
    res.status(500).send('Internal Server Error');
    next();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    mongoose.connect(process.env.DB_CONNECT);
});