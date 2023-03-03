import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import {redis} from "./db";
import {searchRouter} from "./router/search.router";

const createServer = async () => {
  const app = express();
  const port = process.env.PORT || 3001;

  app.use(bodyParser.json());

  await redis.connect();

  app.use('/api', searchRouter());

  app.listen(port, () => {
    console.log(`\x1b[34m[<<Successfully>>]\x1b[0m: server works - http://localhost:${port}`);
  });
}

createServer()
  .catch((e) => {
    console.log('[\x1b[31m Error \x1b[0m]: server error - ', e.message);
    process.exit(1);
  })
