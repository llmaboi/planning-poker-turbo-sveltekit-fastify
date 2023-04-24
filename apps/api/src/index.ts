import { createServer } from './config/server';
// import { getEnvConfig } from './config/env';

async function start() {
  // const envConfig = getEnvConfig();

  try {
    const server = await createServer();

    // TODO: I'm not sure if this is correct
    // server.listen({ port: envConfig.SERVER_PORT, host: '0.0.0.0' }, () => {
    server.listen(
      {
        port: parseInt(process.env.VITE_API_PORT!),
        host: process.env.VITE_API_URL,
      },
      () => {
        console.log('Server started...');
        server.printRoutes();
      }
    );
  } catch (error) {
    console.log('Server not started...');
    console.error(error);
    process.exit(1);
  }
}

void start();
