FROM node:alpine

WORKDIR /home/server

COPY package.json .

RUN npm install --only=prod

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]