# sharp-server

## Convert any image with a HTTP POST request
- Send a HTTP POST request
- Let [sharp]:https://github.com/lovell/sharp convert/optimize your image
- Do something with the response

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
