import mongoose, { Document, Model } from "mongoose";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Define TypeScript interface for the contact document
interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Define Mongoose schema
const ContactSchema = new mongoose.Schema<IContact>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists to prevent re-compilation
const ContactModel =
  (mongoose.models.Contact as Model<IContact>) ||
  mongoose.model<IContact>("Contact", ContactSchema);

export async function POST(req: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create a new contact entry using the model
    const newContact = await ContactModel.create({ name, email, message });

    return NextResponse.json(
      { message: "Form submitted successfully!", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting the form." },
      { status: 500 }
    );
  }
}
