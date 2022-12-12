FROM node:alpine

WORKDIR /home/server

COPY package.json .

RUN npm install --only=prod

COPY . .

CMD [ "npm", "start" ]