import { createApp } from './app.mjs';

const portValue = process.env.PORT || '3000';
const port = Number(portValue);

if (!/^\d+$/.test(portValue) || !Number.isInteger(port) || port < 0 || port > 65535) {
  console.error('PORT must be an integer between 0 and 65535.');
  process.exitCode = 1;
} else {
  const server = createApp();

  server.on('error', (error) => {
    console.error(`Could not start Dummy API: ${error.message}`);
    process.exitCode = 1;
  });

  server.listen(port, () => {
    const { port: listeningPort } = server.address();

    console.log(`Dummy API is listening at http://localhost:${listeningPort}`);
  });
}
