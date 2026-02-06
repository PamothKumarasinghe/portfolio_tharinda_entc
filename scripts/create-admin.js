require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in .env.local');
    console.error('Please create .env.local file with your MongoDB connection string');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db('portfolio');
    
    const username = process.env.ADMIN_USERNAME || 'admin';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Check if admin already exists
    const existing = await db.collection('admins').findOne({ username });
    
    if (existing) {
      console.log('⚠️  Admin user already exists!');
      console.log('Username:', existing.username);
      console.log('Email:', existing.email);
      return;
    }
    
    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('admins').insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('\nYou can now login at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

createAdmin().catch(console.error);
