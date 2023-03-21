#!/usr/bin/env node
//const {CIRCLE_NODE_TOTAL:numJobs,CIRCLE_NODE_INDEX:jobIndex} = process.env;
//console.log({numJobs,jobIndex});
const {env} = require('process');
const {spawn} = require('child_process');
const NUM_JOBS = env['MM_E2E_JOBS']||13;
const jobs = Array.from({length: NUM_JOBS}, (_,i)=>i).map(i => new Promise((resolve,reject) => {
  p = spawn('/usr/bin/yarn',['run','test:e2e:chrome'],{
    // detached: true,
    env: {
      ...env,
      CIRCLE_NODE_INDEX: i,
      CIRCLE_NODE_TOTAL: NUM_JOBS,
      MM_TEST_PORT: 8000 + i,
      MM_TEST_DAPP_BASE_PORT: 8080 + i,
      MM_FIXTURE_SERVER_PORT: 12345 + i,
      MM_TEST_RPC_PORT: 8545 + i,
    }
  });
  p.stdout.on('data',d => {
    process.stdout.write(`[[${i}]] ${d}`);
  });
  p.stderr.on('data',d => {
    process.stderr.write(`[[${i}]] ${d}`);
  });
  p.on('close', (code) => {
    if (code === 0) {
      console.log(`[[${i}:OK]]`)
      resolve();
    } else {
      console.log(`[[${i}:${code}]]`)
      reject(code);
    }
  });
}));

Promise.allSettled(jobs).then((result) => {
  console.log('done', result);
}).catch(err=>{
  console.error('fail', err);
})

