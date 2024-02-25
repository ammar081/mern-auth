import React, { useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
      console.log("error: ", err?.data?.message || err?.error);
    }
  };

  return (
    <div className="flex items-center justify-between px-16 py-4 bg-[#343A40]">
      <div>
        <Link to="/">
          <h1 className="text-white font-bold text-xl">MERN Auth</h1>
        </Link>
      </div>
      {userInfo ? (
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {userInfo.name}
            <IoIosArrowDown className="ml-2" />
          </button>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <Link to="/profile">
                  <button
                    onClick={() => handleOptionClick("Profile")}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Profile
                  </button>
                </Link>
                {/* <Link to="/login"> */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  Logout
                </button>
                {/* </Link> */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-300 flex items-center gap-8">
          <Link to="/login">
            <button className="flex items-center gap-1.5">
              <FaSignInAlt /> Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="flex items-center gap-1.5">
              <FaSignOutAlt /> Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
