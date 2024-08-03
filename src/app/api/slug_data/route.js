import { connectMongoose } from "../database/connectDB.js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Feedback from "../database/models/feedback.js";


export const dynamic = "force-dynamic";

export const POST = async (req, res) => {
    const slug_title = await req.json()
  try {
    connectMongoose();
    const feedback = await Feedback.findOne({slug:slug_title.slug})
    if(!feedback){
        return NextResponse.json({message:"item not found"}, {status:404})
    }
    return NextResponse.json(feedback, {status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"sp,ewthing went wrong"}, {status:500})
  }
};
