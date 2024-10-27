import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import http from "http";
import { Server } from "socket.io";
import { UserService } from "./app/modules/user/user.service";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Create an HTTP server to use with Socket.io
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "*", // TODO: Change this to the frontend URL in production
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      const userId = socket.handshake.query.userId as string;

      // Set user as active upon connection
      if (userId) {
        console.log(`User ${userId} is active.`);
        UserService.setUserActive(userId);
      }

      socket.on("disconnect", () => {
        // Set user as inactive upon disconnection
        if (userId) {
          UserService.setUserInactive(userId);
          console.log(`User ${userId} is inactive.`);
        }
      });

      // Handle user disconnecting
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    httpServer.listen(config.port, () => {
      console.log(`RoktoBondhu Server is running on port ${config.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
