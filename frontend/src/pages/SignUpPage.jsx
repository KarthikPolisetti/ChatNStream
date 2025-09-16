import React from 'react'
import { MessageSquareHeart } from 'lucide-react';
import { Link } from "react-router-dom";
import  usesignUp  from '../hooks/useSignUp';
const SignUpPage = () => {
  const [signupData,setSignUpData]=React.useState({
    fullName:"",
    email:"",
    password:"",
  });
  {/*React Query is a popular library for React that helps you fetch, cache, update, and synchronize data from a server (like APIs) in your React applications.

What does React Query do?
Fetches data from APIs easily using hooks like useQuery and useMutation.
Caches the data so your app doesn’t have to refetch it every time.
Keeps data up-to-date by automatically refetching or invalidating cache when needed.
Manages loading and error states for you, so you can show spinners or error messages easily.
Simplifies server state management (data that lives on your server, not just in your React state).
*/}
  const { isPending, error, signupMutation } = usesignUp();

  const handleSignup =(e)=>{
    e.preventDefault();
    signupMutation(signupData);
    // Here you would typically send the signupData to your backend API
  }
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 "  data-theme="" >
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto  bg-base-100 rounded-xl shadow-lg overflow-hidden' style={{boxShadow:"0 40px 20px rgba(0, 0, 0, 0.1)"}}>
      {/*Sign Up from the Left */}
      <div className='w-full lg:w-1/2 p-8 sm:p-8 flex flex-col'>
      <div className='mb-4 flex items-center justify-start gap-2'>
  
        <MessageSquareHeart className="size-9 text-primary" />
        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
        chatNstream
        </span>
      </div>

      {error && (
        <div className='alert alert-error mb-4'>
          <span>{error.response.data.message}</span>
          </div>
      )}


      <div className='w-full'>
          <form  onSubmit={handleSignup}>
            <div className='space-y-4'>
                 <div>
                  <h2 className="text-xl font-semibold">Create An Account</h2>
                 <p className='text-sm opacity-70'>Join ChatNStream and start to Connect, Converse, and Collaborate </p>
                 </div>

      <div className="space-y-3">
            {/*Full Name*/}
              <div className="form-control w-full">
                  <label className="label">
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input type='text'
                   placeholder='shiva'
                   className='input input-bordered w-full'
                   value={signupData.fullName}
                   onChange={(e)=>setSignUpData({...signupData,fullName:e.target.value})  }
                  required
                  />
              </div>

            {/*Email*/}
               <div className="form-control w-full">
                  <label className="label">
                    <span className='label-text'>Email</span>
                  </label>
                  <input type='email'
                   placeholder='shiva@gamil.com'
                   className='input input-bordered w-full'
                   value={signupData.email}
                   onChange={(e)=>setSignUpData({...signupData,email:e.target.value})  }
                  required
                  />
              </div>

            {/*Password*/}
             <div className="form-control w-full">
                  <label className="label">
                    <span className='label-text'>Password</span>
                  </label>
                  <input type='password'
                   placeholder='********'
                   className='input input-bordered w-full'
                   value={signupData.password}
                   onChange={(e)=>setSignUpData({...signupData,password:e.target.value})  }
                  required
                  />
                  <p className='text-xs opacity-70 mt-1'>Password must be atleast 6 characters</p>
              </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type='checkbox' className='checkbox checkbox-sm' required/>
                    <span className='text-xs leading-tight'>
                      I agree to the {""}
                      <span className='text-primary hover:underline'>terms of service</span> and {" "}
                      <span className='text-primary hover:underline'>privacy policy</span>
                      </span>
                    </label>
                </div>
                <button className='btn btn-primary w-full' type='submit'>
                  {isPending ?(
                    <>
                    <span className='loading loading-spinner'></span>
                    Creating Account...
                    </>
                  ):( "Create Account")}
                </button>

                <div className='text-center mt-4'> 
                    <p className="text-sm">Already have an account?{" "} <Link to="/login" className="text-primary hover:underline">Sign In</Link></p>
                </div>

      </div>

            </div>
          </form>
      </div>

    </div>
      {/*Sign Up from the Right */}
    <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
              <div className='max-w-md p-8'>
                {/*Illustration*/ }
                <div className='relative aspect-square max-w-sm mx-auto'>
                  <img src="/Sign up-bro.png" alt="Sign Up Illustration" className='w-full h-full object-cover rounded-lg shadow-lg' />
                </div>

              <div className='text-center space-y-3 mt-6'>
                <h2 className='text-xl font-semibold '>Welcome to ChatNStream</h2>
                <p className=' opacity-70 '>Connect with friends, share your thoughts, and explore new ideas. Join our community today!</p>
              </div>

              </div>
    </div>

    </div>
    </div>
  )
}

export default SignUpPage;
