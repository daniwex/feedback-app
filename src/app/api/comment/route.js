import  comment  from "../database/models/comment";
import { connectMongoose } from "../database/connectDB"
import Feedback from "../database/models/feedback.js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async (req, res) => {
    let {id, post} = await req.json()
    const commenter = cookies().get('currentUser').value
    try {
        await connectMongoose()
        const feedback = await Feedback.findById({_id:id})
        if(!feedback){
            return NextResponse.json({message:"feedback not found"}, {status:404})
        }
        const newComment = await new comment({commenter, comment:post, feedback:id, replies:[]})
        newComment.save()
        return NextResponse.json({message:"comment has been saved"},{status:201})
    } catch (error) {
        console.log(error)
    }
}