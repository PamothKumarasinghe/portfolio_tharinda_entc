require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

async function seedEducation() {
  if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully!");

    const db = client.db("portfolio");

    // Sample education records
    const sampleEducation = [
      {
        degree: "Bachelor of Science in Engineering",
        field: "Electronic & Telecommunication Engineering",
        institution: "University of Moratuwa",
        achievements:
          "Dean's List 2022, 2023 • Member of IEEE Student Branch • Active participant in robotics competitions",
        date: "2021 - Present",
        location: "Moratuwa, Sri Lanka",
        current: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        degree: "G.C.E. Advanced Level",
        field: "Physical Science Stream",
        institution: "Royal College",
        achievements:
          "District Rank: Top 50 • Science Olympiad Medalist • School Colors for Science",
        date: "2018 - 2020",
        location: "Colombo, Sri Lanka",
        current: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Clear existing education records
    await db.collection("education").deleteMany({});
    console.log("Cleared existing education records");

    // Insert sample education
    const result = await db.collection("education").insertMany(sampleEducation);
    console.log(`✅ Inserted ${result.insertedCount} sample education records`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
}

seedEducation().catch(console.error);
