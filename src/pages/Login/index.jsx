import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PasswordIcon from "../../assets/PasswordIcon";
import UserNameIcon from "../../assets/Username";

import { AUTH_URLS } from "../../config/api";

import { addUser } from "../../store/slice/userSlice";

const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "emailId":
        setEmailId(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      emailId,
      password,
    };

    try {
      const { data = {} } = await axios.post(AUTH_URLS.LOGIN, payload, {
        withCredentials: true,
      });

      const { data: userResponse } = data;

      dispatch(addUser({ ...userResponse, isLoggedIn: true }));

      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      navigate("/feed");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card w-150 bg-base-300 card-xl shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="card-body flex flex-col items-center gap-5"
        >
          <h2 className="card-title">Login To Devtinder</h2>
          <div className="flex flex-col items-center gap-4 w-full">
            <label className="input validator">
              <UserNameIcon />
              <input
                type="text"
                required
                name="emailId"
                placeholder="Email ID"
                minlength="3"
                maxlength="30"
                value={emailId}
                onChange={handleChange}
              />
            </label>
            <label className="input validator">
              <PasswordIcon />
              <input
                type="password"
                required
                name="password"
                placeholder="Password"
                minlength="8"
                value={password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="justify-center card-actions w-full">
            <button type="submit" className="btn btn-primary w-1/3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
