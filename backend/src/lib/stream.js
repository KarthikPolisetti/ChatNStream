import { StreamChat } from "stream-chat";
import "dotenv/config";

const apikey = process.env.Chat_N_Stream_Api_Key;
const apiSecret = process.env.Chat_N_Stream_Api_Secret;

// Validate API key and secret
if (!apikey || !apiSecret) {
  console.error("Stream API key or secret is missing");
  throw new Error("Stream API key or secret is not configured");
}

// Initialize StreamChat client
let streamClient;
try {
  streamClient = StreamChat.getInstance(apikey, apiSecret);
  console.log("StreamChat client initialized successfully");
} catch (error) {
  console.error("Failed to initialize StreamChat client:", error.message);
  throw new Error("StreamChat client initialization failed");
}

export const upsertStreamUser = async (userData) => {
  console.log("Inside upsertStreamUser function, userData:", userData);
  try {
    // Validate userData
    if (!userData.id || !userData.name) {
      throw new Error("userData must include id and name");
    }

    // Ensure id is a string
    const formattedUserData = {
      id: String(userData.id),
      name: userData.name,
      image: userData.image || "",
    };

    // Call StreamChat upsertUsers
    const response = await streamClient.upsertUsers([formattedUserData]);
    console.log("StreamChat upsertUsers response:", response);
    return { success: true, data: formattedUserData };
  } catch (error) {
    console.error("Error upserting Stream user:", error.message);
    throw new Error(`Failed to upsert Stream user: ${error.message}`);
  }
};

export const generateStreamToken = (userId) => {
  try {
    // Generate a token for the user
    const userIdStr=userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error.message);
    throw new Error(`Failed to generate Stream token: ${error.message}`);
  }
};