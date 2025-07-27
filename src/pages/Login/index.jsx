import { useState } from "react";
import PasswordIcon from "../../assets/PasswordIcon";
import UserNameIcon from "../../assets/Username";

const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

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
                pattern="[A-Za-z][A-Za-z0-9\-]*"
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
