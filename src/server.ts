import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import http from "http";
import socketSetup from "./app/socket";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Create an HTTP server to use with Socket.io
    const httpServer = http.createServer(app);

    // Set up socket.io
    socketSetup(httpServer); // Pass the httpServer to the socket setup

    httpServer.listen(config.port, () => {
      console.log(`Red Drop Server is running on port ${config.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
