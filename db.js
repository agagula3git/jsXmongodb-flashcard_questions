const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbName = "jsXmongodb";

const uri = 'mongodb://127.0.0.1:27017'; /*db.serverCmdLineOpts()*/

const state = {
    db: null
};

const connect = (f)=>{
    if(state.db){
        f()
    }else{
        MongoClient.connect(uri,{useUnifiedTopology: true}, (err, client)=>{
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

/*const MongoClient = require('mongodb').MongoClient
const Server = require('mongodb').Server;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
  var db1 = mongoClient.db("mydb");

  mongoClient.close();
});*/


