import { NextResponse } from "next/server";
import { connectDB } from "../../lib/Db";
import Contact from "../../models/contact.model";

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const { status, remark } = await req.json();

    await connectDB();

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }
    contact.updateHistory = contact.updateHistory || [];
    contact.updateHistory.unshift({
      status: contact.status,
      remark: contact.remark,
      updatedAt: new Date(),
    });
    contact.updateHistory = contact.updateHistory.slice(0, 5);
    if (status) contact.status = status;
    if (remark !== undefined) contact.remark = remark;

    await contact.save();

    return NextResponse.json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("UPDATE CONTACT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await connectDB();

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
