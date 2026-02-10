require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

async function updateAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI not found in .env.local");
    console.error(
      "Please create .env.local file with your MongoDB connection string",
    );
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully!");

    const db = client.db("portfolio");

    // Get new credentials from .env.local
    const newUsername = process.env.ADMIN_USERNAME || "admin";
    const newEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const newPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Check if admin exists
    const existing = await db.collection("admins").findOne({});

    if (!existing) {
      console.log("❌ No admin user found!");
      console.log('Run "node scripts/create-admin.js" to create one.');
      return;
    }

    console.log("Current admin found:");
    console.log("Username:", existing.username);
    console.log("Email:", existing.email);
    console.log("\n🔄 Updating admin credentials...");

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin user
    await db.collection("admins").updateOne(
      { _id: existing._id },
      {
        $set: {
          username: newUsername,
          email: newEmail,
          password: hashedPassword,
          updatedAt: new Date(),
        },
      },
    );

    console.log("✅ Admin credentials updated successfully!");
    console.log("New Username:", newUsername);
    console.log("New Email:", newEmail);
    console.log(
      "\nYou can now login with the new credentials at: http://localhost:3000/admin/login",
    );
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await client.close();
    console.log("\nDatabase connection closed.");
  }
}

updateAdmin().catch(console.error);
