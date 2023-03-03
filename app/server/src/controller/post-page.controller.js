import {createHmac} from "crypto";
import {fileURLToPath} from "url";
import {join, dirname} from "path";
import {Worker} from "worker_threads";

export const postPageController = async (req, res) => {
  const {urls, keywords} = req.body;
  const secretKey = createHmac('sha256', process.env.SECRET_KET)
    .update(JSON.stringify(keywords)).digest('hex')

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  new Worker(join(`${__dirname}`, '../workers/worker.js'), {
    workerData: {urls, keywords, secretKey}
  });

  res.status(200).json({
    message: 'Use the secret access key to get information about the progress of the request',
    secretKey
  });
}
