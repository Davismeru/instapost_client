import { useContext, useEffect, useState } from "react";
import { IoBonfire } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Navbar({ base_api_url }) {
  const accessToken = localStorage.getItem("accessToken");
  const [popMenu, setPopMenu] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${base_api_url}/users`, {
        headers: {
          accessToken: accessToken,
        },
      })
      .then((res) => {
        setActiveUser(res.data);
      });
  }, [authState]);

  return (
    <div className="flex justify-between items-center px-6 pt-10">
      {/* logo */}
      <section className="flex items-center gap-2">
        <IoBonfire className="text-4xl text-gray-300" />
        <Link to={"/"} className="font-bold text-gray-500 text-2xl">
          Insta<span className="">post</span>
        </Link>
      </section>

      <section className="flex gap-5 relative">
        {authState ? (
          <Link to={"/new-post"}>
            <button>New post</button>
          </Link>
        ) : (
          <Link to={"/signin"}>
            <button>Login</button>
          </Link>
        )}

        {/* profile details menu */}
        <div
          className={
            popMenu
              ? "bg-gray-800 text-white text-2xl rounded-sm absolute right-0 -bottom-44 p-5 z-20"
              : "hidden"
          }
        >
          <p className="mb-5 text-2xl">{activeUser.userName}</p>
          <Link
            to={`profile/${activeUser.id}`}
            onClick={() => setPopMenu(false)}
            className="text-lg"
          >
            View profile
          </Link>
          <p
            className="bg-white text-gray-700 w-fit text-lg p-1 rounded-sm mt-2 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("accessToken");
              setAuthState(false);
              navigate("/");
              setPopMenu(false);
            }}
          >
            sign out
          </p>
        </div>

        {authState && (
          <section className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={`${base_api_url}/${activeUser.profilePicture}`}
              alt="profile"
              className="object-cover w-full h-full"
              onClick={() => (popMenu ? setPopMenu(false) : setPopMenu(true))}
            />
          </section>
        )}
      </section>
    </div>
  );
}

export default Navbar;
