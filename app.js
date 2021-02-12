const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = require('./db');
const collection = "flashcards";
const PORT = process.env.PORT || 3000;

db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }else{
        app.listen(PORT,()=>{
            console.log(`Server started on ${PORT}`);
        })
    }
});
