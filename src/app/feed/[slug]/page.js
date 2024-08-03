"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation' 
import Link from "next/link";
import Feed from "@/app/components/Feed";

export default function page() {
  const [feed, setFeed] = useState([]);
  const params = useParams()

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("/api/slug_data",{
          method:"POST",
          body:JSON.stringify(params)
        });
        if (data.ok) {
          const response = await data.json();
          console.log(response)
          setFeed(response)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="p-7 bg-[#F7F8FD] h-screen">
      <div>
        <Link href="/feed" className="flex items-center w-fit text-[#979797]">
          <img className="h-fit" src="/assets/shared/icon-arrow-left.svg"></img>
          <span className="pl-3">Go Back</span>
        </Link>
      </div>
      <div className="mt-10">
        {
          feed
          ?
          <Feed title={feed.title} details={feed.details} category={feed.category} upvotes={feed.upvotes} />
          :
          <>r</>
        }
      </div>
      <div>
        
      </div>
    </div>
  )
}
