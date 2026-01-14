import { NextResponse } from "next/server";
import { createContact, getAllContacts } from "../controllers/contact.controller";


export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, phone, email, service, message } = body;

    if (!fullName || !phone || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await createContact(body);

    return NextResponse.json(
      { success: true, message: "Contact saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE CONTACT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await getAllContacts();

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
