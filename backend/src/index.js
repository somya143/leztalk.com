const express = require("express");
const mongoose= require("mongoose");
const app = express();
const http = require("http").Server(app);
const users = require("./features/users/users.routes");
const cors = require("cors");
const PORT =  4000;

app.use(cors());
app.use(express.json());
app.use("/users" , users);

mongoose.set('strictQuery', true)

mongoose.connect("mongodb://127.0.0.1:27017/b21", {
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => {
  console.log("DB connected successfully");
}).catch((err) => {
  console.log(err.message);
})

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

let totalUsers =0;
socketIO.on('connection', (socket) => {
  totalUsers+=1;
  console.log(`⚡: ${socket.id} user just connected! , total users: ${totalUsers}`);

  socket.on("join_room" , (data) => {
    socket.join(data);
    console.log(`User joined room : ${data}`)
  });

  socket.on("send_message" , (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message" , data.content)
  })

  socket.on('disconnect', () => {
    totalUsers-=1;
    console.log(`🔥: A user disconnected, total users: ${totalUsers}`);
  });
});

app.get("/api" , (req,res) => {
    res.send("hello world")
})

 http.listen(PORT , () => {
    console.log(`Listening to http://localhost:${PORT}`)
})

