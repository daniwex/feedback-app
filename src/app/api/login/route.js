import { connectMongoose } from "../database/connectDB.js";
import User from "../database/models/user.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";

export const POST = async (req, res) => {
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    await connectMongoose();
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const response = NextResponse.json(
      { success: true, message: "Login successful", user: user._id },
      { status: 201 }
    );

    cookies().set({
      name: "currentUser",
      value: user._id,
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
