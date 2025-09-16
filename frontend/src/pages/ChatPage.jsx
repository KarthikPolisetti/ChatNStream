/*
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router";
import useAuthUser from "../hooks/useAuthUser.js";
import { getStreamToken } from '../lib/api.js';
import{
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList, 
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';

import ChatLoader from '../components/ChatLoader.jsx';
import { useQuery } from '@tanstack/react-query';

import CallButton from '../components/CallButton.jsx';
const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const {id:targetUserId} =useParams();

  const [chatClient,setChatClient]=useState(null);
  const [channel,setChannel]=useState(null);
  const [loading,setLoading]=useState(true);

  const {authUser}=useAuthUser();

  const {data:tokenData}=useQuery({
    queryKey:['streamToken'],
    queryFn:getStreamToken,
    enabled:!!authUser // Only fetch the token if authUser is available
  })

  useEffect(() =>{
    const initChat=async() =>{
      if(!tokenData?.token || !authUser) return;

      try{
      
      const client=StreamChat.getInstance(STREAM_API_KEY);
      await client.connectUser({
        id:authUser._id,
        name:authUser.fullName,
        image:authUser.profilePic,
      },tokenData.token);

      const channelId=[authUser._id,targetUserId].sort().join("-");
      

       //for example in chat you and me are there 
      // if i started  the chat =>channelId:["myId","yourId"]
      //if u started the chat =>channelId:["yourId,"myId"] (without the sort method it will be different for both of us but it should be same to keep it same we use the sort method in js After using the sort method)=> [myId,yourId]
    
      const currChannel=client.channel("messaging",channelId,{
        members:[authUser._id,targetUserId],

      });
      await currChannel.watch();
      setChatClient(client);
      setChannel(currChannel);
    }

      catch (error) {
        console.error("Error connecting to chat:");
        toast.error("Failed to connect to chat. Please try again later.");
      }


      finally {
        setLoading(false);
      }

  };

    initChat();},[tokenData,authUser,targetUserId]);

    const handleVideoCall =() =>{
      if(channel){
        const callUrl=`${window.location.origin}/call/${channel.id}`;
        channel.sendMessage({
          text:` 'I' have started a video call Join me here: ${callUrl}`,
        })

        toast.success("Video call link sent successfully!");
      }
    }
    
       
  if(loading || !chatClient || !channel) return <ChatLoader />
    
   



  return (
    <div className="h-[93vh]">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>

        <div className='w-full relative'>
        <CallButton handleVideoCall={handleVideoCall}/>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus/>
            <Thread />
          </Window>
        </div>


          </Channel>
          </Chat>
    </div>
  )
}

export default ChatPage

*/


import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser.js";
import { getStreamToken } from '../lib/api.js';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';

import ChatLoader from '../components/ChatLoader.jsx';
import { useQuery } from '@tanstack/react-query';

import CallButton from '../components/CallButton.jsx';
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser // Only fetch the token if authUser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error connecting to chat:", error);
        toast.error("Failed to connect to chat. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
    // Cleanup on unmount
    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
    // eslint-disable-next-line
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I have started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
              <Thread />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;