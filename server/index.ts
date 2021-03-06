import { resolve } from "path";

import { app, server } from "./setup";

app.get("/", (req, res) => {
  const indexHTMLLocation = resolve(`./dist/public/index.html`);
  console.log(`Sending ${indexHTMLLocation} to ${req.socket.remoteAddress}`);
  res.sendFile(indexHTMLLocation);
});

// io.on("connection", (socket: SocketIO.Socket) => {
//   console.log("Hello, friend! 👋");

//   handleConnection(socket);
//   handleRegister(socket);

//   handleChat(socket);
//   handleRequestMessages(socket);

//   handleGameState(socket);

//   socket.on("disconnect", (socket: SocketIO.Socket) => {
//     console.log("Goodbye, friend!");
//   });
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} 🚀`);
});
