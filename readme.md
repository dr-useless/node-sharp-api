/**

 * FILE INPUT: form-data file field named input-file
 * TARGET FORMAT: set accept request header with desired MIME type.
 *  */
 eg: image/webp or image/avif


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