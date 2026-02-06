# 🚀 Portfolio with MongoDB & Admin Panel

A modern, dynamic portfolio website for Tharinda built with Next.js 15, MongoDB, and Tailwind CSS. Features a complete admin panel for content management without needing to touch code.

## ✨ Features

- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🗄️ **MongoDB Integration** - Dynamic content stored in MongoDB Atlas
- 🔐 **Admin Panel** - Full content management system at `/admin`
- 📱 **Responsive** - Works perfectly on all devices
- 🎯 **SEO Friendly** - Optimized for search engines
- ⚡ **Fast** - Next.js 15 App Router with optimizations
- 🖼️ **Image Optimization** - Next.js Image component for optimal performance

## 📋 Sections

- **Hero** - Introduction with call-to-action
- **About** - Personal information with profile image
- **Skills** - Categorized skills with progress bars
- **Projects** - Featured projects with images (shows 4 on homepage, all on /projects)
- **Experience** - Work history timeline
- **Education** - Educational background
- **Contact** - Contact form

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **Authentication**: Session-based (Next-Auth ready)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Handling**: Next.js Image component

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier)
3. Get your connection string
4. Whitelist your IP (or use 0.0.0.0/0 for development)

### 3. Environment Variables

Copy the example file and configure:

```bash
copy .env.local.example .env.local
```

Edit `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Admin Credentials (for initial setup)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

Generate a secret:
```bash
openssl rand -base64 32
```

### 4. Create Admin User

```bash
node scripts/create-admin.js
```

### 5. (Optional) Seed Sample Projects

```bash
node scripts/seed-projects.js
```

### 6. Run Development Server

```bash
npm run dev
```

Visit:
- **Homepage**: http://localhost:3000
- **Projects Page**: http://localhost:3000/projects
- **Admin Login**: http://localhost:3000/admin/login

## 📁 Project Structure

```
thari/
├── public/
│   ├── projects/          # Project images
│   └── profilePic.jpeg    # Profile picture
├── src/
│   ├── app/
│   │   ├── admin/         # Admin panel pages
│   │   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── api/           # API routes
│   │   │   ├── auth/
│   │   │   ├── education/
│   │   │   ├── experiences/
│   │   │   ├── projects/
│   │   │   └── skills/
│   │   ├── projects/      # All projects page
│   │   └── page.tsx       # Homepage
│   ├── lib/
│   │   ├── mongodb.ts     # MongoDB connection
│   │   └── types.ts       # TypeScript types
│   └── styles/
├── scripts/
│   ├── create-admin.js    # Create admin user
│   └── seed-projects.js   # Seed sample data
├── .env.local.example
├── SETUP.md
└── README.md
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?limit=4` - Get recent 4 projects
- `POST /api/projects` - Create project
- `PUT /api/projects` - Update project
- `DELETE /api/projects?id=xxx` - Delete project

### Experience
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience
- `PUT /api/experiences` - Update experience
- `DELETE /api/experiences?id=xxx` - Delete experience

### Education
- `GET /api/education` - Get all education
- `POST /api/education` - Create education
- `PUT /api/education` - Update education
- `DELETE /api/education?id=xxx` - Delete education

### Skills
- `GET /api/skills` - Get all skill categories
- `POST /api/skills` - Create skill category
- `PUT /api/skills` - Update skill category
- `DELETE /api/skills?id=xxx` - Delete skill category

## 🎯 Using the Admin Panel

### 1. Login

Navigate to `/admin/login` and use your admin credentials.

### 2. Managing Content

Currently, the admin dashboard provides links to manage:
- Projects
- Experience
- Education
- Skills

**Note**: Full CRUD UI pages for each section can be added. For now, use the API endpoints directly with tools like Postman or create frontend forms.

### 3. Example: Creating a Project via API

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Project description here",
    "tags": ["React", "Node.js"],
    "image": "/projects/new-project.jpg",
    "githubUrl": "https://github.com/username/repo",
    "liveUrl": "https://project-demo.com",
    "featured": true
  }'
```

## 🖼️ Adding Images

1. Add project images to `public/projects/`
2. Reference them in database as `/projects/your-image.jpg`
3. Profile picture goes in `public/profilePic.jpeg`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### MongoDB Atlas

- Update IP whitelist to allow connections from anywhere (0.0.0.0/0)
- Or add Vercel's IP ranges

## 🔒 Security Notes

⚠️ **Important for Production:**

1. **Protect API Routes**: Add authentication middleware
2. **Secure Admin**: Implement proper session management
3. **Environment Variables**: Never commit `.env.local`
4. **CORS**: Configure properly for production
5. **Rate Limiting**: Add to API routes
6. **Input Validation**: Validate all user inputs

## 📝 Next Steps / Enhancements

- [ ] Create full CRUD UI for admin panel
- [ ] Add image upload functionality (Cloudinary/AWS S3)
- [ ] Implement proper session management
- [ ] Add API route protection
- [ ] Create forms for all content types
- [ ] Add rich text editor for descriptions
- [ ] Implement search and filters on projects page
- [ ] Add pagination for projects
- [ ] Email functionality for contact form
- [ ] Add analytics

## 🤝 For Tharinda

Your friend has set up everything you need! Here's what you can do:

1. **Login** → Go to `/admin/login` with your credentials
2. **Manage Content** → Use the admin panel or API to add/edit:
   - Your projects
   - Work experience
   - Education details
   - Skills
3. **Update Images** → Add images to `public/projects/` folder
4. **Customize** → Ask your friend to modify any design elements

## 📄 License

This is a personal portfolio project.

## 👤 Contact

**Tharinda Abeywardana**
- Email: tharinda@example.com
- University: University of Moratuwa
- Field: Electronic & Telecommunication Engineering

---

Built with ❤️ for Tharinda
