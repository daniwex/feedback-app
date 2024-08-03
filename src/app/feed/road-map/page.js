"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Feed from "../../components/Feed";
import { useRouter } from "next/navigation";

export default function page() {
  const [feeds, setFeeds] = useState([]);
  const [lenplanned, setlenplanned] = useState([]);
  const [lenprogress, setlenprogress] = useState([]);
  const [lenlive, setlenlive] = useState([]);
  const router = useRouter();
  let [current, setCurrent] = useState("planned")
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("/api/planned");
        if (data.ok) {
          const response = await data.json();
          setFeeds(response.feedbacks);
          setlenplanned(
            response.feedbacks.filter((el) => el.status == "planned")
          );
          setlenprogress(
            response.feedbacks.filter((el) => el.status == "progress")
          );
          setlenlive(response.feedbacks.filter((el) => el.status == "live"));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FD] sm:flex sm:justify-center sm:py-20 ">
      <div className="sm:w-3/5 xl:w-2/5 w-full min-h-screen">
        <div className="bg-[#373F68] h-35 px-7 py-5 text-white flex justify-between items-center sm:rounded-lg sm:mb-10">
          <div className="">
            <button
              onClick={() => router.back()}
              className="flex items-center w-fit text-white"
            >
              <img
                className="h-fit pr-2"
                src="/assets/shared/icon-arrow-left.svg"
              ></img>
              <span className="text-xs">Go Back</span>
            </button>
            <div className="text-white">Roadmap</div>
          </div>
          <Link
            href="/feed/create"
            className="text-white mt-4 bg-[#AD1FEA] text-sm p-2 rounded-md"
          >
            Add Feedback
          </Link>
        </div>
        <div className="sm:border-none hidden sm:block">
          <div className="w-full sm:h-full flex justify-between px-7 sm:px-0">
            <div className="sm:w-2/3 sm:mr-5">
              <div className="">
                Planned <span>({lenplanned.length})</span>
                <p className="hidden sm:block text-sm text-[#979797]">
                  Ideas prioritized for research
                </p>
                <div>
                  {lenplanned.map((feed) => (
                    <Link href={`/feed/${feed.slug}`}>
                      <Feed
                        title={feed.title}
                        details={feed.details}
                        category={feed.category}
                        border="true"
                        borderColor="border-t-[#F49F85]"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="sm:w-2/3 sm:mr-5">
              <div className="">
                In-Progress <span>({lenprogress.length})</span>
                <p className="hidden sm:block text-sm text-[#979797]">
                  Currently being developed
                </p>
                <div>
                  {lenprogress.map((feed) => (
                    <Link href={`/feed/${feed.slug}`}>
                      <Feed
                        title={feed.title}
                        details={feed.details}
                        category={feed.category}
                        border="true"
                        borderColor="border-t-[#AD1FEA]"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="sm:w-2/3">
              <div className="">
                Live <span>({lenlive.length})</span>
                <p className="hidden sm:block text-sm text-[#979797]">
                  Released features
                </p>
                <div>
                  {lenlive.map((feed) => (
                    <Link href={`/feed/${feed.slug}`}>
                      <Feed
                        title={feed.title}
                        details={feed.details}
                        category={feed.category}
                        border="true"
                        borderColor="border-t-[#62BCFA]"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden">
          <div className="flex justify-between border-b px-7">
            <div onClick={() => setCurrent("planned")} className={`py-4 ${current == "planned" ? 'border-b-4 border-b-[#F49F85]' : ''}`}>
              Planned <span>({lenplanned.length})</span>
            </div>
            <div onClick={() => setCurrent("progress")} className={`py-4 ${current == "progress" ? 'border-b-4 border-b-[#AD1FEA]' : ''}`}>
              In-Progress <span>({lenprogress.length})</span>
            </div>
            <div onClick={() => setCurrent("live")} className={`py-4 ${current == "live" ? 'border-b-4 border-b-[#62BCFA]' : ''}`}>
              Live <span>({lenlive.length})</span>
            </div>
          </div>
          <div className="p-7">
            {
              current == "planned" 
              ?
              lenplanned.map((feed) => (
                <Link href={`/feed/${feed.slug}`}>
                  <Feed
                    title={feed.title}
                    details={feed.details}
                    category={feed.category}
                    border="true"
                    borderColor="border-t-[#F49F85]"
                  />
                </Link>
              ))
              :
              current == "progress"
              ?
              lenprogress.map((feed) => (
                <Link href={`/feed/${feed.slug}`}>
                  <Feed
                    title={feed.title}
                    details={feed.details}
                    category={feed.category}
                    border="true"
                    borderColor="border-t-[#AD1FEA]"
                  />
                </Link>
              ))
              :
              lenlive.map((feed) => (
                <Link href={`/feed/${feed.slug}`}>
                  <Feed
                    title={feed.title}
                    details={feed.details}
                    category={feed.category}
                    border="true"
                    borderColor="border-t-[#62BCFA]"
                  />
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
