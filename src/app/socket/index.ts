import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { setupUserStatus } from "./userStatus";
import config from "../config";

const socketSetup = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: config.front_end_url,
      methods: ["GET", "POST"],
    },
  });

  // Set up the user status
  setupUserStatus(io);

  return io;
};

export default socketSetup;
