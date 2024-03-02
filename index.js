// server.js
require("dotenv").config();
const db = require("./db_access/database").initDB();
const http = require("http");
const app = require("./core/expressServer");
const initializeSocketServer = require("./core/socketServer");

const server = http.createServer(app);
initializeSocketServer(server);

// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
