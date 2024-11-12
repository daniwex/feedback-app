import comment from "../database/models/comment";
import { connectMongoose } from "../database/connectDB";
import Feedback from "../database/models/feedback.js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "../database/models/user.js";

export const POST = async (req) => {
  try {
    const { feed } = await req.json();
    const userCookie = cookies().get("currentUser");
    if (!userCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = userCookie.value;

    await connectMongoose();

    const comments = await comment.find({ feedback: feed._id });
    if (!comments.length) {
      return NextResponse.json({ message: "No comments found" }, { status: 404 });
    }

    const users = await Promise.all(
      comments.map(async (comment) => {
        const user = await User.findById(comment.commenter);
        if (user) {
          return {
            username: user.username,
            name: user.fullname,
            comment: comment.comment,
            replies: comment.replies,
          };
        } else {
          return null;
        }
      })
    );

    // Filter out null users
    const filteredUsers = users.filter(user => user !== null);

    return NextResponse.json({ users: filteredUsers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
