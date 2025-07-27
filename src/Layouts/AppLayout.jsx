import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { USER_URLS } from "../config/api";

import { addUser } from "../store/slice/userSlice";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const { data = {} } = await axios.get(USER_URLS.DETAILS, {
        withCredentials: true,
      });

      const { data: userDetails = undefined } = data;

      if (userDetails) {
        dispatch(addUser(userDetails));
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.log("Error fetching user details: ", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

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
