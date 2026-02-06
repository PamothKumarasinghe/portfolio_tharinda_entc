require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function seedProjects() {
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db('portfolio');
    
    // Sample projects
    const sampleProjects = [
      {
        title: "Smart Home Automation System",
        description: "An IoT-based home automation system using Arduino and Raspberry Pi, enabling remote control of home appliances via a mobile app.",
        tags: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT'],
        image: "/projects/project1.jpg",
        githubUrl: "https://github.com",
        liveUrl: "",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Signal Processing Toolkit",
        description: "A MATLAB-based toolkit for digital signal processing, including filters, FFT analysis, and real-time signal visualization.",
        tags: ['MATLAB', 'Signal Processing', 'GUI'],
        image: "/projects/project2.jpg",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Wireless Sensor Network",
        description: "Designed and implemented a wireless sensor network for environmental monitoring with low power consumption.",
        tags: ['C++', 'LoRa', 'PCB Design', 'ESP32'],
        image: "/projects/project3.jpg",
        githubUrl: "",
        liveUrl: "",
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "FPGA-based Image Processor",
        description: "Real-time image processing implementation on FPGA for edge detection and image enhancement algorithms.",
        tags: ['Verilog', 'FPGA', 'Image Processing'],
        image: "/projects/project4.jpg",
        githubUrl: "",
        liveUrl: "",
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Clear existing projects
    await db.collection('projects').deleteMany({});
    console.log('Cleared existing projects');
    
    // Insert sample projects
    const result = await db.collection('projects').insertMany(sampleProjects);
    console.log(`✅ Inserted ${result.insertedCount} sample projects`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

seedProjects().catch(console.error);
