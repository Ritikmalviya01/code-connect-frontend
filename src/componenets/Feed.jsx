import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addFeed} from "../utils/feedSlice"
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();
  // const [counter, setCounter] = useState(0);

  const getFeed = async () => {
    if(feed) return ;
   try {
    const res = await axios.get("http://localhost:3000/feed", {withCredentials: true});
    dispatch(addFeed(res.data));
   } catch (error) {
    console.error("Error fetching feed:");
  } 
  };

  useEffect(() => {
    getFeed();
  }, []);
if (!feed) return ;
if (feed.data.length <= 0) return <h1 className='text-warning text-center text-bold text-4xl my-10 '>No New Users Found</h1>
  return (
  feed && (
    <div className='flex justify-center mt-11'>
      <UserCard user={feed.data[0]} />
    </div>
  )
)
}

export default Feed