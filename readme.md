# sharp-server

## Convert any image with a HTTP POST request
- Send a HTTP POST request
- Let [sharp](https://github.com/lovell/sharp) convert/optimize your image
- Do something with the response

## Server configuration
This repo uses a node HTTPS server. You should export an object with at least a `key` & `cert` from your `config.js`.
See (how to create node https server)[https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/] for more details.

### Basic
```javascript
const fs = require("fs");

const options = {
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./cert.pem")
};

module.exports = options;
```

## Start server
`npm run start /path/to/my/config.js`

## Accept
Set the `accept` header with the desired output MIME type.
e.g. `"accept": "image/webp"`

## Options

### Resize
Set the `resize-options` header, with a JSON string of [sharp resize options](https://sharp.pixelplumbing.com/api-resize).

### Output
Set the `output-options` header, with a JSON string of [sharp output options](https://sharp.pixelplumbing.com/api-output)
relevant to the output type set in `accept` header. 

## Example usage
### Using defaults
```javascript
fetch("my.domain.io",{
    method: "POST",
    headers: {
      "content-type": "image/jpeg",
      "accept": "image/webp"
    },
    body: arrayBuffer
  });
```
### Setting resize & output options
#### AVIF output
```javascript
fetch("my.domain.io",{
    method: "POST",
    headers: {
      "content-type": "image/jpeg",
      "accept": "image/avif"
      "resize-options": { "width": 750, "withoutEnlargement": true }
      "output-options": { "speed": 8 }
    },
    body: arrayBuffer
  });
```

#### WebP output
```javascript
fetch("my.domain.io",{
    method: "POST",
    headers: {
      "content-type": "image/jpeg",
      "accept": "image/webp"
      "resize-options": { "width": 750, "withoutEnlargement": true }
      "output-options": { "reductionEffort": 6 }
    },
    body: arrayBuffer
  });
```
