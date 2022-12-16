import { Server } from "socket.io";

export default function handler(req, res) {
  //if the socket connection has already started then end the connection
  if (res.socket.server.io) {
    console.log("socket has already been initialized");
    res.end();
    return;
  }
  //otherwise start the connection

  //instantiate the socket connection
  const io = new Server(res.socket.server, {
    cors: "*",
  });
  //pass the connection to the response to initialize it
  res.socket.server.io = io;

  //listen to event of any user connected to the client
  io.on("connection", (socket) => {
    //listens to event pass message which receives a message through user props
    socket.on("passMessage", ({ message }) => {
      //emit a message to other users connected except itself
      socket.broadcast.emit("sentMessage", { message });
    });
  });
  //end the socket connection
  res.end();
}
