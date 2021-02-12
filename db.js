const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbName = "flashcards";

const uri = "mongodb://localhost:27017";

const state = {
    db: null
};

const connect = (f)=>{
    if(state.db){
        f()
    }else{
        MongoClient.connect(uri,{useNewUrlParser: true}, (err, client)=>{
            if(err){
                f(err);
            }else{
                state.db = client.db(dbName);
                f();
            }
        })
    }
};

const getDB = () =>{
    return state.db;
}

const getPrimaryKey = (_id) =>{
    return ObjectId(_id);
}

module.exports = {connect, getDB, getPrimaryKey};


