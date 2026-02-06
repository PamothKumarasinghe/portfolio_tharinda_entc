require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

async function seedSkills() {
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

    // Sample skill categories
    const sampleSkills = [
      {
        title: "Programming",
        icon: "Code",
        skills: [
          { name: "Python", percentage: 85 },
          { name: "C/C++", percentage: 80 },
          { name: "JavaScript", percentage: 75 },
          { name: "MATLAB", percentage: 70 },
        ],
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Hardware",
        icon: "Cpu",
        skills: [
          { name: "Arduino", percentage: 90 },
          { name: "Raspberry Pi", percentage: 85 },
          { name: "FPGA", percentage: 70 },
          { name: "PCB Design", percentage: 75 },
        ],
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tools",
        icon: "Wrench",
        skills: [
          { name: "Git", percentage: 80 },
          { name: "Linux", percentage: 75 },
          { name: "VS Code", percentage: 85 },
          { name: "Docker", percentage: 65 },
        ],
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Technologies",
        icon: "Database",
        skills: [
          { name: "IoT", percentage: 85 },
          { name: "Signal Processing", percentage: 80 },
          { name: "Machine Learning", percentage: 70 },
          { name: "Embedded Systems", percentage: 90 },
        ],
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Clear existing skills
    await db.collection("skills").deleteMany({});
    console.log("Cleared existing skills");

    // Insert sample skills
    const result = await db.collection("skills").insertMany(sampleSkills);
    console.log(`✅ Inserted ${result.insertedCount} skill categories`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
}

seedSkills().catch(console.error);
