import React from "react";

export default function Commentc({ name, username, post }) {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          {name}
          <div>@{username} </div>
        </div>
        <button>Reply</button>
      </div>
      <p>{post}</p>
      <div>
        <form className="flex">
            <textarea className="sm:w-2/3"></textarea>
            <button>Post Reply</button>
        </form>
      </div>
    </div>
  );
}
