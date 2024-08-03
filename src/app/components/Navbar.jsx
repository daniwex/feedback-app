"use client";
import Link from "next/link";
import { useState } from "react";
import Circe from "./Circe";

export default function Navbar() {
  const [menubarshow, setmenubarshow] = useState(false);
  const [planned, setPlanned] = useState(0);
  const [progress, setProgress] = useState(0);
  const [live, setLive] = useState(0);
  const [feature, setFeature] = useState("all");
  function showMenu() {
    setmenubarshow(true);
  }
  function closeMenu() {
    setmenubarshow(false);
  }
  function filterelements(str) {
    setFeature(str);
  }
  return (
    <div className="sm:mr-10 sm:w-1/5 xl:w-2/12">
      <nav className="flex justify-between h-[8vh] items-center px-7 sm:px-0 navbar sm:h-32 sm:rounded-xl sm:block">
        <div className="block sm:flex sm:items-center sm:h-full sm:px-7">
          <div>Feedback Board</div>
        </div>
        <div className="sm:hidden">
          {!menubarshow ? (
            <i onClick={showMenu} class="fas fa-bars text-xl"></i>
          ) : (
            <i onClick={closeMenu} class="fas fa-times text-xl"></i>
          )}
        </div>
        <div className=" bg-red-400  hidden sm:block mt-10 ">
          <div className=" bg-[#F7F8FD] h-full w-full">
            <div className="bg-white p-5 w-full h-60 rounded-md sm:h-fit">
              <div className="grid grid-cols-3 gap-y-3 xl:grid-cols-4  sm:gap-y-2">
                <span
                  className={` w-fit sm:px-8 px-6 rounded-lg py-2 cursor-pointer ${
                    feature == "all"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("all")}
                >
                  All
                </span>
                <span
                  className={` w-fit sm:px-8 px-6 rounded-lg cursor-pointer py-2 ${
                    feature == "ui"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("ui")}
                >
                  UI
                </span>
                <span
                  className={` w-fit px-6 sm:px-8 rounded-lg cursor-pointer py-2 ${
                    feature == "ux"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("ux")}
                >
                  UX
                </span>
                <span
                  className={`col-span-2 sm:px-9 w-fit px-6 rounded-lg cursor-pointer py-2 ${
                    feature == "enhancement"
                      ? "bg-[#4661E6] text-white "
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("enhancement")}
                >
                  Enhancement
                </span>
                <span
                  className={`w-fit px-6 sm:px-8 rounded-lg cursor-pointer py-2 ${
                    feature == "bug"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("bug")}
                >
                  Bug
                </span>
                <span
                  className={`w-fit px-6 rounded-lg cursor-pointer py-2 ${
                    feature == "feature"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("feature")}
                >
                  Feature
                </span>
              </div>
            </div>
            <div className="mt-10 bg-white p-5 h-60 rounded-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold sm:text-black">Roadmap</h2>
                <Link
                  className="text-[#4661E6] underline"
                  href="/feed/road-map"
                >
                  View
                </Link>
              </div>
              <div className="pt-10 sm:text-black">
                <div className="flex justify-between py-2 ">
                  <div className="flex items-center">
                    <Circe bgcolor="#F49F85"></Circe> Planned
                  </div>
                  <span>{planned}</span>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex items-center">
                    <Circe bgcolor="#AD1FEA"></Circe> In-Progress
                  </div>
                  <span>{progress}</span>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex items-center">
                    <Circe bgcolor="#62BCFA"></Circe> Live
                  </div>
                  <span>{live}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {menubarshow ? (
        <div className="w-full h-[92vh] absolute left-0 z-20  bg-[#9797973b] ">
          <div className="float-right w-3/4 bg-[#F7F8FD] h-full p-6">
            <div className="bg-white p-5 h-60 rounded-md">
              <div className="grid grid-cols-3 gap-y-3">
                <span
                  className={` w-fit px-6 rounded-lg py-2 ${
                    feature == "all"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("all")}
                >
                  All
                </span>
                <span
                  className={` w-fit px-6 rounded-lg py-2 ${
                    feature == "ui"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("ui")}
                >
                  UI
                </span>
                <span
                  className={` w-fit px-6 rounded-lg py-2 ${
                    feature == "ux"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("ux")}
                >
                  UX
                </span>
                <span
                  className={`col-span-2  w-fit px-6 rounded-lg py-2 ${
                    feature == "enhancement"
                      ? "bg-[#4661E6] text-white "
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("enhancement")}
                >
                  Enhancement
                </span>
                <span
                  className={`w-fit px-6 rounded-lg py-2 ${
                    feature == "bug"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("bug")}
                >
                  Bug
                </span>
                <span
                  className={`w-fit px-6 rounded-lg py-2 ${
                    feature == "feature"
                      ? "bg-[#4661E6] text-white"
                      : "text-[#4661E6] bg-[#F2F4FF]"
                  }`}
                  onClick={() => filterelements("feature")}
                >
                  Feature
                </span>
              </div>
            </div>
            <div className="mt-10 bg-white p-5 h-60 rounded-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Roadmap</h2>
                <Link
                  className="text-[#4661E6] underline"
                  href="/feed/road-map"
                >
                  View
                </Link>
              </div>
              <div className="pt-10">
                <div className="flex justify-between py-2">
                  <div className="flex items-center">
                    <Circe bgcolor="#F49F85"></Circe> Planned
                  </div>
                  <span>{planned}</span>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex items-center">
                    <Circe bgcolor="#AD1FEA"></Circe> In-Progress
                  </div>
                  <span>{progress}</span>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex items-center">
                    <Circe bgcolor="#62BCFA"></Circe> Live
                  </div>
                  <span>{live}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
