import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState((user.age || ""))
    const [gender, setGender] = useState((user.gender || ""))
    const [about, setAbout] = useState(user.about)
    const dispatch = useDispatch()




    const handleEditProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true }
            )
            dispatch(addUser(res?.data?.data))
        } catch (error) {

        }
    }

    return (
        <div className='flex justify-center my-10 gap-20 align-middle'>
            <div className='flex justify-center ' >
                <div className="card bg-base-300 text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <fieldset className="fieldset pt-">
                                <legend className="fieldset-legend pt-4">First Name</legend>
                                <input type="text"
                                    value={firstName}
                                    className="input"
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset pt-">
                                <legend className="fieldset-legend pt-4">Last Name</legend>
                                <input type="text"
                                    value={lastName}
                                    className="input"
                                    onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset pt-">
                                <legend className="fieldset-legend pt-4">Photo</legend>
                                <input type="text"
                                    value={photoUrl}
                                    className="input"
                                    onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>


                            <fieldset className="fieldset pt-">
                                <legend className="fieldset-legend pt-4">Age</legend>
                                <input type="text"
                                    value={age}
                                    className="input"
                                    onChange={(e) => setAge(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset pt-">
                                <legend className="fieldset-legend pt-4">Gender</legend>
                                <select defaultValue="Pick a color" className="select" value={gender}
                                 onChange={(e) => setGender(e.target.value)}>
                                
                                <option>male</option>
                                <option>female</option>
                                <option>others</option>
                            </select>
                            </fieldset>
                            

                         

                            <fieldset className="fieldset pt-">
                                <legend className="fieldset-legend pt-4">About</legend>
                                <input type="text"
                                    value={about}
                                    className="input"
                                    onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>




                        </div>

                        <div className="card-actions justify-end">
                            <button className="btn bg-primary" onClick={handleEditProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
        </div>
    )
}

export default EditProfile