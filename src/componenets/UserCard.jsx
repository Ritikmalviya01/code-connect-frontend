import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  if (!user) return null;
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  
  const handleSendRequest = async (status, userId) => {
  try {
  const res = await axios.post(
BASE_URL + "/request/send/" + status + "/" + userId,
  {},
  { withCredentials: true }
  )
  dispatch(removeUserFromFeed(userId) );
  } catch (err) {}
  console.error("bhurr")
}
 return (
    <div><div className="card bg-base-200 w-96 shadow-sm">
    <figure className="px-10 pt-10">
      <img
        src={user.photoUrl}
        alt="User Photo"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
    <div className="flex justify-center ">
    {gender && <p>{gender}</p>}
    { age && <p>, Age - {age}</p> }
    </div>
      <p>{about}</p>
      {/* <p>{skills}</p> */}

      <div className="card-actions justify-center my-5">
        <button className="btn btn-error" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
        <button className="btn btn-primary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>

      </div>
    </div>
  </div></div>
  )
}

export default UserCard