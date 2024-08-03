"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Feed from "@/app/components/Feed";
import Comment from "@/app/components/Comment";

export default function page() {
  const [feed, setFeed] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false)
  const params = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("/api/slug_data", {
          method: "POST",
          body: JSON.stringify(params),
        });
        if (data.ok) {
          const response = await data.json();
          setFeed(response.feedback);
          setIsAuthor(response.author)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="p-7 bg-[#F7F8FD] h-screen">
      <div className="flex justify-between">
        <Link href="/feed" className="flex items-center w-fit text-[#979797]">
          <img className="h-fit" src="/assets/shared/icon-arrow-left.svg"></img>
          <span className="pl-3">Go Back</span>
        </Link>
        {
          isAuthor && feed ?
          <>
          <Link className="text-sm bg-[#4661E6] rounded-md text-white px-3 py-2" href={`/feed/${feed.slug}/edit`}>Edit Feedback</Link>
          </>
          :
          <></>
        }
      </div>
      <div className="mt-10">
        {feed ? (
          <div>
            <Feed
              title={feed.title}
              details={feed.details}
              category={feed.category}
              upvotes={feed.upvotes}
            />
            <div>
              <Comment />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
