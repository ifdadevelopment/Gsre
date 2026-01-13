
import { connectDB } from "../lib/Db";
import Contact from "../models/contact.model.js";
export async function createContact(data) {
  await connectDB();

  return await Contact.create({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    service: data.service,
    message: data.message,
    reminder: data.reminder || [],
  });
}

export async function getContacts() {
  await connectDB();

  return await Contact.find().sort({ createdAt: -1 });
}