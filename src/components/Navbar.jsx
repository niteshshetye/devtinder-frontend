import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AUTH_URLS } from "../config/api";

import { addUser } from "../store/slice/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName = "", isLoggedIn = false, photoUrl = "" } = user || {};

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await axios.post(AUTH_URLS.LOGOUT, {}, { withCredentials: true });

      // Clear user data from the store
      dispatch(addUser(null));
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0">
      <div className="flex-1">
        <Link to={"/"} className="text-xl">
          WeTinder
        </Link>
      </div>
      {isLoggedIn && (
        <div className="flex gap-4 items-center px-4">
          <p className="text-lg">{`Welcome, ${firstName}`}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tinder User Profile Pic" src={photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-62 p-4 shadow flex flex-col"
            >
              <li
                onClick={() => handleNavigation("/profile")}
                className="hover:bg-base-200 p-2 cursor-pointer"
              >
                Profile
              </li>
              <li
                onClick={() => handleNavigation("/connections")}
                className="hover:bg-base-200 p-2 cursor-pointer"
              >
                Connections
              </li>
              <li
                onClick={() => handleNavigation("/requests")}
                className="hover:bg-base-200 p-2 cursor-pointer"
              >
                Requests
              </li>
              <li
                onClick={handleLogout}
                className="hover:bg-base-200 p-2 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
