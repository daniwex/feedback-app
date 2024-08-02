import { connectMongoose } from "../database/connectDB.js";
import User from "../database/models/user.js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";

export const POST = async (req, res) => {
  let { email, password, username, fullname } = await req.json();
  try {
    await connectMongoose();
    const salt = await bcryptjs.genSalt(10);
    password = await bcryptjs.hash(password, salt);
    const user = await new User({ email, username, fullname, password });
    user.save();
    cookies().set({
      name: "currentUser",
      value: user._id,
      httpOnly: true,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
