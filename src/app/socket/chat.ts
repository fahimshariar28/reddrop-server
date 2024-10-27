import { Server, Socket } from "socket.io";
import { chatService } from "../modules/chat/chat.service";

export const setupChat = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected for chat: ${socket.id}`);

    // Handle sending messages
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, content } = data;

      const message = await chatService.sendMessage({
        senderId,
        receiverId,
        content,
        delivered: false,
        isDeleted: false,
      });

      // Emit to the receiver and update the sender
      io.to(receiverId).emit("messageReceived", message);
      socket.emit("messageSent", message);
    });

    // Handle marking as delivered
    socket.on("markDelivered", async (messageId) => {
      const message = await chatService.markAsDelivered(messageId);
      if (message) {
        io.to(message.receiverId.toString()).emit("messageDelivered", message);
      }
    });

    // Handle marking as seen
    socket.on("markSeen", async (messageId) => {
      const message = await chatService.markAsSeen(messageId);
      if (message) {
        io.to(message.senderId.toString()).emit("messageSeen", message);
      }
    });

    // Handle unsending (soft delete)
    socket.on("unsendMessage", async (messageId) => {
      const message = await chatService.unsendMessage(messageId);
      if (message) {
        io.to(message.receiverId.toString()).emit("messageUnsent", message);
      }
    });
  });
};
