const { TaskManager, orkesConductorClient } = require("@io-orkes/conductor-javascript");

// Worker function for greet_task
const greetTaskWorker = (task) => {
  return {
    outputData: {
      message: "Hello World"
    },
    status: "COMPLETED"
  };
};

// Main function to start the worker
async function main() {
  const clientPromise = orkesConductorClient({
    serverUrl: process.env.CONDUCTOR_SERVER_URL || "http://localhost:8080/api"
  });

  const client = await clientPromise;
  const manager = new TaskManager(client, [
    {
      taskDefName: "greet_task",
      execute: greetTaskWorker,
      pollInterval: 100,
      concurrency: 1
    }
  ]);

  manager.startPolling();
  console.log("Greet task worker started and polling...");
}

// Start the worker
main().catch((error) => {
  console.error("Error starting worker:", error);
  process.exit(1);
});
