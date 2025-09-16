import express from 'express';  
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendRequests } from '../controllers/user.controller.js';
import { updateProfile } from "../controllers/user.controller.js";
const router=express.Router();

router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-requests/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendRequests);

router.patch("/profile", protectRoute, updateProfile);

export default router;