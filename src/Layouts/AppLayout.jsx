import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { USER_URLS } from "../config/api";

import { addUser } from "../store/slice/userSlice";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn = false } = user || {};

  const getUserDetails = useCallback(async () => {
    if (isLoggedIn) return;

    setLoading(true);
    try {
      const { data = {} } = await axios.get(USER_URLS.DETAILS, {
        withCredentials: true,
      });

      const { data: userDetails = undefined } = data;

      if (userDetails) {
        dispatch(addUser({ ...userDetails, isLoggedIn: true }));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error fetching user details: ", error);

      if (error.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate, isLoggedIn]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <>
      <Navbar />
      <div className="p-4 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
