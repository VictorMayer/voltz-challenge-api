FROM node:14.16.1

WORKDIR src/

COPY package*.json ./

ENV NODE_ENV=dev

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]