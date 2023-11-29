import { IoMdHeart } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post({ post, base_api_url, activeUser }) {
  const [liked, setLiked] = useState(false);
  const { likeState, setLikeState } = useContext(AuthContext);
  const handleLike = async (id) => {
    await axios.post(`${base_api_url}/likes/${id}`, null, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });

    if (!liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    // trigger a re-render in the Home page
    if (!likeState) {
      setLikeState(true);
    } else {
      setLikeState(false);
    }
  };

  useEffect(() => {
    const hasLiked = post.likes.filter((like) => {
      if (like.userId == activeUser.id) {
        return like;
      }
    });

    if (hasLiked[0]?.id) {
      setLiked(true);
    }
  }, [post]);

  return (
    <div className="shadow-md rounded-md my-10 p-5 bg-white">
      {/* profile details username and profile picture */}
      <Link
        to={`/profile/${post.userId}`}
        className="flex items-center gap-5 text-2xl mb-5 font-bold text-gray-600"
      >
        <section className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={`${base_api_url}/${post.profilePicture}`}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </section>
        <h1>{post.userName}</h1>
      </Link>

      {/* post text */}
      <section className="mb-5">
        <p>{post.postText}</p>
      </section>

      {/* posted images */}

      <div className="posted_images_container">
        {post.postPictures.split(",").map((image, index) => (
          <section key={index}>
            <img src={`${base_api_url}/${image}`} alt="post" />
          </section>
        ))}
      </div>

      {/* likes and comments */}
      <div className="flex items-center justify-around m-5 md:justify-start md:gap-10">
        <section className="flex items-center gap-2">
          <IoMdHeart
            className={liked ? "text-red-400" : "text-gray-400"}
            onClick={() => handleLike(post.id)}
          />
          <p className="text-sm">{post.likes.length} likes</p>
        </section>

        <section className="flex items-center gap-2">
          <FaCommentDots className="text-gray-500" />
          <Link to={`/comments/${post.id}`} className="text-sm">
            {post.comments.length} comments
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Post;
