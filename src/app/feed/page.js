"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Feed from "../components/Feed";

export default function pages() {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("/api/feeds", { cache: "no-store" });
        if (data.ok) {
          const response = await data.json();
          setFeeds(response.feedbacks);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="bg-[#F7F8FD] min-h-screen sm:flex sm:justify-center sm:py-10">
      <Navbar />
      <div className="sm:w-1/2 xl:w-1/3">
        <form className="px-7 sm:rounded-lg h-16 flex items-center justify-between bg-[#373F68] text-white">
          <div>
            <label>Sort by:</label>
            <select className="border-0 bg-transparent">
              <option>Most Upvotes</option>
            </select>
          </div>
          <Link href="/feed/create">
            <span>Add Feedback</span>
          </Link>
        </form>
        {feeds.length == 0 ? (
          <div className="w-full flex justify-center py-10 px-7 h-[85vh] bg-[#F7F8FD]">
            <div className="bg-white w-full flex justify-center items-center">
              <div className="text-center">
                <div className="flex justify-center">
                  <img src="/assets/suggestions/illustration-empty.svg" />
                </div>
                <div className="mt-10 px-3">
                  <h2 className="text-xl font-bold">
                    There is no feedback yet.
                  </h2>
                  <p className="text-[#979797] pt-3">
                    Got a suggestion? Found a bug that needs to be squashed? We
                    love hearing about new ideas to improve this app
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-7 sm:px-0">
            {feeds.map((feed, index) => (
              <Link key={index} href={`/feed/${feed.slug}`}>
                <Feed
                  key={index}
                  title={feed.title}
                  details={feed.details}
                  category={feed.category}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
