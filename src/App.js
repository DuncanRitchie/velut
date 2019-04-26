import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// // This is the node.js code for a Mongo query

// let mongodb = require("mongodb");

// let client = mongodb.MongoClient;
// let url = "mongodb://host:port/";

// client.connect(url, function (err, client) {
    
//     let db = client.db("local");
//     let collection = db.collection("words");
    
//     let query = {
//         "Scansion": "\u02D8\u02D8\u00AF\u02D8"
//     };
    
//     let projection = {
//         "Word": 1.0
//     };
    
//     let sort = [ ["Sort column", 1] ];
//     let skip = 116;
//     let limit = 50;
    
//     let cursor = collection.find(query).project(projection).sort(sort).skip(skip).limit(limit);
    
//     cursor.forEach(
//         function(doc) {
//             console.log(doc);
//         }, 
//         function(err) {
//             client.close();
//         }
//     );
// });


class App extends Component {
  render() {
    return (
      <div className="App">
        There&rsquo;s nothing here yet&hellip;
      </div>
    );
  }
}

export default App;
