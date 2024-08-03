"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function layout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F7F8FD] ">
      <div className="bg-[#373F68] h-35 px-7 py-5 text-white flex justify-between items-center">
        <div className="">
          <Link href="/feed" className="flex items-center w-fit text-white">
            <img
              className="h-fit pr-2"
              src="/assets/shared/icon-arrow-left.svg"
            ></img>
            <span className="text-xs">Go Back</span>
          </Link>
          <div className="text-white">Roadmap</div>
        </div>
        <Link
          href="/feed/create"
          className="text-white mt-4 bg-[#AD1FEA] text-sm p-2 rounded-md"
        >
          Add Feedback
        </Link>
      </div>
      <div className="border">
        <ul className="w-full flex justify-between px-7">
          <Link
            className={`${
              pathname == "/feed/road-map/planned"
                ? "border-b-4 border-b-[#AD1FEA]"
                : ""
            } h-full inline-block py-5`}
            href="/feed/road-map/planned"
          >
            Planned
          </Link>
          <Link
            className={`${
              pathname == "/feed/road-map/progress"
                ? "border-b-4 border-b-[#AD1FEA]"
                : ""
            } h-full inline-block py-5`}
            href="/feed/road-map/progress"
          >
            In-Progress
          </Link>
          <Link
            className={`${
              pathname == "/feed/road-map/live"
                ? "border-b-4 border-b-[#AD1FEA]"
                : ""
            } h-full inline-block py-5`}
            href="/feed/road-map/live"
          >
            Live
          </Link>
        </ul>
      </div>
      {children}
    </div>
  );
}
