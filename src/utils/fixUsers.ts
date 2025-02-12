import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

async function fixUsers() {
  await dbConnect();

  const users = await User.find({ role: { $exists: false } });

  for (const user of users) {
    user.role = "user"; // Default role
    await user.save();
    console.log(`Updated user ${user.email} with default role: user`);
  }

  console.log("All users updated successfully.");
}

fixUsers();
