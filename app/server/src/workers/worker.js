import {dirname} from "path";
import {fileURLToPath} from "url";
import {Worker, workerData} from "worker_threads";

import {redis} from "../db";

const {keywords, urls, secretKey} = workerData;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  await redis.connect();

  const pagesData = [];
  const statusSearch = {
    status: 'In progress',
    error: 0,
    done: 0,
    all: urls.length,
  };

  const interval = setInterval(async () => {

    const isTrue = statusSearch.done === statusSearch.all;
    const value = JSON.stringify((isTrue ? {
      ...statusSearch,
      status: 'Everything is finished',
      data: pagesData
    } : statusSearch));

    await redis.SETEX(secretKey, 15 * 60, value);

    if (isTrue) {
      clearInterval(interval);
    }
  }, 2000);

  for (let url of urls) {
    const worker = new Worker(`${__dirname}/search-worker.js`, {
      workerData: {url, keywords}
    });

    worker.on('message', (data) => {
      if (data.error) {
        statusSearch.error += 1;
      }
      statusSearch.done += 1;
      pagesData.push(data);
    });
  }
})()
  .catch(console.log);
