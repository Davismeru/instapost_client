import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function SignIn({ base_api_url }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${base_api_url}/users/login`, {
        userName: name,
        password: password,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          localStorage.setItem("accessToken", res.data);
          setAuthState(true);
          navigate("/");
        }
      });
  };
  return (
    <div className="flex flex-col my-[10%] justify-center mx-5">
      <form className="form sign-in">
        <input
          type="text"
          placeholder="Enter your Username"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit" onClick={handleSubmit}>
          Log in
        </button>
      </form>

      <p className="text-white text-center mt-5">
        Already have an account?{" "}
        <Link to={"/signup"} className="text-blue-400">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
