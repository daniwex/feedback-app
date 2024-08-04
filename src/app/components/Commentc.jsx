import React, { useState } from "react";

export default function Commentc({ name, username, post }) {
  const [reply, setReply] = useState(false);
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <div>
          {name}
          <div className="text-[#979797]">@{username} </div>
        </div>
        {
            reply
            ?
            <button onClick={() => setReply(false)} className="text-[#4661E6] text-sm font-bold">Cancel</button>
            :
            <button onClick={() => setReply(true)} className="text-[#4661E6] text-sm font-bold">Reply</button>
        }
      </div>
      <p>{post}</p>
      {reply ? (
        <div>
          <form className="block sm:flex justify-between">
            <textarea className="sm:w-2/3 w-full p-2 text-sm bg-[#F7F8FD] "></textarea>
            <button className="text-sm" >Post Reply</button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
