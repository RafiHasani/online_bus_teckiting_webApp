// socketServer.js
const socketIo = require("socket.io");

function initializeSocketServer(server) {
  try {
    const io = new socketIo(server);
    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("someEvent", (data) => {
        console.log("Received someEvent:", data);
        // Emit response or perform any necessary logic
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = initializeSocketServer;
