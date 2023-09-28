import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileDropdownMenu from "./UserProfileDropdownMenu";
import SearchBox from "./SearchBox";
import {
  FaBars,
  FaBell,
  FaBookReader,
  FaCaretDown,
  FaCommentAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

function Header() {
  const [userMenu, setUserMenu] = useState(false);

  const { userinfo } = useSelector((state) => state.auth);
  if (userinfo) console.log(userinfo);

  document.onclick = function (e) {
    if (userMenu) {
      setUserMenu(!userMenu);
    } else if (
      e.target.id === "userprofile" ||
      e.target.id === "userprofileimage"
    ) {
      setUserMenu(!userMenu);
      console.log("beans...");
    }
  };

  return (
    <header className=" bg-white  fixed w-full top-0 header border-b border-slate-200">
      <div className=" flex header   justify-between items-center mx-auto  bg-white py-2 px-4">
        <div className="logo  py-0">
          <Link
            to="/"
            className="linklogo text-cente text-sm  rounded-sm  mx-4  block relative -left-5 p-2 -top-0"
            style={{ width: "120px", cursor: "pointer" }}
          >
            <img src="/images/blogo.png" alt="" className="siteLogo p-3" />
          </Link>
        </div>
        {userinfo && (
          <div className="right -mr-2">
            <ul className="link-items">
              <li className="relative">
                <Link to="/practice">
                  <FaBookReader className="  p-2 shadow-sm  text-white bg-slate-900  border-slate-800 border  shadow-slate-900 rounded-full text-3xl" />
                </Link>
              </li>
              {/* <li className="relative hidden">
              <Link to="#">
                <FaCommentAlt className="  p-2 shadow-sm  text-green-500 bg-slate-700  shadow-slate-900 rounded-full text-3xl" />
              </Link>
              <span className=" flex justify-center shadow-sm shadow-green-950 text-green-300 items-center text-xs font-bold -top-2 rounded-full bg-slate-600 absolute -right-2" style={{width:"20px", height:"20px"}}> 3 </span>
            </li> */}
              {/* <li className="relative">
                <Link to="#">
                  <FaBell className="  p-2 shadow-sm text-white border-slate-800 border text-center bg-slate-900   rounded-full text-3xl" />
                  <span
                    className=" flex justify-center shadow-sm  text-black items-center text-xs font-bold -top-2 rounded-full bg-slate-400 absolute -right-2 px-2 py-2"
                    style={{ width: "20px", height: "20px" }}
                  >
                    {" "}
                    3{" "}
                  </span>
                </Link>
              </li> */}
              <li
                className=" cursor-pointer text-xs break-words  flex items-center justify-between font-bold text-slate-500 py-3 px-3 rounded shadow-sm "
                id="userprofile"
              >
                {/* <img
                src={userinfo.profile}
                alt="user profile image"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
                id="userprofileimage"
                className=" shadow-lg align-middle inline-block"
              /> */}
                <FaUser className="shadow-lg align-middle inline-block mx-1 text-slate-800 border border-slate-400 text-3xl p-1 rounded-full" />
                <span className=" break-words">
                {String(userinfo.name).slice(0, 5)+"..."}
                </span>
                <FaCaretDown className=" text-center text-slate-800 ml-2 inline-block align-middle relative -top-0.5" />
              </li>
            </ul>
          </div>
        )}
      </div>
      {userMenu && <UserProfileDropdownMenu />}
    </header>
  );
}

export default Header;
