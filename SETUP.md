# Portfolio Setup Guide

## Overview

Your portfolio now has:

- MongoDB integration for dynamic content
- Admin panel for content management
- Separate projects page showing all projects
- Homepage showing only 4 most recent projects

## Setup Steps

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account (if you don't have one)
3. Create a new cluster (free tier is fine)
4. Once cluster is ready:
   - Click "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `portfolio`

### 2. Environment Variables

1. Copy `.env.local.example` to `.env.local`:

   ```bash
   copy .env.local.example .env.local
   ```

2. Edit `.env.local` and update:

   ```env
   MONGODB_URI=your-mongodb-connection-string-here
   NEXTAUTH_SECRET=your-secret-key-here
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

3. Generate a secret key:
   ```bash
   openssl rand -base64 32
   ```
   Or use any random string generator online

### 3. Create Admin User

Create a script to initialize your admin user. Run this once:

Create `scripts/create-admin.js`:

```javascript
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("portfolio");

    // Check if admin already exists
    const existing = await db.collection("admins").findOne({
      username: process.env.ADMIN_USERNAME,
    });

    if (existing) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await db.collection("admins").insertOne({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("Admin user created successfully!");
  } finally {
    await client.close();
  }
}

createAdmin().catch(console.error);
```

Run it:

```bash
node scripts/create-admin.js
```

### 4. Run the Application

```bash
npm run dev
```

Visit:

- Homepage: http://localhost:3000
- Admin Login: http://localhost:3000/admin/login
- All Projects: http://localhost:3000/projects

## Admin Panel Usage

### Login

1. Go to `/admin/login`
2. Enter your admin credentials
3. You'll be redirected to the admin dashboard

### Managing Content

The API endpoints are ready. You can:

**Projects:**

- GET `/api/projects` - Get all projects
- GET `/api/projects?limit=4` - Get 4 recent projects
- POST `/api/projects` - Create new project
- PUT `/api/projects` - Update project
- DELETE `/api/projects?id=xxx` - Delete project

**Experience:**

- GET `/api/experiences`
- POST `/api/experiences`
- PUT `/api/experiences`
- DELETE `/api/experiences?id=xxx`

**Education:**

- GET `/api/education`
- POST `/api/education`
- PUT `/api/education`
- DELETE `/api/education?id=xxx`

**Skills:**

- GET `/api/skills`
- POST `/api/skills`
- PUT `/api/skills`
- DELETE `/api/skills?id=xxx`

## Testing the API

You can test with curl or Postman:

### Create a project:

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "A test project description",
    "tags": ["Tag1", "Tag2"],
    "image": "/projects/test.jpg",
    "githubUrl": "https://github.com/username/repo",
    "liveUrl": "https://example.com",
    "featured": true
  }'
```

## Image Upload (For Later)

Currently, images are stored as URLs pointing to `/public/projects/`.

For MongoDB image storage, you'd need to:

1. Use GridFS for large files
2. Or upload to cloud storage (Cloudinary, AWS S3) and store URLs
3. Or convert images to base64 (not recommended for large images)

## Next Steps

1. Create admin UI pages for each content type (projects, experience, education, skills)
2. Add image upload functionality
3. Add authentication middleware to protect API routes
4. Add form validation
5. Add success/error notifications

## Folder Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── education/
│   │   │   └── route.ts
│   │   ├── experiences/
│   │   │   └── route.ts
│   │   ├── projects/
│   │   │   └── route.ts
│   │   └── skills/
│   │       └── route.ts
│   ├── projects/
│   │   └── page.tsx
│   └── page.tsx
├── lib/
│   ├── mongodb.ts
│   └── types.ts
└── ...
```

## MongoDB Collections Structure

**projects:**

```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "tags": [String],
  "image": String,
  "githubUrl": String,
  "liveUrl": String,
  "featured": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

**experiences:**

```json
{
  "_id": ObjectId,
  "title": String,
  "company": String,
  "description": String,
  "date": String,
  "location": String,
  "current": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

**education:**

```json
{
  "_id": ObjectId,
  "degree": String,
  "field": String,
  "institution": String,
  "achievements": String,
  "date": String,
  "location": String,
  "current": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

**skills:**

```json
{
  "_id": ObjectId,
  "title": String,
  "icon": String,
  "skills": [
    {
      "name": String,
      "percentage": Number
    }
  ],
  "order": Number,
  "createdAt": Date,
  "updatedAt": Date
}
```

## Troubleshooting

1. **MongoDB connection issues:**
   - Check your connection string
   - Ensure IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
   - Verify database user has read/write permissions

2. **Login not working:**
   - Make sure admin user is created
   - Check browser console for errors
   - Verify environment variables are loaded

3. **Images not showing:**
   - Ensure images are in `/public/projects/` folder
   - Check image paths in database match file locations
