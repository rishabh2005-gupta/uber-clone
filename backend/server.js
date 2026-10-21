const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const http = require('http');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const { initializeSocket } = require("./socket");
const dbConnect = require("./config/dbConnect");


initializeSocket(server);

dbConnect().then(() => {
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
