import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
// import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("pg@gmail.com");
    const [password, setPassword] = useState("@Ritik204");
    const [firstName, setFirstName] = useState("Tejas");
    const [gender, setGender] = useState("male");

    const [lastName, setLastName] = useState("Saran");
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/login", {
                emailId,
                password,
            },
                { withCredentials: true }
            )
            console.log(res.data);

            dispatch(addUser(res.data));
            return navigate("/")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong")
            
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                gender,
                emailId,
                password,
            },
                { withCredentials: true }
            )
            console.log(res.data);

            dispatch(addUser(res.data.data));
            return navigate("/profile")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong")
        }
    }

    return (
        <div className='flex justify-center mt-20' >
            <div className="card bg-base-300 text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div>
                        {!isLoginForm &&
                            <>
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
                                    <legend className="fieldset-legend pt-4">gender</legend>
                                    <input type="text"
                                        value={gender}
                                        className="input"
                                        onChange={(e) => setGender(e.target.value)} />
                                </fieldset>
                            </>
                        }
                        <fieldset className="fieldset pt-">
                            <legend className="fieldset-legend pt-4">Email Id</legend>
                            <input type="text"
                                value={emailId}
                                className="input"
                                onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset ">
                            <legend className="fieldset-legend pt-8">Password</legend>
                            <input type="text"
                                value={password}
                                className="input"
                                onChange={(e) => setPassword(e.target.value)} />

                        </fieldset>

                    </div>

                    <p className='text-red-600'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn bg-primary " onClick={isLoginForm? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="m-auto cursor-pointer p-2" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm
                            ? "New User? Signup Here"
                            : "Existing User? Login Here"}
                                </p>
                </div>
            </div>
        </div>
    )
}

export default Login