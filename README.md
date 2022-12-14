# Online - Coding

## About
A mentor - student website that contains a few code-blocks leading to a code-block page, the code-block page changes in real-time for all of the users.

Link to a live website: https://online-coding-oriamram.herokuapp.com
## Technologies
JavaScript | React - Typescript | MongoDb | Docker | Node.js | Express | WebSocket

## To Run Locally:
### Option 1:
1) add the db uri to the server Dockerfile (shown in the 3rd picture)
2) `docker-compose up`

### Option 2:
### Client:
1) change package.json proxy's host name from 'server' to 'localhost'
2) `npm i`
3) `npm start`

`@uiw/react-textarea-code-editor | highlight.js | socket.io-client | sass | react-icons`
### Server:
1) `npm i`
2) add the db uri to `mongoose.connect(...)` in the server/databaseManager/dbManager instead of `process.env.DB_URI` (shown in the 3rd picture)
3) `npm start`

`axios | cors | dotenv | express | mongoose | nodemon | socket.io`

## Screenshots
![image](https://user-images.githubusercontent.com/97836572/207358768-537db01f-0eea-427f-beb3-618058607906.png)
![image](https://user-images.githubusercontent.com/97836572/207358715-bc7cece0-cd63-4a6c-9e2c-e60fe1f84c9e.png)
![image](https://user-images.githubusercontent.com/97836572/207361606-7a94bfed-12f9-46dd-996c-883b13e78830.png)
![image](https://user-images.githubusercontent.com/97836572/207363038-0403176a-656f-4b78-bc40-8844a351f184.png)

