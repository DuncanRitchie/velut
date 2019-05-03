const {
    Stitch, 
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');

let client = Stitch.initializeDefaultAppClient('velutweb-yybap');
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    console.log(user);
    client.close();
}).catch(err => {
    console.log(err);
    client.close();
})

let client = Stitch.defaultAppClient;

console.log("logging in anonymously");
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`)
});

