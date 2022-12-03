const express = require("express");
const app = express();
const http = require("http").Server(app);

const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(express.json());

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

