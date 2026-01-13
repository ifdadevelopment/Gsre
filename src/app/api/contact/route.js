import { NextResponse } from "next/server";
import { createContact, getContacts } from "../controllers/contact.controller";


export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, phone, email, service, message, reminder } = body;

    if (!fullName || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await createContact({
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
    console.error("CONTACT POST ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await getContacts();

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONTACT GET ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
