import React from "react";

export default function Feed({
  title,
  details,
  category,
  border = false,
  borderColor = "",
  upvotes = 0,
  comments = 0,
}) {
  return (
    <div
      className={`bg-white grid grid-cols-2 sm:justify-between my-3 sm:w-full p-5 rounded-md sm:flex ${
        border ? "border-t-4 " + borderColor : ""
      }`}
    >
      <div className="cursor-pointer flex w-1/3 sm:w-fit flex-row sm:flex-col justify-center items-center mt-2 sm:mt-0 bg-[#CFD7FF] sm:h-1/2 sm:py-2 py-1 sm:px-3 rounded-lg text-sm select-none"><img className="w-fit h-fit pr-2 sm:pr-0" src="/assets/shared/icon-arrow-up.svg" alt="" />{upvotes}</div>
      <div className="sm:w-3/4 col-span-2 row-start-1">
        <h2 className="font-bold">{title}</h2>
        <p className="text-[#979797] text-sm mb-2">{details}</p>
        <span className="text-xs text-[#4661E6] font-bold bg-[#F2F4FF] py-1 px-2 rounded-lg">{category}</span>
      </div>
      <span className="justify-end inline-flex items-center"><img className="pr-2" src="/assets/shared/icon-comments.svg" /> {comments}</span>
    </div>
  );
}
