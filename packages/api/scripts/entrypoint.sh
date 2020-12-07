#!/usr/bin/env sh

npm install --silent

npm run build
exec npm run start
