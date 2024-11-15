import { connectMongoose } from "../database/connectDB.js";
import { NextResponse } from "next/server";
import Feedback  from "../database/models/feedback.js";

export const dynamic = "force-dynamic";


export const GET = async (req, res) => {
    try {
        await connectMongoose()
        const feedbacks = await Feedback.find()
        return NextResponse.json({ feedbacks}, {status:200})
    } catch (error) {
        console.log(error)
    }
}