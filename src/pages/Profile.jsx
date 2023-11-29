import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { months } from "../assets/constants";
import { FaX } from "react-icons/fa6";
import Post from "../components/Post";
import { AuthContext } from "../helpers/AuthContext";

function Profile({ base_api_url, activeUser }) {
  const [user, setUser] = useState({});
  const { likeState } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const params = useParams();
  const [expandImg, setExpandImg] = useState({
    url: "",
    state: false,
  });

  //   set the date format
  const handleDate = () => {
    const YMD = user?.createdAt?.substring(0, 10);
    const Y_M_D = YMD?.split("-");
    if (Y_M_D) {
      const getMonth = months.filter((month) => {
        if (month.number == Y_M_D[1]) {
          return month.month;
        }
      });

      const date = Y_M_D[2] + " " + getMonth[0].month + " " + Y_M_D[0];
      return date;
    }
  };
  useEffect(() => {
    // get user's details
    axios.get(`${base_api_url}/users/profile/${params.userId}`).then((res) => {
      setUser(res.data);
    });

    // get users's posts
    axios.get(`${base_api_url}/posts/profile/${params.userId}`).then((res) => {
      setUserPosts(res.data);
    });
  }, [likeState]);
  return (
    <div className=" px-5 w-full relative min-h-screen">
      {/* name and profile picture */}
      <section className="flex flex-col items-center mt-5 gap-3 text-white font-bold">
        <img
          src={`${base_api_url}/${user?.profilePicture}`}
          alt="profile pic"
          className="w-32 h-32 rounded-full object-cover"
        />

        <h1 className="text-2xl">{user?.userName}</h1>
      </section>

      {/* user details */}
      <section className="my-5 text-white">
        <h1>PERSONAL DEATAILS</h1>
        <div className="text-gray-400">
          <p>Email adress: {user?.email}</p>
          <p>Member since: {handleDate()}</p>
        </div>
      </section>

      {/* user uplaoded images */}
      <section>
        <h1 className="mb-3 text-white">UPLOADED IMAGES</h1>
        <div className="user_uploads">
          {user?.userPosts?.map((post) =>
            post.postPictures.split(",").map((picture, index) => (
              <img
                src={`${base_api_url}/${picture}`}
                className="cover cursor-pointer"
                key={index}
                onClick={() =>
                  setExpandImg({
                    src: `${base_api_url}/${picture}`,
                    state: true,
                  })
                }
              />
            ))
          )}
        </div>

        {/* full img container */}
        <div
          className={
            expandImg.state
              ? "absolute top-0 left-0 w-full h-screen bg-black -mx-5"
              : "hidden"
          }
        >
          {/* hide full img button */}
          <section
            className="text-right cursor-pointer bg-white w-fit p-3 rounded-sm absolute right-2 top-2"
            onClick={() =>
              setExpandImg({
                src: "",
                state: false,
              })
            }
          >
            <FaX className="text-black" />
          </section>
          <img
            src={expandImg.src}
            alt="img"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* user posts */}
      <section className="mt-5">
        <h1 className="text-white">POSTS</h1>
        <div className="-mt-5">
          {userPosts.map((post) => (
            <Post
              post={post}
              base_api_url={base_api_url}
              activeUser={activeUser}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;
