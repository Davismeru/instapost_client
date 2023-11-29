import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NewPost from "./pages/NewPost";
import Comments from "./pages/Comments";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./pages/Profile";

function App() {
  const base_api_url = "http://localhost:3000";
  const accessToken = localStorage.getItem("accessToken");
  const [authState, setAuthState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    axios
      .get(`${base_api_url}/users/auth/auth`, {
        headers: {
          accessToken: accessToken,
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
          setActiveUser(res.data);
        }
      });
  }, []);
  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, likeState, setLikeState }}
    >
      <BrowserRouter>
        <section>
          <Navbar base_api_url={base_api_url} />
        </section>
        <Routes>
          <Route
            path="/"
            element={
              <Home base_api_url={base_api_url} activeUser={activeUser} />
            }
          />
          <Route
            path="/signup"
            element={<SignUp base_api_url={base_api_url} />}
          />
          <Route
            path="/signin"
            element={<SignIn base_api_url={base_api_url} />}
          />
          <Route
            path="/new-post"
            element={<NewPost base_api_url={base_api_url} />}
          />

          <Route
            path="/comments/:postId"
            element={
              <Comments base_api_url={base_api_url} activeUser={activeUser} />
            }
          />

          <Route
            path="/profile/:userId"
            element={
              <Profile base_api_url={base_api_url} activeUser={activeUser} />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
