import { connectMongoose } from "../database/connectDB.js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Feedback from "../database/models/feedback.js";
import comment from "../database/models/comment";


export const dynamic = "force-dynamic";

export const POST = async (req, res) => {
    const slug_title = await req.json()
    const user = cookies().get('currentUser').value
    let author = false
  try {
    connectMongoose();
    const feedback = await Feedback.findOne({slug:slug_title.slug})
    if(!feedback){
        return NextResponse.json({message:"item not found"}, {status:404})
    }
    if(feedback.created_by == user){
        author = true
    }
    return NextResponse.json({feedback, author}, {status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"something went wrong"}, {status:500})
  }
};


export const PATCH = async (req) => {
  let {title, category, status, details, slug} = await req.json()
  const newSlug = title.replaceAll(' ','_')
  try {
    connectMongoose();
    const feedback = await Feedback.findOneAndUpdate({slug:slug.slug},{title, category, status, details, slug:newSlug}, { new: true, runValidators: true })
    if(!feedback){
        return NextResponse.json({message:"item not found"}, {status:404})
    }
    return NextResponse.json({feedback, message:"Your changes have been saved"}, {status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"something went wrong"}, {status:500})
  }

}

export const DELETE = async (req) => {
  const {slug} = await req.json()
  try{
    connectMongoose();
    const feedback = await Feedback.findOneAndDelete({slug:slug.slug})
    const commenttdel = await comment.deleteMany({feedback:feedback._id})
    if(!feedback){
      return NextResponse.json({message:"item not found"}, {status:404})
  }
  return NextResponse.json({message:"item has been successfully deleted"}, {status:200})

  }catch(error){
    console.log(error);
    return NextResponse.json({message:"something went wrong"}, {status:500})
  }
}