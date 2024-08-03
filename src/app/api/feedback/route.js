import { connectMongoose } from "../database/connectDB.js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Feedback  from "../database/models/feedback.js";

export const dynamic = "force-dynamic";


export const POST = async (req, res) => {
  const { title, category, details } = await req.json();
  try {
    connectMongoose();
    const userId = cookies().get("currentUser").value;
    const slug = title.replaceAll(' ','_')
    const feedback = await new Feedback({ title, category, details, slug, created_by: userId });
    feedback.save()
    return NextResponse.json({ feedback}, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
