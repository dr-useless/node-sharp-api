const express = require("express");
const multer  = require("multer");
const sharp = require("sharp");

const appPort = 3002;
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authToken = process.env.NODE_SHARP_API_AUTH;

app.post("/", upload.single("input-file"), (req, res, next) => {
  res.setHeader("content-type", "text/plain");

  const reqAuth = req.get("authorization");
  if (!reqAuth || reqAuth.replace('Bearer ', '') !== authToken) {
    res.statusCode = 401;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Only POST");
    return;
  }

  let accept = req.get("accept");
  if (!accept) {
    res.statusCode = 400
    res.end("Bad request");
    return;
  }

  accept = accept.toLowerCase().split("/");
  if (!req.file || !accept || accept.length !== 2 || accept[0] !== "image") {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  const optionsHeader = req.get("options");
  let options;
  if (optionsHeader) {
    try {
      options = JSON.PARSE(optionsHeader);
    } catch {
    }
  }

  try {
    let input = sharp(req.file.buffer).toFormat(accept[1], options);
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

app.listen(appPort, () => {
  console.log(`Listening on localhost:${appPort}`);
});