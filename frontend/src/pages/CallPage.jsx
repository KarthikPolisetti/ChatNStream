import React, { use, useEffect, useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { useQueries, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PageLoader from "../components/PageLoader";
import { useNavigate, useParams } from "react-router";
import{
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks
} from '@stream-io/video-react-sdk';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { getStreamToken } from '../lib/api';

const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY;
const CallPage = () => {
const {id:callId} =useParams();
const [client,setClient]=useState(null);
const [call,setCall]=useState(true);
const [isConnecting,setIsConnecting]=useState(true);

const {authUser,isLoading}=useAuthUser();


const {data:tokenData}=useQuery({
  queryKey:['streamToken'],
  queryFn:getStreamToken,
  enabled:!!authUser // Only fetch the token if authUser is available
});


useEffect(() =>{
      const initCall=async() =>{
        if(!tokenData.token || !authUser || !callId) return;

        try{
          console.log("Initializing ChatnStream video call client... ");

          const user={
            id:authUser._id,
            name:authUser.fullName,
            image:authUser.profilePic
          }
          const videoClient=new StreamVideoClient({
            apiKey:STREAM_API_KEY,
            user,
            token:tokenData.token
          })

          const callInstance=videoClient.call("default",callId);

          await callInstance.join({create:true});
          console.log("Call joined successfully");

          setClient(videoClient);
          setCall(callInstance);
        }

        catch(error){
            console.error("Error joining call:", error);
            toast.error("Failed to join call. Please try again later.");
        }

        finally{
          setIsConnecting(false);
        }
      };
      initCall();
},[tokenData,authUser,callId]);

if(isLoading || isConnecting) return <PageLoader />

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      
      <div className='relative '>
              {client &&call ?(
                <StreamVideo client={client} >
                    <StreamCall call={call}>
                      <CallContent />
                    </StreamCall>
                </StreamVideo>
              ):(
                <div className='flex items-center justify-center h-full'>
                  <p>Could not initialize call.please refresh or try again later.</p>
                  </div>
              )}
      </div>
    </div>
  )
}


const CallContent =() =>{

  const {useCallCallingState}=useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate=useNavigate();
  if(callingState === CallingState.LEFT) return navigate("/")// idhi enduku ante call button nokka gane cut aipothundhi kadha ala avvagane homepage loki vellipovali anduku denni vaduthunnam
    return(
      <StreamTheme>
          <SpeakerLayout />
          <CallControls />
      </StreamTheme>
  )
}


export default CallPage
