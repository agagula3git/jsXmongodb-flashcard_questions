const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = require('./db');
const collection = "flashcards";
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/getFlashcards',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err); 
        else{
            res.json(documents);
        } 
    });
});

app.post('/',(req,res)=>{
    var question = req.body.question;
    var answer = req.body.answer;
    console.log(question);
    const data = {
        "question": question,
        "answer": answer
    }
    db.getDB().collection(collection).insertOne({question: question, answer: answer},(err,collection)=>{
        if(err){
            console.log('Error occured while inserting!')
            throw(err);
        }else{
            res.redirect('correct.html')
        }
    });

});

app.put('/:id',(req,res)=>{
    const cardID = req.params.id;
    // Find Document By ID and Update
    db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(cardID)}, {$set: {question: req.body.question, answer: req.body.answer}},{returnOriginal: false},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
});

app.delete('/:id',(req,res)=>{
    const cardID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(cardId)},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
})

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
