const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Code for MongoDB Stitch

const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
    ServerApiKeyCredential
} = require('mongodb-stitch-browser-sdk');

const {RemoteUpdateOptions} = require('mongodb-stitch-core-services-mongodb-remote')

const stitchClient = Stitch.initializeDefaultAppClient('velutweb-yybap');
const mongoClient = stitchClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
const key = "4a3ae2cc-4eb3-4ffc-bf26-927b92ae2080"

const mongodb = require("mongodb");

stitchClient.auth.authenticate('anon').then(credential => {
    return mongoClient.db("velut").collection("words")
})


// Query Mongo for the perfect rhyme ending of gallīna.

// client.connect(url, function (err, client) {
    
//   var db = client.db("velut");
//   var collection = db.collection("words");
  
//   var query = {
//       "Word": "gall\u012Bna"
//   };
  
//   var projection = {
//       "PerfectRhyme": 1.0
//   };
  
//   var cursor = collection.find(query).project(projection);
  
//   cursor.forEach(
//       function(doc) {
//           console.log(doc);
//       }, 
//       function(err) {
//           client.close();
//       }
//   );
  
// });

// Query Mongo for words (and their lemmata) whose perfect rhyme ending is īna.

// client.connect(url, function (err, client) {
    
//     const db = client.db("velut");
//     const collection = db.collection("words");
    
//     let query = {
//         "Perfect rhyme": "\u012Bna"
//     };
    
//     let projection = {
//         "Word": 1.0,
//         "Lemmata": 1.0
//     };
    
//     let sort = [ ["Syllable count", 1], ["Sort", 1] ];
    
//     let cursor = collection.find(query).project(projection).sort(sort);
    
//     cursor.forEach(
//         function(doc) {
//             console.log(doc);
//         }, 
//         function(err) {
//             client.close();
//         }
//     );
    
// });

// Set up the port listening.

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});