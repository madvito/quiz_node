const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//     allowedHeaders: ['Content-Type']
// }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.use(routes)


const PORT = process.env.PORT || 8000
DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    app.listen(PORT,()=>{
        console.log(`server listening on http://localhost:${PORT}`);
    })
})
