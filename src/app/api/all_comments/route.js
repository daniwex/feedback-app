import  comment  from "../database/models/comment";
import { connectMongoose } from "../database/connectDB"
import Feedback from "../database/models/feedback.js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async (req, res) => {
    const feedback = await req.json()
    const user = cookies().get("currentUser").value
    console.log(feedback._id)
    try {
        await connectMongoose()
        const comments = await comment.find({feedback: feedback._id})
        console.log(comments)
        if(!comments){
            return NextResponse.json({message:"comment not found"}, {status:404})
        }
        return NextResponse.json({comments}, {status:200})
    } catch (error) {
        console.log(error)
    }
}