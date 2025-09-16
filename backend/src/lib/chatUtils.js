import ChatMessage from "../models/ChatMessage.js";

export async function sendMessageToUser(senderId, recipientId, text) {
  await ChatMessage.create({
    sender: senderId,
    recipient: recipientId,
    text,
    sentAt: new Date()
  });
}