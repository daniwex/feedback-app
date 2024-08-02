import { connectMongoose } from "../database/connectDB.js";
import { NextResponse } from "next/server";
import Feedback  from "../database/models/feedback.js";
import { Federant } from "next/font/google/index.js";

export const GET = async (req, res) => {
    try {
        await connectMongoose()
        const planned = await Feedback.find({status:"planned"})
        return NextResponse.json({ planned}, {status:200})
    } catch (error) {
        console.log(error)
    }
}