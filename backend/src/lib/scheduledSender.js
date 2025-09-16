import { StreamChat } from "stream-chat";
import ScheduledMessage from "../models/ScheduledMessage.js";

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;
const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export async function processScheduledMessages() {
  const now = new Date();
  const messages = await ScheduledMessage.find({ sent: false, scheduledFor: { $lte: now } });
  for (const msg of messages) {
    try {
      const text = `${msg.template}${msg.customText ? " " + msg.customText : ""}`;
      const channelId = [msg.sender.toString(), msg.recipient.toString()].sort().join("-");
      const channel = streamClient.channel("messaging", channelId, {
        members: [msg.sender.toString(), msg.recipient.toString()],
      });
      await channel.create();
      await channel.sendMessage({
        text,
        user_id: msg.sender.toString(),
      });
      msg.sent = true;
      await msg.save();
    } catch (err) {
      console.error("Error sending scheduled message to Stream:", err);
    }
  }
}