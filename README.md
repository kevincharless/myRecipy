# myRecipy
Before Running the App:
1. Make sure to install nodejs

Download the Zip:
1. Extract the zip
2. open the folder that contains client and server folder with visual studio code

Setup Server:
1. Open Terminal, type cd server
2. npm install
3. make new .env file inside server folder
4. copy and paste this code to .env file :
CONNECTION_URL = mongodb://user:user@cluster0-shard-00-00.eezap.mongodb.net:27017,cluster0-shard-00-01.eezap.mongodb.net:27017,cluster0-shard-00-02.eezap.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-qaiocu-shard-0&authSource=admin&retryWrites=true&w=majority
jwtSecret = JWTSecret
5. npm start

Setup Client:
1. Open new Terminal, type cd client
2. npm install
3. npm start
