const { ConductorWorker } = require('@orkes/conductor-typescript');

async function main() {
    // Construct a worker
    const worker = new ConductorWorker({
        url: 'http://your.conductor.server', // Replace with your Conductor server
        workerid: 'greet_worker', // A unique id for your worker
        pollInterval: 5000, // Polling interval in milliseconds
    });

    // Register a task
    await worker.register('greet_task', async (task) => {
        console.log('Executing greet_task');

        // Perform your task logic here
        const outputData = {
            message: 'Hello World',
        };

        // Return task result
        return {
            status: 'COMPLETED',
            outputData,
        };
    });

    // Start worker
    worker.start();
}

main().catch(err => console.error(err));