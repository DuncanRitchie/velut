// Requires official Node.js MongoDB Driver 3.0.0+
var mongodb = require("mongodb");

var client = mongodb.MongoClient;
var url = "mongodb://host:port/";

client.connect(url, function (err, client) {
    
    var db = client.db("local");
    var collection = db.collection("words");
    
    var query = {
        "Perfect rhyme": "ernus",
        "Syllable count": 3
    };
    
    var projection = {
        "Word": 1.0
    };
    
    var sort = [ ["Syllable count", 1], ["Sort column", 1], ["Word", 1] ];
    
    var cursor = collection.find(query).project(projection).sort(sort);
    
    cursor.forEach(
        function(doc) {
            console.log(doc);
        }, 
        function(err) {
            client.close();
        }
    );
    
});