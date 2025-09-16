import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className=" h-screen flex flex-col items-center justify-center p-4">
      <LoaderIcon className="animate-spin size-10  text-primary" />
      <p className="mt-4 text-center text-lg font-mono">Connecting to Chat.....</p>
      <span className="ml-2 text-gray-500">Loading chat...</span>
    </div>
  );
}
export default ChatLoader;