import React, { useState, useEffect } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CameraIcon, Languages, LoaderIcon, LucideShuffle, MapPinIcon, Maximize, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { LANGUAGES } from '../constants';
const Onboarding = () => {
  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();
  const [formState,setFormState]=useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    coverPicture: authUser?.coverPicture || '',
    location: authUser?.location || '',
   profilePic: authUser?.profilePic || `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}.png`,
  });

  //UseMutation  anedhi oka react hook deeni pani enti ante, it is used to perform mutations like POST, PUT, DELETE requests
  //it is used to perform side effects like updating the server data, creating new data, 
  //In your code, it is used to submit the onboarding form data to the backend.


/*
  mutate:onboardingMutation
  deeni usage enti ante,        
The mutate function (renamed as onboardingMutation in your code) is used to trigger the mutation—that is, to actually send data to the server.

How it works:

When you call onboardingMutation(formState), it runs the mutationFn (completeOnboarding) with the provided data (formState).
This sends the onboarding data to your backend.
If the request succeeds, the onSuccess callback runs (showing the toast message).
Example usage:

Summary:
mutate is the function you call to perform the mutation (e.g., submit a form or send data to the server).

purpose and use of this in rel world and in my project what happens if it is not declared

*/


    const {mutate:onboardingMutation,isPending}=useMutation({
      mutationFn:completeOnboarding,
      onSuccess:() =>{
        toast.success("profile Onboarded  successfully!");
      queryClient.invalidateQueries({queryKey:["authUser"]});
      },

      onError:(error)=>{
        toast.error(error.response.data.message);
      }
    });
      const handleSubmit =(e) =>{
        e.preventDefault();
      onboardingMutation(formState);      }
      ;

      const handleRandomAvatar=()=>{
          const idx=Math.floor(Math.random()*100)+1;
          const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`
          {/*https://avatar.iran.liara.run/public/45.png */}
        setFormState({...formState,profilePic:randomAvatar});
        toast.success("A New Avatar Generated")
        }

      /*

      QueryClient.invalidateQueries({queryKey:["authUser"]});

tells React Query to refetch the data for the ["authUser"] query.

Purpose and Use
In your project:
After onboarding is completed, the user's profile data may have changed.
By invalidating the ["authUser"] query, you force React Query to refetch the latest user data from the server.
This ensures your app always shows the most up-to-date user information.
Real-world example:
Suppose you update a user's profile picture. After the update, you want the UI to show the new picture.
You call invalidateQueries for the user query, so React Query fetches the updated user data and updates the UI.
What happens if you don't declare it?
The cached user data (authUser) will not be updated immediately.
Your app might show old or stale user information until the cache expires or the page is refreshed.
Summary:
invalidateQueries keeps your UI in sync with the server after a mutation. Without it, users may see outdated data. */
    
    

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4' > 
  
  <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
    
    <div className='card-body p-6 sm:p-8 bg-base-100 rounded-xl shadow-lg overflow-hidden' style={{}}>
      <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
     <form onSubmit={handleSubmit} className='space-y-6'>
          {/*Profile Pic  Container*/}

          <div className='flex flex-col items-center justify-center space-y-4'>
          {/*Image Preview */}
          <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                        {formState.profilePic ?(
                          <img 
                          src={formState.profilePic}
                          alt="ProfilePic"
                          className='w-full h-full object-cover'
                          />

                        ) :(
                          <div className='flex items-center justify-center h-full'>
                            <CameraIcon className='size-12 text-base-content opacity-40'/>

                          </div>
                        )}
          </div>

          {/*Generate Random Avatoar BTN */}
                <div className='flex items-center gap-2'>
                    <button type='button' onClick={handleRandomAvatar} className='btn btn-accent w-full bg-gradient-to-r from-primary to-secondary' style={{color:"white"}}>
                      <LucideShuffle className='size-4 mr-2'  />
                      Generate Random Avatar
                    </button>
                </div>
 </div>

 {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

              {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>

     </form>
    </div>

  </div>
</div>
  )
}

export default Onboarding
