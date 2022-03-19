const { parentPort } = require('worker_threads');

console.log('Hello world!');
parentPort.postMessage('Hello from the thread of thread-entry.js!');
parentPort.close();
