const fs = require("fs");

const options = {
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./cert.pem")
};

module.exports = options;