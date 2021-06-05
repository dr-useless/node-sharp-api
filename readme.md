# node-sharp-api

## Convert any image with a HTTP POST request
Send a HTTP POST request.

### Example
` 
```javascript
const formData = new FormData();


fetch(imageOptimizerAddress,{
    method: "POST",
    headers: {
      "content-type": sourceType,
      "user-agent": "cloudflare-worker-nsphoto-media-store",
      "accept": targetType,
      "authorization": `Bearer ${imageOptimizerAuth}`
    },
    body: data
  });

```
