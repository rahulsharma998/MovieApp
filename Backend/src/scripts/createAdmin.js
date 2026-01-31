import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const email = "test@mail.com";
    const password = "test@123";
    const name = "Rahul Admin";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.role = "admin";
      // Ensure password is updated if needed, or keep existing
      // existingUser.password = await bcrypt.hash(password, 10); 
      await existingUser.save();
      console.log(`User ${email} updated to Admin successfully.`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin"
      });
      console.log(`Admin user ${email} created successfully.`);
    }

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
