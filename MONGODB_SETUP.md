# 🚀 MongoDB Setup Guide - Portfolio Website

## ✅ Connection Status: CONNECTED

Your MongoDB Atlas connection is successfully configured!

---

## 📊 Database Structure

**Database Name:** `portfolio`

### Collections Created:

1. ✅ **admins** - Admin users for authentication
2. ✅ **projects** - Portfolio projects
3. ✅ **experiences** - Work experience records
4. ✅ **education** - Education history
5. ✅ **skills** - Skill categories with percentages

---

## 🔑 Current Configuration

### MongoDB Connection

```
Cluster: tharinda.igcz6o3.mongodb.net
Database: portfolio
Username: Tharinda_ab
Status: ✅ Connected
```

### Admin Credentials

```
Username: admin
Email: admin@example.com
Password: changeme123
```

**⚠️ IMPORTANT:** Change the admin password after first login!

---

## 🎯 Quick Start Commands

### 1. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 2. Access Admin Panel

```bash
# First run the dev server, then visit:
http://localhost:3000/admin/login
```

### 3. Database Seeding Commands

**Seed everything at once:**

```bash
npm run seed:all
```

**Seed individual collections:**

```bash
npm run setup:admin          # Create admin user
npm run seed:projects        # Seed projects only
npm run seed:experiences     # Seed experiences only
npm run seed:education       # Seed education only
npm run seed:skills          # Seed skills only
```

---

## 📋 Sample Data Included

### Projects (4 items)

- Smart Home Automation System
- Signal Processing Toolkit
- Wireless Sensor Network
- FPGA-based Image Processor

### Experiences (2 items)

- Embedded Systems Intern at Tech Innovations Ltd
- Research Assistant at University Research Lab

### Education (2 items)

- BSc Engineering - University of Moratuwa
- G.C.E. Advanced Level - Royal College

### Skills (4 categories)

- Programming (Python, C/C++, JavaScript, MATLAB)
- Hardware (Arduino, Raspberry Pi, FPGA, PCB Design)
- Tools (Git, Linux, VS Code, Docker)
- Technologies (IoT, Signal Processing, ML, Embedded Systems)

---

## 🔧 MongoDB Atlas Dashboard

### View Your Data:

1. Go to: https://cloud.mongodb.com/
2. Select your cluster: **Tharinda**
3. Click "Browse Collections"
4. Database: **portfolio**

### Collections Overview:

```
portfolio/
├── admins (1 document)
├── projects (4 documents)
├── experiences (2 documents)
├── education (2 documents)
└── skills (4 documents)
```

---

## 🛠️ Troubleshooting

### Connection Issues

**Problem:** "MongoServerError: Authentication failed"

```bash
# Solution: Check password encoding in .env.local
# Special characters must be URL encoded:
# # becomes %23
# @ becomes %40
# ! becomes %21
```

**Problem:** "Network timeout"

```bash
# Solution: Check IP whitelist in MongoDB Atlas
# 1. Go to Network Access
# 2. Add "0.0.0.0/0" for development
```

### Reset Database

```bash
# This will clear and reseed all data
npm run seed:all
```

---

## 📁 File Structure

```
portfolio/
├── .env.local                    # MongoDB connection string
├── src/
│   ├── lib/
│   │   ├── mongodb.ts           # MongoDB connection setup
│   │   └── types.ts             # TypeScript interfaces
│   └── app/
│       └── api/                 # API routes
│           ├── projects/route.ts
│           ├── experiences/route.ts
│           ├── education/route.ts
│           └── skills/route.ts
└── scripts/
    ├── create-admin.js          # Create admin user
    ├── seed-all.js              # Seed all collections
    ├── seed-projects.js
    ├── seed-experiences.js
    ├── seed-education.js
    └── seed-skills.js
```

---

## 🔐 Security Checklist

- [ ] Change admin password after first login
- [ ] Update NEXTAUTH_SECRET in .env.local
- [ ] Restrict Network Access in production
- [ ] Never commit .env.local to Git
- [ ] Use environment variables for production

---

## 🌐 API Endpoints

All APIs return JSON with format: `{ success: boolean, data: any }`

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects?limit=4` - Get limited projects
- `POST /api/projects` - Create project
- `PUT /api/projects` - Update project
- `DELETE /api/projects?id=xxx` - Delete project

### Experiences

- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience
- `PUT /api/experiences` - Update experience
- `DELETE /api/experiences?id=xxx` - Delete experience

### Education

- `GET /api/education` - Get all education records
- `POST /api/education` - Create education
- `PUT /api/education` - Update education
- `DELETE /api/education?id=xxx` - Delete education

### Skills

- `GET /api/skills` - Get all skill categories
- `POST /api/skills` - Create skill category
- `PUT /api/skills` - Update skill category
- `DELETE /api/skills?id=xxx` - Delete skill category

---

## 📝 Next Steps

1. ✅ MongoDB connected
2. ✅ Database seeded with sample data
3. ✅ Admin user created
4. 🔄 Run: `npm run dev`
5. 🌐 Visit: http://localhost:3000
6. 🔐 Login: http://localhost:3000/admin/login
7. 📝 Customize your portfolio data
8. 🚀 Deploy to production

---

## 💡 Tips

- Use MongoDB Compass for visual database management
- Keep .env.local backed up securely
- Test API endpoints with Postman or Thunder Client
- Monitor database usage in Atlas dashboard
- Enable database backups in Atlas for production

---

**Created:** February 2026  
**Status:** ✅ Ready to use  
**Database:** MongoDB Atlas (Free Tier)
