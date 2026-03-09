# NewsHub - Enhanced News Aggregation Platform

A modern, fully-animated news aggregation web application built with React, featuring advanced UI animations, responsive design, and comprehensive news management capabilities.

## 🎨 Features

### Core Features
- 📰 **Browse Articles** - Access thousands of articles across multiple categories
- 🔖 **Bookmark Management** - Save favorite articles for later reading
- 🔍 **Advanced Search** - Search articles by keywords
- 🏷️ **Category Filtering** - Filter articles by Technology, Business, Science, Health, and Entertainment
- 👤 **User Authentication** - Sign up and login with secure JWT authentication
- 📊 **Admin Dashboard** - View statistics and manage content (API available)

### Animation & Design Features
- ✨ **Advanced Framer Motion Animations** - Smooth entrance, hover, and exit animations
- 🎭 **Glass-morphism Design** - Modern frosted glass UI components
- 🌈 **Gradient Effects** - Beautiful gradient backgrounds and text
- 🎯 **Interactive Elements** - All buttons, cards, and forms have smooth hover animations
- 📱 **Responsive Design** - Fully responsive from mobile to desktop
- 🌙 **Dark Theme** - Sleek dark mode with vibrant accent colors

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AssignmentTask
git checkout mern-stack-migration
```

2. **Install dependencies**
```bash
npm run install-all
```

This will install dependencies for both root, client, and server directories.

3. **Set up environment variables**

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/newshub
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

For the client, create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Seed the database with dummy data**
```bash
cd server
npm run seed
cd ..
```

5. **Start the development servers**

In one terminal, start the backend:
```bash
npm run server
```

In another terminal, start the frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
.
├── client/                 # React frontend application
│   ├── src/
│   │   ├── pages/         # Page components (Home, ArticleDetail, Bookmarks)
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and API calls
│   │   ├── styles/        # Global CSS and animations
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── server/                 # Express backend application
│   ├── routes/            # API route handlers
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── middleware/        # Custom middleware
│   ├── config/            # Database configuration
│   ├── scripts/           # Seed script
│   └── server.js          # Server entry point
│
└── package.json           # Root package configuration
```

## 🎯 Key Components

### Pages
- **Home** - Main page with hero section, stats, trending articles, and article grid
- **Article Detail** - Full article view with metadata and action buttons
- **Bookmarks** - User's saved articles collection

### Components
- **Header** - Navigation bar with search and auth buttons
- **Footer** - Footer with links and social media
- **ArticleCard** - Individual article preview card with animations
- **CategoryFilter** - Animated category selector
- **AuthModal** - Login/signup modal with smooth transitions
- **FeaturedStats** - Key metrics display with counters
- **TrendingArticles** - Top 3 trending articles showcase
- **NewsletterSection** - Email subscription form

## 🎬 Animation Features

### Page Animations
- Hero section with gradient text and floating backgrounds
- Staggered entrance animations for elements
- Background gradient blobs with continuous animation
- Section-by-section scroll-triggered animations

### Component Animations
- **Cards**: Lift on hover with enhanced shadow effects
- **Buttons**: Scale and glow effects on interaction
- **Icons**: Rotation and bounce animations
- **Modals**: Spring entrance and exit animations
- **Forms**: Input focus scale effects with smooth transitions
- **Badges**: Spinning entrance with rotation

### Loading States
- Shimmer animation for skeleton screens
- Animated spinner for data loading
- Pulsing opacity for loading indicators
- Progress animations for form submissions

## 🔐 Authentication

- **Sign Up** - Create new user account
- **Login** - Authenticate with email/password
- **JWT Tokens** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Session Management** - Automatic token refresh and validation

## 💾 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Article Model
```javascript
{
  title: String,
  description: String,
  content: String,
  author: String,
  category: String,
  imageUrl: String,
  tags: [String],
  readTime: Number,
  publishedAt: Date,
  createdAt: Date
}
```

### Bookmark Model
```javascript
{
  userId: ObjectId (ref: User),
  articleId: ObjectId (ref: Article),
  createdAt: Date
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#A855F7)
- **Accent**: Orange (#FB923C)
- **Background**: Dark (#19191F)
- **Card**: Dark Gray (#3B3B47)
- **Text**: Light Gray (#E8E8F3)

### Fonts
- **Heading**: System fonts (San Francisco, Segoe UI)
- **Body**: System fonts with fallbacks
- **Mono**: System monospace fonts

### Spacing
- Uses Tailwind CSS spacing scale (0.25rem - 12rem)
- Consistent gap and padding across components
- Responsive spacing adjustments

## 📝 API Endpoints

### Articles
- `GET /api/articles` - Get all articles with filters
- `GET /api/articles/:id` - Get single article
- `GET /api/articles/categories` - Get available categories

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks
- `POST /api/bookmarks/:articleId` - Toggle bookmark

## 🛠️ Development

### Tech Stack
- **Frontend**: React 18, Framer Motion, Tailwind CSS, Zustand
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Build Tool**: Vite
- **Package Manager**: npm (or yarn/pnpm)

### Available Scripts

**Client:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Server:**
```bash
npm run dev      # Start with nodemon
npm start        # Start normally
npm run seed     # Seed database with dummy data
```

## 📦 Dependencies

### Frontend
- react@18.3.1
- framer-motion@11.0.0
- react-router-dom@7.0.0
- zustand@4.4.0
- lucide-react@0.344.0
- axios@1.6.0
- tailwindcss@4.2.1

### Backend
- express@4.18.2
- mongoose@8.0.0
- jsonwebtoken@9.0.2
- bcryptjs@2.4.3
- dotenv@16.3.1
- cors@2.8.5

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (server)
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 npm run server
```

### MongoDB Connection Issues
- Ensure MongoDB is running locally: `mongod`
- Or update MONGODB_URI to your Atlas connection string
- Check .env file is in server directory with correct URI

### API Not Responding
- Ensure both client and server are running
- Check VITE_API_URL matches server port in client .env
- Check CORS_ORIGIN in server .env matches client URL

## 📚 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)

## 🚢 Deployment

### Frontend (Vercel)
1. Push to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Heroku/Railway)
1. Create app on hosting platform
2. Set environment variables
3. Connect MongoDB Atlas database
4. Deploy

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Last Updated**: March 2026
**Version**: 2.0.0 (Enhanced with Advanced Animations)
**Status**: ✅ Production Ready
