"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Feed from "@/app/components/Feed";
import Comment from "@/app/components/Comment";
import { useRouter } from "next/navigation";

export default function page() {
  const [feed, setFeed] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [comments, setComments] = useState([])
   const params = useParams();
  const router = useRouter();

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
          setIsAuthor(response.author);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="p-7 bg-[#F7F8FD] h-screen sm:flex sm:justify-center ">
      <div className="sm:w-1/2 xl:w-1/3">
        <div className="flex justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center w-fit text-[#979797]"
          >
            <img
              className="h-fit"
              src="/assets/shared/icon-arrow-left.svg"
            ></img>
            <span className="pl-3">Go Back</span>
          </button>
          {isAuthor && feed ? (
            <>
              <Link
                className="text-sm bg-[#4661E6] rounded-md text-white px-3 py-2"
                href={`/feed/${feed.slug}/edit`}
              >
                Edit Feedback
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-10">
          {feed ? (
            <div>
              <Suspense fallback={<div className="text-black">loading</div>}>
                <Feed
                  title={feed.title}
                  details={feed.details}
                  category={feed.category}
                  upvotes={feed.upvotes}
                />
              </Suspense>
              <div className="my-5 bg-white p-7">


              </div>
              <div>
                <Comment />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
