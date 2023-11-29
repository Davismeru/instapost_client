import React from "react";

function CommentCard({ comment, base_api_url }) {
  return (
    <section className="bg-gray-200 mb-5 p-5 flex gap-5">
      <section className="w-16 h-16 rounded-full overflow-hidden">
        <img
          src={`${base_api_url}/${comment?.profilePicture}`}
          className="w-full h-full object-cover"
        />
      </section>
      <section>
        <p className="font-semibold text-gray-800">{comment?.userName}</p>
        <p>{comment?.comments}</p>
      </section>
    </section>
  );
}

export default CommentCard;
