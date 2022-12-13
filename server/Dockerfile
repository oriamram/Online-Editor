FROM node:alpine

WORKDIR /home/server

COPY package.json .

RUN npm install --only=prod

ENV DB_URI="..............................." 

COPY . .

CMD [ "npm", "start" ]