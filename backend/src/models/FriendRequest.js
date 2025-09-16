import mongoose from 'mongoose';

const friendRequestSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,//The type in sender is the sender's user ID (specifically, a MongoDB ObjectId that points to the user who sent the friend request).
        ref:"User",
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,//The type in sender is the reciever's user ID (specifically, a MongoDB ObjectId that points to the user who sent the friend request).
        ref:"User",
        required:true
    },
    status:{
        type:String,//The status of the friend request, which can be "pending", "accepted", or "rejected".
        enum:["pending","accepted","rejected"],
        default:"pending"
    },
},
{
timestamps:true//This option adds createdAt and updatedAt fields to the schema, which are automatically managed by Mongoose.)
}
);
const FriendRequest=mongoose.model("FriendRequest",friendRequestSchema)
export default FriendRequest;//This line exports the FriendRequest model so it can be used in other parts of the application.
//This code defines a Mongoose schema and model for friend requests in a social networking application. 