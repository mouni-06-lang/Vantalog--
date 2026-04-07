import app from './app.js';
import { env } from './config/env.js';
import { ensureDatabaseReady } from './config/db.js';

async function start() {
  await ensureDatabaseReady();
  app.listen(env.port, () => {
    console.log(`Vantalog backend running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
