import ScheduledMessage from "../models/ScheduledMessage.js";

export async function createScheduledMessage(req, res) {
  try {
    const { recipient, template, customText, scheduledFor } = req.body;
    const sender = req.user.id;
    if (!recipient || !template || !scheduledFor) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const msg = await ScheduledMessage.create({
      sender,
      recipient,
      template,
      customText,
      scheduledFor: new Date(scheduledFor) // <-- Ensure it's a Date object
    });
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: "Failed to schedule message" });
  }
}


export async function getMyScheduledMessages(req, res) {
  try {
    const messages = await ScheduledMessage.find({ sender: req.user.id }).populate("recipient", "fullName profilePic");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scheduled messages" });
  }
}