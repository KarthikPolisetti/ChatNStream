import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";



import { connectDB } from "./lib/db.js";

import scheduledRoutes from "./routes/scheduled.route.js";
import { processScheduledMessages } from "./lib/scheduledSender.js";

const app=express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true, // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/scheduled", scheduledRoutes);



setInterval(() => {
  processScheduledMessages();
}, 10 * 1000); // every minute


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB();
})