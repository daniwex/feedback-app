"use client";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function loguser(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const data = { email, password };
      const url = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (url.ok) {
        router.push("/feed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div className="p-7 flex flex-col justify-between h-full">
      <div className="pt-10 sm:text-center">
        <h1 className="text-2xl">Sign into your Account.</h1>
        <div className="mt-20 sm:flex sm:justify-center">
          <form className="sm:w-96" onSubmit={loguser}>
            <div className="mb-5">
              <input
                className="border border-[#E9E9E9] py-4 px-2 w-full rounded-md placeholder:text-sm"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="mb-10">
              <input
                className="border border-[#E9E9E9]  py-4 px-2 w-full rounded-md placeholder:text-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button className="bg-[#1876D2] w-full rounded-md text-white h-14">
              Sign In
            </button>
          </form>
        </div>
      </div>
      <span className="text-center mt-2">
        Don't have an account?
        <Link className="text-[#1876D2]" href="/register">
        {" "}  Sign Up
        </Link>
      </span>
    </div>
  );
}
