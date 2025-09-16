import { VideoIcon } from "lucide-react";

function CallButton({handleVideoCall}){
    return (
        <div className="p-3 border-b flex items-center justify-end absolute top-4 right-4 z-50">
  <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
    <VideoIcon className="size-6  " />
  </button>
</div>
)
}
export default CallButton;