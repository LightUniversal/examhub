import React from "react";
import { FaCog, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { Link, useNavigate } from "react-router-dom";

const UserProfileDropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userinfo } = useSelector((state) => state.auth);


  console.log(12)
  const [logoutCaller] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCaller().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("You are logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" dropdown w-32 bg-slate-900 shadow-md border border-slate-800">
      {userinfo && (
        <ul>
          {/* <li className=" shadow-sm p-3 border-b border-slate-600">
            <Link to="#" className="flex items-center text-slate-300">
              setting <FaCog className=" text-green-500 mx-2" />
            </Link>
          </li> */}
          <li className=" shadow-sm p-3 " onClick={logoutHandler}>
            <Link to="/logout" className="flex items-center  text-slate-800">
              Logout <FaSignOutAlt className=" text-slate-800 mx-2" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserProfileDropdownMenu;
