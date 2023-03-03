# Starting

Git clone project

```
git clone git@github.com:developer-kirill-nefodov/crawling.git

cd ./crawling
```

<br/>

Run in dev mode <br/>
`Don't forget to fill in the empty fields`

```sh
make up
```

# Description

### Server running: http://localhost:3001

I implemented a mini sites search. How it works?  <br/>
You are passing parameters to the body of the request.  <br/>
And you get a secret key with a certain expiration date.

* POST: http://localhost:3001/api/search  <br/>
  `Object: {urls: [...urls], keywords: [...string]}` <br/>
  With the secret key you can query the status of the job.


* GET: http://localhost:3001/api/search `/:secret key` <br/>
  After completion, you will receive processed data from sites

## Technologies:

* Node.js
* Express.js
* Makefile
* Docker-Compose
* Redis

## Dependencies:

* axios
* body-parser
* cheerio
* dotenv
