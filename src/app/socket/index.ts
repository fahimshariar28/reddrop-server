import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { setupUserStatus } from "./userStatus";
import { setupNotifications } from "./notifications";

const socketSetup = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // TODO: Change this to the frontend URL in production
      methods: ["GET", "POST"],
    },
  });

  // Set up the user status
  setupUserStatus(io);

  // Set up the notifications
  setupNotifications(io);

  return io;
};

export default socketSetup;
