import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        console.log("Token is:"+token)
        if(!token){
            return res.status(401).json({message:"Unauthorized-No token Provided"}); //token raledhu ante token create avvaledhu ani
        }

        //vacchina token ni decode chesi asalu adhi correct na kaadha ani verfiy chesi chepthundhi 
        const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized -Invalud Token"});
        
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"UnauthorizedUser-User Not Found"});
            }
            req.user=user;
           
            next();//paina code lo unna token,decoded,user anni corrct ga unte next method loki velthundhi i.e, auth.route.js lo unna protextRoute tharuvatha unna onboard function call avthundhi 
        }
    catch (error) {
        console.log("Error in ProtectorRoute middleware",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}