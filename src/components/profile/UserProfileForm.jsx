import axios from "axios";
import { useState } from "react";
import { USER_URLS } from "../../config/api";
import { useDispatch } from "react-redux";

import { addUser } from "../../store/slice/userSlice";
import useToast from "../../hooks/useToast";

const UserProfileForm = ({
  firstName = "",
  lastName = "",
  emailId = "",
  age = "",
  gender = "male",
  bio = "",
  photoUrl = "",
}) => {
  const [userProfile, setUserProfile] = useState({
    firstName,
    lastName,
    emailId,
    age,
    bio,
    gender,
    photoUrl,
  });
  const dispatch = useDispatch();
  const { renderToast, showToast, notifiyToast } = useToast();

  const handleChangeUserProfile = (event) => {
    const { target = {} } = event;
    const { value = "", name = "" } = target;

    setUserProfile((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { data = {} } = await axios.patch(USER_URLS.UPDATE, userProfile, {
        withCredentials: true,
      });
      if (Object.keys(data).length) {
        notifiyToast("User Proflie saved succesfully");
        dispatch(addUser(data.data));
      }
      console.log({ data });
    } catch (error) {
      console.log(error);
      notifiyToast("Please try again!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSaveProfile}
        className="card bg-base-300 w-96 shadow-sm p-6 flex flex-col gap-4"
      >
        <label htmlFor="firstName" className="label">
          <input
            type="text"
            id="firstName"
            value={userProfile.firstName}
            name="firstName"
            placeholder="Enter your Firstname"
            onChange={handleChangeUserProfile}
            className="input"
          />
        </label>
        <label htmlFor="lastName" className="label">
          <input
            type="text"
            id="lastName"
            value={userProfile.lastName}
            name="lastName"
            placeholder="Enter your Lastname"
            onChange={handleChangeUserProfile}
            className="input"
          />
        </label>
        <label htmlFor="emailId" className="label">
          <input
            type="email"
            id="emailId"
            required
            value={userProfile.emailId}
            name="emailId"
            placeholder="Enter your Email Id"
            onChange={handleChangeUserProfile}
            className="input validator"
          />
        </label>
        <label htmlFor="age" className="label">
          <input
            type="text"
            id="age"
            value={userProfile.age}
            name="age"
            placeholder="Enter your Age"
            onChange={handleChangeUserProfile}
            className="input"
          />
        </label>
        <label htmlFor="gender" className="label">
          <select
            id="gender"
            value={userProfile.gender}
            name="gender"
            onChange={handleChangeUserProfile}
            className="select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label htmlFor="bio" className="label">
          <textarea
            id="bio"
            value={userProfile.bio}
            name="bio"
            className="textarea"
            placeholder="Enter your Bio"
            onChange={handleChangeUserProfile}
          ></textarea>
        </label>
        <button
          type="button"
          onClick={handleSaveProfile}
          className="btn btn-soft btn-primary"
        >
          Save Profile
        </button>
      </form>
      {showToast && renderToast()}
    </>
  );
};

export default UserProfileForm;
