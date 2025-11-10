import { orkesConductorClient, simpleTask, workflow } from "@io-orkes/conductor-javascript";

// Setup the Conductor client with server URL, API key, and secret
const conductorClient = new orkesConductorClient({
  serverUrl: 'YOUR_CONDUCTOR_SERVER_URL',
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET', // Include your secret here
});

// Define the "Hello World" task
const helloWorldTask = simpleTask({
  taskName: 'hello_world_task',
  taskReferenceName: 'hello_world_task_ref',
  inputKeys: [],
  outputKeys: [],
  execute: (task) => {
    console.log('Hello World');
    return Promise.resolve({ status: 'COMPLETED', outputData: {} });
  },
});

// Create and register the workflow with the task
const helloWorldWorkflow = workflow({
  name: 'HelloWorldWorkflow',
  version: 1,
  tasks: [helloWorldTask],
});

conductorClient.registerWorkflow(helloWorldWorkflow).then(() => {
  console.log('Hello World Workflow registered successfully');
}).catch((error) => {
  console.error('Error registering workflow:', error);
});
