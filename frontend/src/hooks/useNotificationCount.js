import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

export default function useNotificationCount() {
  const { data } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  return data?.incomingReqs?.length || 0;
}