// const express = require('express');
// const Queue = require('bull');

// const { createBullBoard } = require('@bull-board/api');
// const { BullAdapter } = require('@bull-board/api/bullAdapter');
// const { ExpressAdapter } = require('@bull-board/express');

// const connection = { redis: { port: 6379, host: "127.0.0.1" } };

// const myQueue = new Queue("myQueue", connection);

// const serverAdapter = new ExpressAdapter();
// serverAdapter.setBasePath('/admin/queues');


// myQueue.process(function (job, done) {
//     console.log(job.data);
//     done(new Error('error transcoding'))
// })

// myQueue.on('completed', (job) => {
//     console.log(job.data, ' Completed');
// })

// myQueue.on('failed', (job) => {
//     console.error('Failed to complete job', job.data);
// })

// myQueue.add({ data: 'Hello World' })

// const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
//     queues: [new BullAdapter(myQueue)],
//     serverAdapter: serverAdapter,
// });


// const app = express();

// app.use('/admin/queues', serverAdapter.getRouter());

// app.listen(3000, () => {
//     console.log('Running on 3000...');
//     console.log('For the UI, open http://localhost:3000/admin/queues');
//     console.log('Make sure Redis is running on port 6379 by default');
// });



const express = require('express');
const Queue = require('bull');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const redisConfig = { port: 6379, host: '127.0.0.1' };
const connection = { redis: redisConfig };
const QUEUE_NAME = 'myQueue';

const myQueue = new Queue(QUEUE_NAME, connection);

function processJob(job, done) {
    console.log(job.data);
    done(new Error('error transcoding'));
}

function handleJobCompleted(job) {
    console.log(job.data, 'Completed');
}

function handleJobFailed(job) {
    console.error('Failed to complete job', job.data);
}

myQueue.process(processJob);
myQueue.on('completed', handleJobCompleted);
myQueue.on('failed', handleJobFailed);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const bullAdapter = new BullAdapter(myQueue);
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [bullAdapter],
    serverAdapter: serverAdapter,
});

const app = express();

const adminPath = '/admin/queues';
app.use(adminPath, serverAdapter.getRouter());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}...`);
    console.log(`For the UI, open http://localhost:${PORT}${adminPath}`);
    console.log('Make sure Redis is running on port 6379 by default');
});
