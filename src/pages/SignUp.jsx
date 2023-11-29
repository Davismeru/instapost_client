import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp({ base_api_url }) {
  // form input states
  const [userName, setUserName] = useState(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);

  // inputs error state
  const [passwordError, setPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  // submit form function
  const formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", file[0]);

    await axios.post(`${base_api_url}/users/signup`, formData);
    navigate("/signin");
  };

  // confirm userName
  useEffect(() => {
    const res = axios.get(`${base_api_url}/users/${userName}`).then((res) => {
      if (!res.data.error && res.data.length != 0) {
        setUserNameError(true);
      } else {
        setUserNameError(false);
      }
    });
  }, [userName]);

  // confirm email
  useEffect(() => {
    if (email != "" && !email.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  // confrim passord
  useEffect(() => {
    if (password != confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [confirmPassword, password]);

  return (
    <div className="flex flex-col my-[20%] justify-center mx-5 md:my-[10%]">
      <form className="form">
        {/* input username section */}
        <section className="w-full">
          <input
            type="text"
            placeholder="Enter your Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          {userNameError && (
            <p className="text-red-400 mt-2">Username already exists</p>
          )}
        </section>

        {/* input email section */}
        <section className="w-full">
          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-400 mt-2">Invalid email format</p>
          )}
        </section>

        {/* password section */}
        <input
          security="yes"
          type="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* confirm password section */}
        <section className="w-full">
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* password doesnt match error */}
          {passwordError ? (
            <p className="text-red-400 mt-2">Passwords does not match</p>
          ) : (
            <p></p>
          )}
        </section>

        {/* upload profile picture section */}
        <section>
          <label>Upload profile picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files)} />
        </section>

        {/* create account button */}
        <button
          className="submit disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={
            emailError ||
            passwordError ||
            userNameError ||
            userName == "" ||
            email == "" ||
            password == "" ||
            file == null
          }
        >
          Create account
        </button>
      </form>

      <p className="text-white text-center mt-5">
        Already have an account?{" "}
        <Link to={"/signin"} className="text-blue-400">
          SIgn In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
