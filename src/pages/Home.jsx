import React, { useEffect, useState, useContext } from "react";
import Post from "../components/Post";
import Search from "../components/Search";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Home({ base_api_url, activeUser }) {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { likeState } = useContext(AuthContext);

  const handleLoadMore = () => {
    setPageCount(pageCount + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    axios.get(`${base_api_url}/posts?page=${pageCount}`).then((res) => {
      setPosts(res.data.data);
      setTotalPages(res.data.totalPages);
    });
  }, [pageCount, likeState]);

  return (
    <div className="p-5 w-full">
      <Search base_api_url={base_api_url} />
      <section>
        {posts.map((post, index) => (
          <Post
            post={post}
            base_api_url={base_api_url}
            key={index}
            activeUser={activeUser}
            pageCount={pageCount}
          />
        ))}
      </section>

      <section className="flex justify-center">
        {pageCount != totalPages - 1 && (
          <button className="rounded-sm" onClick={handleLoadMore}>
            load more
          </button>
        )}
      </section>
    </div>
  );
}

export default Home;
