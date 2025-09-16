import axios from "axios";
import{ axiosInstance } from "../lib/axios";


export const login=async (loginData)=>{
  const response=await axiosInstance.post("/auth/login",loginData);
  /*It sends an HTTP POST request to your backend at the /auth/login endpoint.
    It includes loginData (usually an object with { email, password }) as the request body.
    await waits for the backend to respond.
    The response (which usually contains user info and/or a token) is stored in the response variable */
    return response.data;
}


export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};
export const completeOnboarding = async (userData) => {
  try{
    const response= await axiosInstance.post("/auth/onboarding",userData);
    return response.data;
  }
  catch (error) {
    console.error("Error in completeOnboarding:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }   
}

export const signup = async (signUpData) => {
  try{
    const response= await axiosInstance.post("/auth/signup",signUpData);
    return response.data;
  }
  catch (error) {
    console.error("Error in signing Up:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }   
}

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export async function getUserFriends() {
  const response=await axiosInstance.get("/user/friends");
  return response.data;
}

export async function getRecommendedUsers() {
 
    const response = await axiosInstance.get("/user");
    return response.data;
}

export async function getOutgoingFriendRequests(){
  const response=await axiosInstance.get("/user/outgoing-friend-requests");
  return response.data
}

export async function sendFriendRequest(userId){
  const response=await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data
}

export async function getFriendRequests(){
  const response=await axiosInstance.get(`/user/friend-requests`);
  return response.data
}

export async function acceptFriendRequest(requestId){
  const response=await axiosInstance.put(`/user/friend-requests/${requestId}/accept`);
  return response.data
}
export async function getStreamToken() {
     const response = await axiosInstance.get("/chat/token");
    return response.data;

}

export async function createScheduledMessage(data) {
  const response = await axiosInstance.post("/scheduled", data);
  return response.data;
}

export async function getMyScheduledMessages() {
  const response = await axiosInstance.get("/scheduled");
  return response.data;
}

export async function getAllUsers() {
  const response = await axiosInstance.get("/user");
  return response.data;
}