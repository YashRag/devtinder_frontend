import { useState } from "react";
import UserCard from './UserCard'
import {BASE_URL} from '../utils/constants'
import { useDispatch } from "react-redux";
import {addUser} from '../utils/userSlice'
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [errorm,setError] = useState("");
  const dispatch = useDispatch();
  const saveProfile = async() =>{
    try{
      setError("");
     const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials: true })

     dispatch(addUser(res?.data?.data))
     setError("Success")
    }catch(err){
      console.log(err)
      setError(err.response.data);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="label"></div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="label"></div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="label"></div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              />
              <div className="label"></div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              {/* <input
                type="text"
                value={about}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              /> */}
              <textarea className="textarea textarea-bordered" placeholder="Bio" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
              <div className="label"></div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <div className="label"></div>
            </label>

          
          </div>
          {/* <p className="text-red-500">{errorm}</p> */}
         {(errorm === 'Success' ) ? <SuccessMessage message="Successfully Updated"/> : errorm != "" && <ErrorMessage message={errorm} />} 
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile} >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName,lastName,photoUrl,age,gender,about}} />
    </div>
  )
}

export default EditProfile
