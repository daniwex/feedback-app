"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Feed from "@/app/components/Feed";
import Comment from "@/app/components/Comment";
import { useRouter } from "next/navigation";
import Commentc from "@/app/components/Commentc";

export default function page() {
  const [feed, setFeed] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  let [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const params = useParams();
  const router = useRouter();

  async function getComments() {
    const req = await fetch("/api/all_comments", {
      method: "POST",
      body: JSON.stringify(feed),
    });
    if (req.ok) {
      const response = await req.json();
      console.log(response);
      setComments((comments) => [...response.users]);
    }
  }
  async function submitForm(e) {
    e.preventDefault();
    if (comment == "") {
      return;
    }
    try {
      const id = feed._id;
      const data = { post: comment, id };
      const req = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        getComments();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
    }
  }

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
  useEffect(() => {
    getComments();
  }, [feed]);
  return (
    <div className="p-7 bg-[#F7F8FD] min-h-screen sm:flex sm:justify-center ">
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
                <h2 className="font-bold mb-5">{comments?.length} Comments </h2>
                <div>
                  {comments.length ? (
                    <>
                      {comments.map((el) => (
                        <div>
                          <Commentc
                            name={el.name}
                            username={el.username}
                            post={el.comment}
                          />{" "}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="font-bold text-center w-full flex flex-col">
                      No comments
                      <span className="font-extralight text-[#979797]">Be the first to comment</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Comment
                  getComments={(e) => {
                    setComment(e.target.value);
                  }}
                  submitComment={(e) => submitForm(e)}
                />
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
