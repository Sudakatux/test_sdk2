import { orkesConductorClient, WorkflowExecutor, simpleTask, workflow } from "@io-orkes/conductor-javascript";

// Create API client
async function createClient() {
  return await orkesConductorClient({
    serverUrl: "https://play.orkes.io/api",
    keyId: "your-key-id",
    keySecret: "your-key-secret",
  });
}

// Create and register workflow
async function createAndRegisterWorkflow(client) {
  const executor = new WorkflowExecutor(client);
  const myWorkflow = workflow("hello_world", [
    simpleTask("greet_task", "greeting_task", { message: "Hello World!" })
  ]);

  await executor.registerWorkflow(true, myWorkflow);
  const executionId = await executor.startWorkflow({
    name: "hello_world",
    version: 1,
    input: { name: "Developer" }
  });
  console.log(`Workflow started with ID: `);
}

(async () => {
  const client = await createClient();
  await createAndRegisterWorkflow(client);
})();