import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLOginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
      console.log(res.data);
    } catch (err) {
      setError(err?.response?.data || "Something Went wrong");
      console.error(err);
    }
  };

  const handleSignUp = async()=>{
    try{
       const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
       console.log(res)
       dispatch(addUser(res.data.data));
       return navigate("/profile");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
{ !isLoginForm &&<>
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
            </label></>
}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <div className="label"></div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="label"></div>
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
             {isLoginForm ? "Login" : "SignUp"} 
            </button>
          </div>

          <p className="flex justify-center my-5 cursor-pointer" onClick={()=>setIsLOginForm(value=>!value)}>{isLoginForm ? "New User? Signup here" : "Existing User ? Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// -1.03.27
