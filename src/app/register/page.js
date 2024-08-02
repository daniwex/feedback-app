'use client' 

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [cpassword, setCpassword] = useState('')
  const router = useRouter();

  async function registerUser(e){
    e.preventDefault()
    if(!email || !password || !cpassword || !username || !fullname){
        return
    }
    if(cpassword != password){
        return
    }
    try {
        const data = {email, password, username, fullname}
        console.log(data)
        const url = await fetch('/api/register', {
            method:"POST",
            body: JSON.stringify(data)
        })
        if(url.ok){
            router.push("/feed");
        }
        
    } catch (error) {
        console.log(error)
    }
    finally{
        setEmail('')
        setPassword('')
        setCpassword('')
        setUsername('')
        setFullname('')
    }

  }
  return (
    <div className="p-7 flex flex-col justify-between h-full">
    <div className="pt-10 sm:text-center">
      <h1 className="text-2xl">Sign up for Free.</h1>
      <div className="mt-20 sm:flex sm:justify-center">
        <form className="sm:w-96" onSubmit={registerUser}>
          <div className="mb-5">
            <input className="border border-[#E9E9E9] py-4 px-2 w-full rounded-md placeholder:text-sm" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-5">
            <input className="border border-[#E9E9E9]  py-4 px-2 w-full rounded-md placeholder:text-sm" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="mb-5">
            <input className="border border-[#E9E9E9]  py-4 px-2 w-full rounded-md placeholder:text-sm" type="text" placeholder="Full name" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
          </div>
          <div className="mb-5">
            <input className="border border-[#E9E9E9]  py-4 px-2 w-full rounded-md placeholder:text-sm" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
          </div>
          <div className="mb-10">
            <input className="border border-[#E9E9E9]  py-4 px-2 w-full rounded-md placeholder:text-sm" type="password" placeholder="Confirm password" value={cpassword} onChange={(e) => setCpassword(e.target.value)}/>
          </div>
     
          <button className="bg-[#1876D2] w-full rounded-md text-white h-14">Sign Up</button>
        </form>
      </div>
    </div>
    <span className="text-center h-20 mt-2">Already have an account? <Link className="text-[#1876D2]" href="/"> {" "} Register</Link> </span>
  </div>
  )
}
