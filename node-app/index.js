const {Queue} = require('bullmq');
const express = require('express');
const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const IORedis = require('ioredis')
const connection = new IORedis();

const myQueue = new Queue("myQueue", {defaultJobOptions: { removeOnComplete: true },connection});


const { router } = createBullBoard([new BullAdapter(myQueue)]);

// async function sendNotification(data) {
//   const userData = 'a'; // Move userData inside the function if it's used only here
//   await sendMail(userData);
//   const url="https://en3g7net32jzv.x.pipedream.net/"
//   throw new error('error')
//   await axios.get(url)
//   console.log('Work completed for job with data:', data);
// }

// myQueue.process(async (job,done) => {
//   console.log('Processing job with data:', job.data);
//   try{
//     await sendNotification(job.data);

//   }
//   catch(error){
//     console.log('error occured');
//   }
//   done(new Error('error transcoding'));

// });

// myQueue.add({ userData: 'a' }, { delay: 10000 });
// myQueue.add({ userData: 'b' }, { delay: 21004 });
// myQueue.add({ userData: 'c' }, { delay: 32008 });
// myQueue.add({ userData: 'd' }, { delay: 43016 });
// myQueue.add({ userData: 'ae' }, { delay: 55020 });
// myQueue.add({ userData: 'f' }, { delay: 66024 });



const app = express();

app.use('/', router);

const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
