"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Feed from "../../../components/Feed";

export default function page() {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("/api/planned");
        if (data.ok) {
          const response = await data.json();
          setFeeds(response.planned);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="bg-[#F7F8FD] h-full">
      {feeds?.length > 0 ? (
        <div className="p-7">
          {feeds.map((feed, index) => (
            <Feed
              key={index}
              title={feed.title}
              details={feed.details}
              category={feed.category}
              border="true"
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
