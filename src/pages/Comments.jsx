import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import CommentCard from "../components/CommentCard";
import { AuthContext } from "../helpers/AuthContext";
import Loader from "../components/Loader";

function Comments({ base_api_url, activeUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const params = useParams();
  const [comment, setComment] = useState(""); // comment to be posted
  const [allComments, setAllComments] = useState([]); // all post comments
  const accessToken = localStorage.getItem("accessToken");
  const textarea = document.getElementById("textarea");
  const { authState, likeState } = useContext(AuthContext);

  const handlePostComment = async () => {
    const data = {
      comment: comment,
      postId: post.id,
    };

    await axios.post(`${base_api_url}/comments`, data, {
      headers: {
        accessToken: accessToken,
      },
    });

    textarea.value = "";
    setComment("");
  };

  useEffect(() => {
    axios.get(`${base_api_url}/posts/${params.postId}`).then((res) => {
      setPost(res.data);
      setIsLoading(false);
    });
  }, [likeState]);

  useEffect(() => {
    axios.get(`${base_api_url}/comments/${post.id}`).then((res) => {
      setAllComments(res.data);
    });
  }, [post, comment]);
  return (
    <div className="mx-5">
      {isLoading && <Loader />}
      {post?.id && (
        <Post post={post} base_api_url={base_api_url} activeUser={activeUser} />
      )}

      {!isLoading && (
        <div className="bg-white p-5 rounded-md">
          <p className="text-2xl font-semibold mb-5">Comments</p>

          {/* post comment */}
          {authState && (
            <section className="relative">
              <textarea
                id="textarea"
                type="text"
                placeholder="Leave your comment"
                className="border p-5 w-full pr-14 h-32 mb-5"
                onChange={(e) => setComment(e.target.value)}
              />
              <IoSend
                className="absolute top-5 right-2 text-2xl text-gray-500"
                onClick={handlePostComment}
              />
            </section>
          )}

          {/* all comments */}
          <div>
            {allComments.map((comment, index) => (
              <CommentCard
                comment={comment}
                base_api_url={base_api_url}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
