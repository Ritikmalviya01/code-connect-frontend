import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestsSlice'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
  const requests = useSelector((store) => store.requests)
   const dispatch = useDispatch()
 
const reviewRequest = async (status, _id ) =>{
  try {
    const res = axios.post(BASE_URL + "/request/review/" + status +"/"+ _id, {}, {withCredentials:true}) 
    dispatch(removeRequest(_id))
  } catch (error) {
    
  }
}




  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {withCredentials: true})
      
      dispatch(addRequests(res.data.data))
    } catch (error) {
      console.error(Error)
    }
  };


  useEffect(() => {
fetchRequests()
  }, []);

  if (!requests) return ;

  if (requests.length === 0)  return <h1 className=' text-center my-10 text-warning text-bold text-4xl'>No Request Found</h1>

  return (
    <div className='text-center my-10'>
    <h2 className='text-warning text-bold text-4xl' >Requests</h2>

      
      {requests.map((request) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                return (
                  <div key={_id}>

                    <div className=" w-1/2  flex-col  m-auto mt-9 ">
                        <div className="card bg-accent-content rounded-box h-28 flex  ">

                            <div className='flex m-5 ml-6 justify-between'><img alt="photo" className='w-20 h-full rounded-full' src={photoUrl} />
                                <div className='text-left  ml-14'>
                                    <h2 className='text-bold text-warning text-2xl'>{firstName + " " + lastName}</h2>
                                    <p>Age - {age + ", " + gender} </p>

                                    <p >{about}</p>
                                </div>
                                <div className='flex flex-col gap-1 '>
                                <button className="btn btn-outline btn-warning" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                <button className="btn btn-outline btn-error" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                </div>
                            </div>
                        </div>


                    </div>
                    </div>


                )
                
            }
            
            )}



    </div>
  )
  
}

export default Requests