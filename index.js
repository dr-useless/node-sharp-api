const http = require('http');
const sharp = require("sharp");

const authToken = process.env.NODE_SHARP_API_AUTH;

const port = 3002;

const requestListener = (req, res) => {

  res.setHeader("content-type", "text/plain");

  const reqAuth = req.headers["authorization"];
  if (!reqAuth || reqAuth.replace('Bearer ', '') !== authToken) {
    res.statusCode = 401;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Only POST");
    return;
  }

  let accept = req.headers["accept"];
  if (!accept) {
    res.statusCode = 400
    res.end("Bad request");
    return;
  }

  accept = accept.toLowerCase().split("/");
  if (!accept || accept.length !== 2 || accept[0] !== "image") {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  const optionsHeader = req.headers["options"];
  let options;
  if (optionsHeader) {
    try {
      options = JSON.parse(optionsHeader);
    } catch {
    }
  }

  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body);
    try {
      let input = sharp(body).toFormat(accept[1], options);
      return input.toBuffer().then(buffer => {
        res.setHeader("content-type", `${accept[0]}/${accept[1]}`);
        res.setHeader("content-length", buffer.byteLength);
        res.statusCode = 200;
        res.end(buffer);
      });
    } catch {
      res.statusCode = 500;
      res.end("Failed");
    }
  });
}

const server = http.createServer(requestListener);
server.listen(port);
console.log(`Listening on localhost:${port}`);