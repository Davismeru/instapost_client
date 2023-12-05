import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost({ base_api_url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const formData = new FormData();
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("postText", postText);
    for (let i = 0; i < files.length; i++) {
      formData.append("postPictures", files[i]);
    }

    setIsLoading(true);

    await axios.post(`${base_api_url}/posts`, formData, {
      headers: {
        accessToken: accessToken,
      },
    });

    setIsLoading(false);
    navigate("/");
  };
  return (
    <div className="flex flex-col my-[10%] justify-center mx-5">
      <form className="form">
        <textarea
          placeholder="What's on your mind...."
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button className="submit" onClick={handleSubmit}>
          {isLoading ? "Just a sec..." : "Post"}
        </button>
      </form>
    </div>
  );
}

export default NewPost;
