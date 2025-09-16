import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import Notifications from './pages/Notifications';
import CallPage from './pages/CallPage';
import Onboarding from './pages/Onboarding';
import ChatPage from './pages/ChatPage';
import toast, { Toaster } from 'react-hot-toast';
import {axiosInstance} from './lib/axios.js';
import PageLoader from './components/PageLoader.jsx';
import  useAuthUser  from './hooks/useAuthUser.js';
import  Layout  from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js';
import ScheduledMessages from './pages/ScheduledMessages.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
const App = () => {
//tanstack query
//axios and the tanstack are the two most popular libraries for data fetching in react
//tanstack query is a data fetching library that helps you fetch, cache, and update data in your react application
//it is a powerful library that helps you manage your server state in your react application
//kinda useQuery undhi kadha adhi okha hooku danni get method kosam vadatham
//useQuery is a hook that helps you fetch data from the server and manage the loading and error states
const {isLoading,authUser}=useAuthUser();
const {theme}=useThemeStore();

const isAuthenticated =Boolean(authUser);//if authUser is undefined or null, isAuthenticated will be false
//if authUser is defined, isAuthenticated will be true
//authUser is the user object that is returned from the server when the user is authenticated
const isOnboarded=authUser?.isOnboarded;

/*
The ? in authUser?.isOnboarded is called optional chaining in JavaScript.

Why use authUser?.isOnboarded?
It safely tries to access isOnboarded only if authUser is not undefined or null.
If authUser is undefined (for example, when the user is not logged in), authUser?.isOnboarded will return undefined instead of throwing an error.
What happens if you don’t use ?
If you write authUser.isOnboarded and authUser is undefined, JavaScript will throw an error:

Summary
authUser?.isOnboarded is safe and prevents runtime errors.
Without ?, your app could crash if authUser is not set.

*/
if(isLoading) return <PageLoader />

//ikkada kinda path ante manam search bar lo enter cheyyadaniki vacche path ni manam path lo pedatham adhe mana project folder lo unna file denni manam akkada display cheyyali anukunnamo danne manam element kinda declare chestham

  return (
    <div className=' h-screen' data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ?(<Layout  showSidebar={true}><HomePage /></Layout> ):(<Navigate to={!isAuthenticated ? "/login":"/onboarding"} /> )} />
        <Route path="/login" element={ !isAuthenticated ? <LoginPage />:<Navigate to="/" />} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}><Notifications /></Layout>) :(<Navigate to={!isAuthenticated ?"/login":"/onboarding"} /> )} />
        <Route path="/signup" element={!isAuthenticated ?<SignUpPage />:<Navigate to="/login" /> }/>
        <Route path="/call/:id" element={isAuthenticated &&isOnboarded ?(<CallPage />):(<Navigate to={!isAuthenticated ? "/login":"/onboarding"}  /> ) }/>
        <Route path="/onboarding" element={isAuthenticated ? (!isOnboarded ? (<Onboarding />) : (<Navigate to="/" />)) : (<Navigate to="/login" />)} />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded  ?(
          <Layout showSidebar={true}>
            <ChatPage />
          </Layout>):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} /> )} />

         
          <Route path="/profile" element={isAuthenticated && isOnboarded ?(
            <Layout showSidebar={true}>
              <ProfilePage />
            </Layout>)
            :(<Navigate to={!isAuthenticated ? "/login" :"/onboarding"} /> )} />
        

        
<Route
  path="/scheduled-messages"
  element={
    isAuthenticated && isOnboarded
      ? (
        <Layout showSidebar={true}>
          <ScheduledMessages />
        </Layout>
      )
      : (
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
      )
  }
/>

        </Routes>
        <Toaster />
        
    </div>
  )
}

export default App
