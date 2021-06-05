#!/bin/sh
PATH=$PATH:/volume1/@appstore/Node.js_v12/usr/local/lib/node_modules/forever/bin

forever start --workingDir /volume1/nodeserver/node-sharp-api --sourceDir /volume1/nodeserver/node-sharp-api -l /volume1/nodeserver/node-sharp-api/logs/log.txt -o /volume1/nodeserver/node-sharp-api/logs/output.txt .
