require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

async function seedExperiences() {
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

    // Sample experiences
    const sampleExperiences = [
      {
        title: "Embedded Systems Intern",
        company: "Tech Innovations Ltd",
        description:
          "Worked on developing firmware for IoT devices, participated in PCB design reviews, and assisted in testing embedded systems.",
        date: "Jun 2024 - Aug 2024",
        location: "Colombo, Sri Lanka",
        current: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Research Assistant",
        company: "University Research Lab",
        description:
          "Conducting research on wireless communication systems, implementing signal processing algorithms, and publishing research papers.",
        date: "Jan 2024 - Present",
        location: "Moratuwa, Sri Lanka",
        current: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Clear existing experiences
    await db.collection("experiences").deleteMany({});
    console.log("Cleared existing experiences");

    // Insert sample experiences
    const result = await db
      .collection("experiences")
      .insertMany(sampleExperiences);
    console.log(`✅ Inserted ${result.insertedCount} sample experiences`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
}

seedExperiences().catch(console.error);
