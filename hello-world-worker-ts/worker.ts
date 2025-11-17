import { orkesConductorClient, TaskManager, Task } from '@orkes/conductor-javascript-sdk';

// Define the task function
const helloWorldTask = async (task: Task) => {
  console.log('Hello World!');
  return {
    status: 'COMPLETED',
    output: {
      message: 'Hello World Task Completed Successfully!'
    }
  };
};

// Configuration for the Orkes Conductor client
const config = {
  serverUrl: 'https://developer.orkescloud.com/api',
  keyId: '3b04cabb2231-bf2d-11f0-a3ed-c621d46bfcd0',
  keySecret: 'B0h1ofWaABdoef7GAvzBjgFGbSrvKRmgIN7gbPhfWtZr29v8',
};

(async () => {
  // Create the Orkes client
  const client = await orkesConductorClient(config);

  // Create the TaskManager
  const taskManager = new TaskManager(client);

  // Define and start the worker
  taskManager.registerTask('helloWorld', helloWorldTask);
  taskManager.startPolling();
})();
