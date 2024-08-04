import comment from "../database/models/comment";
import { connectMongoose } from "../database/connectDB";
import Feedback from "../database/models/feedback.js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "../database/models/user.js";

export const POST = async (req, res) => {
  const feedback = await req.json();
  const user = cookies().get("currentUser").value;
  let result;
  try {
    await connectMongoose();
    const comments = await comment.find({ feedback: feedback._id });
    const users = await Promise.all(
        comments.map(async (comment) => {
          const user = await User.findById(comment.commenter);
          if (user) {
            return {
              username: user.username,
              name: user.fullname,
              comment: comment.comment,
              replies:comment.replies
            };
          } else {
            return null;
          }
        })
      );
    if (!comments) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
