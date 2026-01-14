import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    reminder: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    remark: {
      type: String,
      default: "",
    },
    updateHistory: [
      {
        status: String,
        remark: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
