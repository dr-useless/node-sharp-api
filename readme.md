# node-sharp-api

## Convert any image with a HTTP POST request
Send a HTTP POST request.

### Example
` 
```javascript
fetch("my.domain.io",{
    method: "POST",
    headers: {
      "content-type": "image/jpeg",
      "accept": "image/avif"
    },
    body: arrayBuffer
  });
```
