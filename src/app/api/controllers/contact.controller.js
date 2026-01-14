import { connectDB } from "../lib/Db";
import Contact from "../models/contact.model"
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
export async function getAllContacts() {
  await connectDB();
  return await Contact.find().sort({ createdAt: -1 });
}

export async function updateContact(id, data) {
  await connectDB();

  return await Contact.findByIdAndUpdate(
    id,
    {
      status: data.status,
      remark: data.remark,
    },
    { new: true }
  );
}

/* DELETE */
export async function deleteContact(id) {
  await connectDB();
  return await Contact.findByIdAndDelete(id);
}
