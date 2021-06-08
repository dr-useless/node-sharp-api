const https = require("https");
const sharp = require("sharp");

const port = 3002;

const requestListener = (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-headers", "*")
  res.setHeader("content-type", "text/plain");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("access-control-allow-methods", "POST, OPTIONS");
    res.end();
    return;
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

  const outputOptionsHeader = req.headers["output-options"];
  let outputOptions;
  if (outputOptionsHeader) {
    try {
      outputOptions = JSON.parse(outputOptionsHeader);
    } catch {
    }
  }

  const resizeOptionsHeader = req.headers["resize-options"];
  let resizeOptions;
  if (resizeOptionsHeader) {
    try {
      resizeOptions = JSON.parse(resizeOptionsHeader);
    } catch {
    }
  }


  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  }).on("end", () => {
    body = Buffer.concat(body);
    try {
      let input = sharp(body);
      if (resizeOptions) {
        input = input.resize(resizeOptions);
      }
      input.toFormat(accept[1], outputOptions);
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

const httpsServerOptions = require(process.argv[2] || "./config.js");

console.log("HTTPS server options", httpsServerOptions);

const server = https.createServer(httpsServerOptions, requestListener);
server.listen(port);
console.log(`Listening on localhost:${port}`);