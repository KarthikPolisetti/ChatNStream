// K:\Projects\ChatBox\backend\src\controllers\auth.controllers.js
//ee file motham frontend lo unna anni create cheskovadaniki and control cheyyadaniki use avthundhi
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser, generateStreamToken } from "../lib/stream.js";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    // Input validation
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a different email" });
    }

    // Generate random avatar
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    // Create user in MongoDB
    const newUser = await User.create({email: normalizedEmail,fullName,password,profilePic: randomAvatar,});

    // Create or update user in StreamChat
    const streamUser = await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });

    if (!streamUser.success) {
      // Optionally, delete the MongoDB user if StreamChat fails
      await User.deleteOne({ _id: newUser._id });
      return res.status(500).json({ message: "Failed to create StreamChat user" });
    }

    console.log(`Stream user created for ${newUser.fullName}`);

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Generate StreamChat token
    const streamToken = generateStreamToken(newUser._id.toString());

    // Set JWT cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Return response with user and Stream token
    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        
        profilePic: newUser.profilePic,
      },
      streamToken,
    });
  } 
  catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: `Signup failed: ${error.message}` });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log("email:", email);
    console.log("password:", password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Generate StreamChat token
    const streamToken = generateStreamToken(user._id.toString());

    // Set JWT cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Return response with user and Stream token
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
      },
      streamToken,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: `Login failed: ${error.message}` });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function  onboard(req,res){

  try {
    const userId=req.user._id
    const{fullName,bio,nativeLanguage,learningLanguage,location}=req.body;
    if(!fullName|| !bio|| !nativeLanguage|| !learningLanguage ||!location){
      return res.status(400).json({
        message:"All fields are required",
        missingFields:[
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativelanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean)})
    }
  const  updatedUser=await User.findByIdAndUpdate(userId,{
    ...req.body,
    isOnboarded:true
  },{new:true})
  if(!updatedUser) return res.status(404).json({message:"User Not Found"})
    res.status(200).json({success:true,user:updatedUser})
  
  try{
    await upsertStreamUser({
      id:updatedUser._id.toString(),
      name:updatedUser.fullName,  
      image:updatedUser.profilePic||"",
    });
  }
  catch (error) {
    console.error("Error updating Stream user during onboarding:", error.message);
    return res.status(500).json({message:"Failed to update Stream user"});
  }

}
 catch (error) {
    console.error("onboarding error",error);
    res.status(500).json({message:"Internal Server Error"});
  }
}