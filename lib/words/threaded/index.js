const { Worker } = require('worker_threads');

export default function runOnThread() {
    let canRun = true;

    function startThread() {
        return new Promise((resolve) => {
            // Full path is needed inside a Worker.
            const worker = new Worker('./lib/words/threaded/thread-entry.js');
            worker.on('message', (value) => {
                console.log('Message received: ', value);
            })
            worker.on('exit', () => {
                console.log('Closing thread...');
                resolve();
            });
        })
    }
    startThread().then(() => {
        canRun = false;
    });

    function loop() {
        setTimeout(() => {
            if (canRun) {
                loop();
            }
        }, 1000)
    }
    loop();
}
