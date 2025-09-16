import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createScheduledMessage,
  getMyScheduledMessages,
  getUserFriends
} from "../lib/api";
import toast from "react-hot-toast";

const TEMPLATES = [
  "Happy Birthday",
  "Happy Anniversary",
  "Good Morning",
  "Good Afternoon",
  "Good Evening",   
    "Good Night",
  "Congratulations",
  "Best Wishes",
  "Happy New Year",
  "Happy Holidays",   
];

const ScheduledMessages = () => {
  const [form, setForm] = useState({
    recipient: "",
    template: TEMPLATES[0],
    customText: "",
    scheduledFor: ""
  });

  // Fetch only friends for recipient selection
  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["userFriends"],
    queryFn: getUserFriends
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createScheduledMessage,
    onSuccess: () => {
      toast.success("Message scheduled!");
      setForm({
        recipient: "",
        template: TEMPLATES[0],
        customText: "",
        scheduledFor: ""
      });
    },
    onError: () => toast.error("Failed to schedule message")
  });

  const { data: scheduledMessages = [] } = useQuery({
    queryKey: ["scheduledMessages"],
    queryFn: getMyScheduledMessages
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Schedule a Message</h2>
      <form
        className="space-y-4"
        onSubmit={e => {
          e.preventDefault();
          mutate(form);
        }}
      >
        <div>
          <label className="block mb-1 font-semibold">Recipient</label>
          <select
            className="input input-bordered w-full"
            value={form.recipient}
            onChange={e => setForm({ ...form, recipient: e.target.value })}
            required
            disabled={friendsLoading}
          >
            <option value="">Select a friend</option>
            {Array.isArray(friends) && friends.map(u => (
              <option key={u._id} value={u._id}>
                {u.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Template</label>
          <select
            className="input input-bordered w-full"
            value={form.template}
            onChange={e => setForm({ ...form, template: e.target.value })}
          >
            {TEMPLATES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Custom Text (max 20 chars)</label>
          <input
            className="input input-bordered w-full"
            type="text"
            maxLength={20}
            value={form.customText}
            onChange={e => setForm({ ...form, customText: e.target.value })}
            placeholder="Add name, emoji, etc."
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Date & Time</label>
          <input
            className="input input-bordered w-full"
            type="datetime-local"
            value={form.scheduledFor}
            onChange={e => setForm({ ...form, scheduledFor: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
          Schedule Message
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-8 mb-2">Your Scheduled Messages</h3>
      <ul>
        {scheduledMessages.map(msg => (
          <li key={msg._id} className="mb-2">
            <span className="font-bold">{msg.template}</span>{" "}
            {msg.customText && <span>{msg.customText}</span>} to{" "}
            <span className="font-semibold">{msg.recipient?.fullName}</span> at{" "}
            <span>{new Date(msg.scheduledFor).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledMessages;