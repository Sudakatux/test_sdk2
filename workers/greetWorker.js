const { ConductorClient, TaskManager } = require('@io-orkes/conductor-javascript');

// Initialize Conductor client
const client = new ConductorClient({
  serverUrl: process.env.CONDUCTOR_SERVER_URL || 'http://localhost:8080/api'
});

const taskManager = new TaskManager(client);

// Define the greet_task worker
const greetTaskWorker = {
  taskDefName: 'greet_task',
  execute: async ({ inputData }) => {
    console.log('Executing greet_task with input:', inputData);
    
    // Return task as COMPLETED with Hello World message
    return {
      status: 'COMPLETED',
      outputData: {
        message: 'Hello World',
        greeting: 'Hello World',
        timestamp: new Date().toISOString()
      },
      logs: ['greet_task executed successfully']
    };
  }
};

// Start polling for tasks
const startWorker = async () => {
  try {
    console.log('Starting greet_task worker...');
    taskManager.startPolling(greetTaskWorker, 1, 1000);
    console.log('greet_task worker is now polling for tasks');
  } catch (error) {
    console.error('Error starting worker:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down greet_task worker...');
  taskManager.stopPolling(greetTaskWorker);
  process.exit(0);
});

// Start the worker if this file is run directly
if (require.main === module) {
  startWorker();
}

module.exports = { greetTaskWorker, startWorker };