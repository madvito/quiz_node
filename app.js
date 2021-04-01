const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
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
