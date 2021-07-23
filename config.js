const fs = require("fs");

const options = {
  key: fs.readFileSync("./ECC-privkey.pem"),
  cert: fs.readFileSync("./ECC-cert.pem")
};

module.exports = options;