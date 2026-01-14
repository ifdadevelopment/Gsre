import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/Db";
import User from "../../models/User";
      

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const token = jwt.sign(
      { id: user._id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,        
      sameSite: "lax",      
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);

    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
