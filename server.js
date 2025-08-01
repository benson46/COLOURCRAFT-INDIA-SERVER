import connectDB from './config/db.js';
import app from './app.js';
import { env } from './config/env.js';

connectDB()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to the database: ${err}`);
  });