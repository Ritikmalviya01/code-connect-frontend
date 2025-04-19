import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'


const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch()
    const fetchConnections = async () => {
        try {
            const res = await axios.get( BASE_URL + "/user/connections", {
                withCredentials: true,
            })
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.error("error")
        }
    }
    useEffect(() => {
        fetchConnections()
    }, []);

    if (!connections) return

    if (connections.length === 0) return <h1>No Connectiond Found </h1>

    return (
        <div className='text-center my-10'>
            <h2 className='text-warning text-bold text-4xl' >Connections</h2>

            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
                return (
                    <div key={_id} >
                        <div className=" w-1/2  flex-col  m-auto mt-9 ">
                            <div className="card bg-accent-content rounded-box h-28 flex justify-evenly ">

                                <div className='flex m-5 ml-6 '><img alt="photo" className='w-20 h-full rounded-full' src={photoUrl} />
                                    <div className='text-left  ml-14'>
                                        <h2 className='text-bold text-warning text-2xl'>{firstName + " " + lastName}</h2>
                                        <p>Age - {age + ", " + gender} </p>

                                        <p >{about}</p>

                                    </div>
                                    <div className='flex m-auto mr-9'>
                                        <Link to={`/chat/${_id}`}>
                                            <button className='btn btn-primary'>Chat</button>
                                        </Link>
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


export default Connections