import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

function Search({ base_api_url }) {
  const [searchValues, setSearchValues] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    axios.get(`${base_api_url}/users/search/${searchValues}`).then((res) => {
      setFoundUsers(res.data);
    });
  }, [searchValues]);

  return (
    <div className="relative">
      {/* search input */}
      <div className="flex items-center mt-1 gap-3">
        <input
          type="text"
          placeholder="Search for a friend"
          className="p-3 rounded-md"
          onChange={(e) => setSearchValues(e.target.value)}
        />
        <BiSearchAlt className="text-4xl text-white cursor-pointer" />
      </div>

      {searchValues && (
        <div className="search-results">
          <h1>{foundUsers.length} users match your search</h1>
          <section>
            {foundUsers.map((user, index) => (
              <Link key={index} to={`profile/${user.userId}`}>
                {console.log(user)}
                <img
                  src={`${base_api_url}/${user.userProfilePicture}`}
                  alt="img"
                />
                <p>{user.userName}</p>
              </Link>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default Search;
