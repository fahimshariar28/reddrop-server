// app/socket/userStatus.ts
import { Server } from "socket.io";
import { UserService } from "../modules/user/user.service";

export const setupUserStatus = (io: Server) => {
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
  });
};
