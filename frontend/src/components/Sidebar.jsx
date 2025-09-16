import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { BellIcon, CalendarHeart, HomeIcon, MessageSquareHeart, ShipWheelIcon, User2Icon, UserPen } from 'lucide-react';
import { Link, useLocation } from "react-router";
import useNotificationCount from "../hooks/useNotificationCount";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
const notificationCount = useNotificationCount();
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
    <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <MessageSquareHeart className="size-8 text-primary" />
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            chatNstream
          </span>
        </Link>
      </div>

      <nav className='flex-1 p-4 space-y-1'>
        <Link 
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath ==="/"?"btn-active":""}`}>
            <HomeIcon className='size-5 text-base-content opacity-70' />
            <span>Home</span>
          </Link>

   

        <Link 
        to="/notifications"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
          currentPath==="/notifications" ?"btn-active" :" " }`}>
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
           {notificationCount > 0 && (
    <span className="badge badge-primary ml-2">{notificationCount}</span>
  )}
      
      </Link>
      <Link to="/scheduled-messages"
      className={`btn btn-ghost w-full justify-start gap-3 px-3 normal-case ${currentPath === "/shedulemessage" ?"btn-active":""}`}
      >
        <CalendarHeart className='size-5 text-base-content opacity-70' />
        <span>Schedule Message</span>
      </Link>

        <Link to="/profile"
      className={`btn btn-ghost w-full justify-start gap-3 px-3 normal-case ${currentPath === "/shedulemessage" ?"btn-active":""}`}
      >
        <UserPen  className='size-5 text-base-content opacity-70' />
        <span>Your  Profile</span>
      </Link>
      </nav>
    </aside>
  );
};

export default Sidebar