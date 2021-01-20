#!/bin/sh

cd /app
npm run build:prod
cp -r /app/build/* /var/www/html/
nginx -g "daemon off;"
