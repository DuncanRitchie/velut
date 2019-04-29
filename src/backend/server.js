const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

const key = "4a3ae2cc-4eb3-4ffc-bf26-927b92ae2080"

app.use(cors());
app.use(bodyParser.json());

const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('velutweb-yybap');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('velut');

client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
  db.collection('words').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() =>
  db.collection('words').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});