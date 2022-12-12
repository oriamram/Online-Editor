FROM node:alpine as react-builder

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
