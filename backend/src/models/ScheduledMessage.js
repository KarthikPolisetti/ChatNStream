import mongoose from "mongoose";

const scheduledMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  template: { type: String, required: true },
  customText: { type: String, maxlength: 20 },
  scheduledFor: { type: Date, required: true },
  sent: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("ScheduledMessage", scheduledMessageSchema);