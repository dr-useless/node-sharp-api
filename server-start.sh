#!/bin/sh
PATH=$PATH:/volume1/@appstore/Node.js_v12/usr/local/lib/node_modules/forever/bin

sudo cp /usr/syno/etc/certificate/system/default/privkey.pem /volume1/nodeserver/node-sharp-api
sudo cp /usr/syno/etc/certificate/system/default/cert.pem /volume1/nodeserver/node-sharp-api

forever start --append --workingDir /volume1/nodeserver/node-sharp-api --sourceDir /volume1/nodeserver/node-sharp-api -l /volume1/nodeserver/node-sharp-api/logs/log.txt -o /volume1/nodeserver/node-sharp-api/logs/output.txt ./index.js