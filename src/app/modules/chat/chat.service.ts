import { ChatMessage } from "./chat.model";

export const chatService = {
  async sendMessage(data: {
    content: string;
    senderId: string;
    receiverId: string;
    delivered: boolean;
    isDeleted: boolean;
  }) {
    const message = new ChatMessage(data);
    return await message.save();
  },

  async markAsDelivered(messageId: string) {
    return await ChatMessage.findByIdAndUpdate(
      messageId,
      { delivered: true },
      { new: true }
    );
  },

  async markAsSeen(messageId: string) {
    return await ChatMessage.findByIdAndUpdate(
      messageId,
      { seenAt: new Date() },
      { new: true }
    );
  },

  async unsendMessage(messageId: string) {
    return await ChatMessage.findByIdAndUpdate(
      messageId,
      { isDeleted: true },
      { new: true }
    );
  },
};
