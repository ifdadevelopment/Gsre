import { NextResponse } from "next/server";
import { connectDB } from "../lib/Db";
import Contact from "../models/contact.model.js";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      service,
      message,
      reminder,
    } = body;
    if (!fullName || !phone || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await Contact.create({
      fullName,
      phone,
      email,
      service,
      message,
      reminder,
    });

    return NextResponse.json(
      { success: true, message: "Contact saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
