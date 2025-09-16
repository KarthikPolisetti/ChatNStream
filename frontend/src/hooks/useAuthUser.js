import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api.js'; // Adjust the import path as necessary
export const useAuthUser = () => {
  const authUser=useQuery({ queryKey:["authUser"], queryFn:getAuthUser, retry:false,});

  return { isLoading:authUser.isLoading,  authUser:authUser.data?.user } }

export default useAuthUser

//what is use Query why and where does it is used?
/*
useQuery

is a React hook provided by the React Query library (@tanstack/react-query).
It is used to fetch, cache, and manage server data in React applications.

Why is useQuery used?
Data Fetching: It helps you fetch data from APIs or servers.
Caching: Automatically caches fetched data to improve performance.
State Management: Manages loading, error, and success states for you.
Automatic Refetching: Can refetch data when needed (e.g., on window focus).
Where is useQuery used?
In React components or custom hooks (like your useAuthUser hook) whenever you need to fetch and manage remote data.
Example usage:

In your code, useQuery is used inside a custom hook to fetch the authenticated user’s data and expose its loading state. */




/*1. queryKey
In your project:
queryKey: ["authUser"]
This is a unique identifier for the query. React Query uses it to cache and manage the data for this specific request.
Real-world example:
If you fetch a list of products, you might use queryKey: ["products"]. If you fetch a specific product, you might use queryKey: ["product", productId]. */

/*2. queryFn
In your project:
queryFn: getAuthUser
This is the function that actually fetches the data (e.g., makes an API call to get the authenticated user).
Real-world example:
For products, you might use queryFn: fetchProducts or queryFn: () => fetchProductById(productId). */


/*
3. retry
In your project:
retry: false
This tells React Query not to retry the request if it fails.
Real-world example:
For some queries (like authentication), you might not want to retry on failure. For others (like fetching a product list), you might want to retry a few times if the network is unstable, e.g., retry: 3.
 */