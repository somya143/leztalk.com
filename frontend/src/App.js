import React from "react";
import './App.css';
import io from "socket.io-client";

let socket ;
const connection_port = "http://localhost:4000";

function App() {
const [loggedin, setLoggedin] =  React.useState(false);
const [userName, setUserName] = React.useState("");
const [room , setRoom] = React.useState("");

const [message , setMessage] = React.useState("");
const [messageList , setMessageList] = React.useState([]);

React.useEffect(() => {
  socket = io.connect(connection_port);
}, [connection_port]);

React.useEffect(() => {
  socket.on("receive_message" , (data) => {
    setMessageList([...messageList , data])
  })
})


const connect_to_room = () => {
  setLoggedin(true)
socket.emit("join_room" , room)
}

const sendMessage = () => {

  let messageContent = {
    room,
    content:{
     author:userName,
    message:message
    }
  }

socket.emit("send_message" , messageContent)
setMessageList([...messageList , messageContent.content]);
setMessage("");

}


  return (
    <div className="App">
     {
      loggedin ?
      (
        <div className="messageContainer">

         <div className="message">
          {
            messageList.map((el) => {
              return ( <p key={el.id}>
                {" "}
                  {el.author}  {el.message}
                  </p>
              
              )
           
            })
          }
         </div>

        <div className="messageBox">
        <input type="text" placeholder="message..." value={message} onChange={(e) => {setMessage(e.target.value)}} />
        
        <button onClick={sendMessage}>Send</button>
        </div>
        
         </div>
      ):
      
      (
        <div className="auth">

        <div className="inputs">
         <input type="text" placeholder="Enter Name...." value={userName} onChange={(e) => {setUserName(e.target.value)}} />
         <input type="text" placeholder="Enter Room...." value={room} onChange={(e) => {setRoom(e.target.value)}} />
         </div>
  
         <div className="button">
          <button onClick={connect_to_room}>Enter to chat</button>
         </div>
       </div>
      )
     }
    

    </div>
  );
}

export default App;
