const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);
const io = socketio(server);

//Add JWT token to project(yarn add jsonwebtoken)
//Return token when login
//Send token on request
//Create function to project routers
//Add function/widdleware to routers
//Modify response to decode the token

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("MongoDB is connected!");
}catch(error) {
  console.log(error);
}

const connectUsers = {};

io.on('connection', socket => {
  // console.log(socket.handshake.query);
  // console.log('User is connected', socket.id)
  //io.emit('sokhom', {data: "hello sokhom"})
  const {user} = socket.handshake.query;
  connectUsers[user] = socket.id;
})
//app.use()
app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;
  return next();
})

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
