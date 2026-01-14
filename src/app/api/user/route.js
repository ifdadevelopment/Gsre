import { NextResponse } from "next/server";
import { connectDB } from "../lib/Db";
import { loginUser, registerUser } from "../controllers/user.controllers";


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const result = await registerUser(body);

    if (result.message) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const result = await loginUser(body);

    if (result.message) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
