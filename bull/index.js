const Queue = require("bull");

const connection = { redis: { port: 6379, host: "127.0.0.1" } };

const myQueue = new Queue("myQueue", connection);


myQueue.process(function(job,done){
    console.log(job.data);
    done(new Error('error transcoding'))
})

myQueue.on('completed',(job)=>{
    console.log(job.data,' Completed');
})

myQueue.on('failed',(job)=>{
    console.error('Failed to complete job',job.data);
})
myQueue.add({data: 'Hello World'})