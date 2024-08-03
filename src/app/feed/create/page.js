"use client";
import Notification from "@/app/components/Notification";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("feature");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter()

  async function submitFeedback(e) {
    e.preventDefault();
    if (!title || !category || !details) {
      return;
    }
    const data = { title, category, details };
    try {
      const req = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        const response = await req.json()
        setMessage("Thank you for your feedback");
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setCategory("feature");
      setDetails("");
    }
  }
  function closebtn(){
    setMessage('')
  }
  return (
    <div className="p-7 bg-[#F7F8FD]  min-h-screen sm:flex sm:justify-center">
      <div className="sm:w-1/2 xl:w-1/3">
      <div>
        <button onClick={() => router.back()} className="flex items-center w-fit text-[#979797]">
          <img className="h-fit" src="/assets/shared/icon-arrow-left.svg"></img>
          <span className="pl-3">Go Back</span>
        </button>
      </div>
      {message != "" ? <Notification message={message} closebtn={closebtn} /> : <></>}
      <div className="mt-10 p-5 bg-white rounded-md">
        <h1 className="text-xl">Create New Fedback</h1>
        <form className="mt-10" onSubmit={submitFeedback}>
          <div>
            <label>Feedback Title</label>
            <p className="text-[#979797] text-sm py-2">
              Add a short, descriptive headline
            </p>
            <input
              className="h-14 px-2 bg-[#F7F8FD]  w-full"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="my-4">
            <label>Category</label>
            <p className="text-[#979797] text-sm py-2">
              Add a short, descriptive headline
            </p>
            <select
              className="h-14 px-2 bg-[#F7F8FD]  w-full"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="feature">Feature</option>
              <option value="ui">UI</option>
              <option value="bug">Bug</option>
              <option value="ux">UX</option>
              <option value="enhancement">Enhancement</option>
            </select>
          </div>
          <div>
            <label>Feedback Detail</label>
            <p className="text-[#979797] text-sm py-2">
              Include any specific comments on what should be improved, added,
              etc
            </p>
            <textarea
              onChange={(e) => setDetails(e.target.value)}
              className="h-52 p-2 text-sm bg-[#F7F8FD]  w-full"
              value={details}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full sm:w-1/5 text-white mt-4 bg-[#AD1FEA] h-14 rounded-md"
          >
            Add Feedback
          </button>
        </form>
      </div>
      {message != "" ? <Notification message={message} closebtn={closebtn} /> : <></>}
      </div>
    
    </div>
  );
}
