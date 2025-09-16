import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

  // This is how we did it at first, without using our custom hook
   export const  useLogin =()=> {
   const queryClient = useQueryClient();
   const {
     mutate,
     isPending,
     error,
   } = useMutation({
     mutationFn:login,
     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
   })
   return {error,isPending,loginMutation:mutate}
};

  // This is how we did it using our custom hook - optimized version