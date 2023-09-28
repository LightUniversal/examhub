import React, { useEffect, useState } from "react";
import {
  FaBookReader,
  FaBuilding,
  FaEnvelope,
  FaFacebook,
  FaLevelUpAlt,
  FaLock,
  FaSignInAlt,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { Form, useNavigate, Link } from "react-router-dom";
import { useRegisterMutation, useProfileImageMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [facebook, setFacebook] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoding }] = useRegisterMutation();
  const [profileImage, { isLoading: loadingProfileImage }] = useProfileImageMutation()
  const { userinfo } = useSelector((state) => state.auth);

  useEffect(
    () => {
      if (userinfo) {
        navigate("/");
      }
    },
    [userinfo, navigate]);
  const submitHandler = async (e) => {
    if (password !== cpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          email,
          password,
          name,
          facebook,
          department,
          level,
        }).unwrap();
        // The unwrap extracts values
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Welcome to Exam...");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const uploadProfileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await profileImage(formData).unwrap();
      toast.success(res.message);
      // setProfile(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }
  return (
    <div>
      <Form
        className=" text-white w-11/12 mx-auto border border-slate-200 rounded-md shadow-md px-4 py-3"
        onSubmit={
          submitHandler
        }
      >
        <div className="name my-3">
          <label htmlFor="name" className=" flex items-center text-black font-bold">
            Name <FaUser className=" mx-1" />
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className=" w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="email my-3">
          <label htmlFor="email" className=" flex items-center text-black font-bold">
            Email <FaEnvelope className=" mx-1" />
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className=" w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="password my-3">
          <label
            htmlFor="password"
            className=" flex items-center text-black font-bold"
          >
            Password <FaLock className=" mx-1" />
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="cpassword my-3">
          <label
            htmlFor="cpassword"
            className=" flex items-center text-black font-bold"
          >
            Confirm Password <FaLock className=" mx-1" />
          </label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            className="w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="confrim password"
            value={cpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className="faculty my-3">
          <label
            htmlFor="faculty"
            className=" flex items-center text-black font-bold"
          >
            Lets Connect to Facebook <FaFacebook className=" relative -top-0.5 mx-2" />
          </label>
          <input
            type="text"
            name="facebook"
            id="facebook"
            className="w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="Enter your facebook name"
            value={facebook}
            onChange={(e) => {
              setFacebook(e.target.value);
            }}
          />
        </div>
        <div className="twitter my-3">
          <label
            htmlFor="twitter"
            className=" flex items-center text-black font-bold"
          >
            Department  <FaBookReader className=" relative -top-0.5 mx-2" />
          </label>
          <input
            type="text"
            name="department"
            id="department"
            className="w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="Enter your department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          />
        </div>
        <div className="level my-3">
          <label
            htmlFor="level"
            className=" flex items-center text-black font-bold"
          >
            Level  <FaLevelUpAlt className=" relative -top-0.5 mx-2" />
          </label>
          <input
            type="number"
            name="level"
            id="level"
            className="w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="Enter your Level"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
        </div>
        {/* <div className="profile my-3">
          <label
            htmlFor="profile"
            className=" flex items-center text-black font-bold"
          >
            Profile <FaUser className=" mx-1" />
          </label>
          <input type="file" name="image" id="image" onChange={uploadProfileHandler} className="w-full h-11 rounded text-slate-200 bg-slate-800 p-2 my-1"/>
          <input
            type="text"
            name="image"
            id="profile"
            className="w-full h-11 rounded text-slate-200 bg-slate-700 px-2"
            placeholder="profile image url"
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
            }}
          />
        </div> */}
        <div className="submit my-3">
          <button
            type="submit"
            className=" flex items-center bg-gray-700 py-2 px-2 rounded shadow-sm"
          >
            Register <FaSignInAlt className=" mx-1 text-white font-bold" />
          </button>
        </div>
        <div className="register border-t text-slate-700 py-3 border-slate-500 my-1">
          Already have an account?
          <Link to={"/login"} className=" text-white bg-green-900 mx-2 my-1 p-1 px-3 rounded">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterScreen;
