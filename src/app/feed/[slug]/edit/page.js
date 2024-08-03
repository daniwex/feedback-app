"use client";
import Notification from "@/app/components/Notification";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("feature");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  let [method, setMethod] = useState("PATCH");

  const params = useParams();
  const router = useRouter();

  function closebtn() {
    setMessage("");
  }

  async function onSubmitForm(event, method) {
    event.preventDefault();
    try {
      const data = { title, category, details, status, slug: params };
      const req = await fetch("/api/slug_data", {
        method,
        body: JSON.stringify(data),
      });
      if (req.ok) {
        if (method == "DELETE") {
          return router.push("/feed");
        }
        let response = await req.json();
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
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
          setTitle(response.feedback.title);
          setCategory(response.feedback.category);
          setDetails(response.feedback.details);
          setStatus(response.feedback.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="p-7 bg-[#F7F8FD] min-h-screen sm:flex sm:justify-center">
      <div className="sm:w-1/2 xl:w-1/3">
        <div>
          <button onClick={() => router.back()} className="flex items-center w-fit text-[#979797]">
            <img
              className="h-fit"
              src="/assets/shared/icon-arrow-left.svg"
            ></img>
            <span className="pl-3">Go Back</span>
          </button>
        </div>
        {message != "" ? (
          <Notification message={message} closebtn={closebtn} />
        ) : (
          <></>
        )}
        <div className="mt-10 p-5 bg-white rounded-md">
          <h1 className="text-xl font-bold">Editing '{title}'</h1>
          <form
            className="mt-10"
            onSubmit={(event) => onSubmitForm(event, method)}
          >
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
                Choose a category for your feedback
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
            <div className="my-4">
              <label>Update Status</label>
              <p className="text-[#979797] text-sm py-2">
                Change feature state
              </p>
              <select
                className="h-14 px-2 bg-[#F7F8FD]  w-full"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="planned">Planned</option>
                <option value="progress">In-Progress</option>
                <option value="live">Live</option>
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
            <div className="sm:flex sm:justify-between">
              <button
                type="submit"
                className="w-full sm:w-1/4 text-white mt-4 bg-[#AD1FEA] h-14 rounded-md"
                onClick={() => setMethod("PATCH")}
              >
                Save Changes
              </button>
              <button
                type="submit"
                className="w-full sm:w-1/5 text-white mt-4 bg-[#D73737] h-14 rounded-md"
                onClick={() => setMethod("DELETE")}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
        {message != "" ? (
          <Notification message={message} closebtn={closebtn} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
