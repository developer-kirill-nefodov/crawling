import axios from "axios";
import {load} from 'cheerio';
import {parentPort, workerData} from "worker_threads";

const {keywords, url} = workerData;

(async () => {
  try {
    const pageHTML = await axios.get(url);

    const $ = load(pageHTML.data);

    const headers = [];
    const texts = [];

    $('h1, h3, h4, h5').each((i, el) => {
      const value = $(el).text();
      for (let key of keywords) {
        if (value.includes(key)) {
          headers.push({name: el.name, value});
          break;
        }
      }
    });

    $('p, span').each((i, el) => {
      const value = $(el).text();

      let isCorrect = false;
      let newValue = value;

      for (let key of keywords) {
        if (value.includes(key)) {
          const [first, last] = newValue.split(key)
          newValue = first + `<big>${key}</big>` + last;
          isCorrect = true;
        }
      }

      if (isCorrect) {
        texts.push(newValue);
      }
    });

    parentPort.postMessage({url, keywords, data: {headers, texts}});
  } catch (e) {
    const {status = 999, statusText = 'Error'} = e.response;

    parentPort.postMessage({url, keywords, error: {status, statusText}});
  }
})();
