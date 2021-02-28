#!/usr/bin/env sh

if [ "$NODE_ENV" == "production" ]; then
	npm install --only=prod --silent
	npm run build
	exec npm run start
else
	npm install --silent
	exec npm run dev
fi
