const { TaskManager } = require('@io-orkes/conductor-javascript');
const { OrkesApiConfig } = require('@io-orkes/conductor-javascript');

// Configure the Conductor client
const config = new OrkesApiConfig(
  process.env.CONDUCTOR_SERVER_URL || 'http://localhost:8080/api',
  process.env.CONDUCTOR_AUTH_KEY,
  process.env.CONDUCTOR_AUTH_SECRET
);

const taskManager = new TaskManager(config);

// Define the worker function for greet_task
const greetTaskWorker = async (task) => {
  console.log('Processing greet_task:', task.taskId);
  
  // Return the task as COMPLETED with Hello World message
  return {
    status: 'COMPLETED',
    outputData: {
      message: 'Hello World',
      taskId: task.taskId,
      timestamp: new Date().toISOString()
    },
    logs: ['Greet task completed successfully']
  };
};

// Start polling for greet_task
const startWorker = async () => {
  console.log('Starting greet_task worker...');
  
  taskManager.startPolling(
    'greet_task',
    greetTaskWorker,
    {
      pollingIntervals: 1000,
      concurrency: 1
    }
  );
  
  console.log('Worker is now polling for greet_task');
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down worker...');
  taskManager.stopPolling('greet_task');
  process.exit(0);
});

// Start the worker
startWorker().catch(error => {
  console.error('Error starting worker:', error);
  process.exit(1);
});

module.exports = { greetTaskWorker };