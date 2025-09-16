// K:\Projects\ChatBox\backend\src\models\User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//this is for the user mongo schema for the user login and registration
// and also for the user profile information
// it contains the user information like full name, email, password, profile picture, learning language, location, and friends
// it also contains the isOnboarded field to check if the user has completed the onboarding process
// and the friends field to store the user's friends list
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Normalize email to lowercase
    },
    password: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

export default User;