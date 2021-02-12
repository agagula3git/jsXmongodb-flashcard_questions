const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = require('./db');
const collection = "flashcards";
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/getFlashcards',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        } 
    });
});

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
