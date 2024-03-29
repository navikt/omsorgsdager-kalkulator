FROM node:18-alpine

WORKDIR /usr/src

COPY dist ./dist
COPY server.js .
COPY node_modules ./node_modules
COPY package.json .
COPY src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY envSettings.js ./envSettings.js

EXPOSE 8080
CMD ["npm", "run", "start-express"]
