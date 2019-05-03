const {
    Stitch, 
    AnonymousCredential,
    RemoteMongoClient
} = require('mongodb-stitch-server-sdk');

let stitchClient = Stitch.initializeDefaultAppClient('velutweb-yybap');
// client is changed to .defaultAppClient later
stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    console.log(user);
    stitchClient.close();
}).catch(err => {
    console.log(err);
    stitchClient.close();
})

stitchClient = Stitch.defaultAppClient;

console.log("logging in anonymously");
stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`)
});

// const client = stitchClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
const client = stitchClient

let url = "mongodb+srv://duncanritchie:Computatrum%5F2019@cluster0-nmpwr.azure.mongodb.net/test?retryWrites=true"

// Query Mongo for the perfect rhyme ending of gallīna.

// I need to find out what client should be.
client.connect(url, function (err, client) {
    
  const db = client.db("velut");
  const collection = db.collection("words");
  
  let query = {
      "Word": "gall\u012Bna"
  };
  
  let projection = {
      "Perfect rhyme": 1.0
  };
  
  let cursor = collection.find(query).project(projection);
  
  cursor.forEach(
      function(doc) {
          console.log(doc);
      }, 
      function(err) {
          client.close();
      }
  );
  
});
