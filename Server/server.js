const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const authRoute = require('./routes/user');
const propertyRoute = require('./routes/property'); 
const cors = require('cors')
const db = require("./db")

dotenv.config()
const app = express();

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
db();


app.use('/api/v1/auth', authRoute);      
app.use('/api/v1/properties', propertyRoute);


app.get('/', (req,res)=>{
    res.json({
        service :"hello",
        status :"active"
    })
})



app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.error('Error stack:', error.stack); 
    res.status(500).json({
        errorMessage: "Something went wrong!",
        error: error.message || 'Unknown error'
    });
});


app.listen(Port , ()=>{
    console.log("backend connected")
})