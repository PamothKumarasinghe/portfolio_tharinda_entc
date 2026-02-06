# 🚀 Quick Start Guide

## For First Time Setup

### 1. Install dotenv package

```bash
npm install dotenv
```

### 2. Create your environment file

```bash
copy .env.local.example .env.local
```

### 3. Edit `.env.local` with your details:

**Get MongoDB connection string:**

- Go to https://cloud.mongodb.com/
- Create free account
- Create cluster
- Click "Connect" → "Connect your application"
- Copy the connection string
- Replace `<password>` with your password
- Replace `<dbname>` with `portfolio`

**Example:**

```env
MONGODB_URI=mongodb+srv://tharinda:MyPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any-random-long-string-here-abc123xyz
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=MySecurePassword123
```

### 4. Create Admin User

```bash
npm run setup:admin
```

### 5. (Optional) Add Sample Projects

```bash
npm run seed:projects
```

### 6. Run the App

```bash
npm run dev
```

### 7. Open Browser

- **Homepage**: http://localhost:3000
- **All Projects**: http://localhost:3000/projects
- **Admin Login**: http://localhost:3000/admin/login

---

## For Tharinda (Non-Technical User)

### To Add a New Project:

**Option 1: Use Postman (or similar tool)**

1. Download Postman: https://www.postman.com/downloads/
2. Create new POST request to: `http://localhost:3000/api/projects`
3. Set Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "title": "My Awesome Project",
  "description": "Description of what this project does",
  "tags": ["Arduino", "Python", "IoT"],
  "image": "/projects/my-project.jpg",
  "githubUrl": "https://github.com/yourusername/repo",
  "liveUrl": "https://your-demo-link.com",
  "featured": true
}
```

5. Click Send

**Option 2: Ask your developer friend to create the admin UI forms**

---

## Directory Structure for Images

```
public/
├── profilePic.jpeg          ← Your profile photo
└── projects/
    ├── project1.jpg         ← Project images
    ├── project2.jpg
    ├── project3.jpg
    └── ...
```

---

## Common Issues

### "Cannot connect to MongoDB"

- ✅ Check `.env.local` has correct connection string
- ✅ Whitelist your IP in MongoDB Atlas (or use 0.0.0.0/0)
- ✅ Check your internet connection

### "Admin login not working"

- ✅ Run `npm run setup:admin` to create admin user
- ✅ Check `.env.local` has admin credentials
- ✅ Check browser console for errors (F12)

### "Projects not showing"

- ✅ Run `npm run seed:projects` for sample data
- ✅ Or add projects via API
- ✅ Make sure images exist in `public/projects/`

### "Images not loading"

- ✅ Images must be in `public/` folder
- ✅ Reference them as `/projects/name.jpg` (starts with `/`)
- ✅ Check image filename matches exactly (case-sensitive)

---

## MongoDB Atlas Setup (Detailed)

1. **Sign Up**
   - Go to https://cloud.mongodb.com/
   - Click "Try Free"
   - Sign up with Google/email

2. **Create Cluster**
   - Choose FREE tier (M0)
   - Select cloud provider (any)
   - Region (closest to you)
   - Click "Create Cluster"
   - Wait 3-5 minutes

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose Password authentication
   - Username: `tharinda` (or anything)
   - Password: Create strong password
   - User Privileges: "Read and write to any database"
   - Add User

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IPs
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Driver: Node.js
   - Version: 4.1 or later
   - Copy connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `portfolio`

Example:

```
mongodb+srv://tharinda:MyPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## What's Next?

After basic setup, your friend can:

1. **Create admin CRUD pages** - Full UI forms for managing content
2. **Add image upload** - Click to upload instead of manually adding files
3. **Email integration** - Make contact form actually send emails
4. **Deploy to Vercel** - Make it live on the internet
5. **Custom domain** - Use your own domain name

---

## Need Help?

Ask your developer friend! They set this up for you 😊

**What they built:**

- ✅ MongoDB database integration
- ✅ API endpoints for all content
- ✅ Admin login system
- ✅ Projects page showing all projects
- ✅ Homepage showing 4 recent projects
- ✅ Responsive design
- ✅ Image optimization

**What you can do:**

- Add/edit/delete projects
- Manage work experience
- Update education
- Modify skills
- Change profile information
- Upload images
