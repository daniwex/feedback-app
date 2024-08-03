"use client";

import { useState } from "react";

export default function Comment() {
  const LIMIT = 250
  let [charLeft, setCharLeft] = useState(LIMIT);
  let [comment, setComment] = useState('')
  function handleOnPress(e){
    if(e.key != 'Backspace' && e.key != 'spacebar'){
        setCharLeft(charLeft = charLeft - 1)
    }
    if(e.key == 'Backspace' && comment != ''){
        setCharLeft(charLeft = charLeft + 1)
    }
  }
  return (
    <div className="bg-white p-5">
      <h2 className="font-bold text-xl mb-3">Add Comment</h2>
      <textarea
        placeholder="Type your comment here"
        className="h-28 p-2 text-sm bg-[#F7F8FD] w-full placeholder:text-xs"
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleOnPress}
      ></textarea>
      <div className="mt-5 flex justify-between items-center">
        <span className="text-xs">{charLeft} Characters left</span>
        <span>
          <button
            type="submit"
            className="w-full text-white  bg-[#AD1FEA] px-3 py-1 rounded-md"
          >
            Post Comment
          </button>
        </span>
      </div>
    </div>
  );
}
