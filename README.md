# PulseNews AI - AI-Powered News Platform

A modern, AI-powered news aggregation platform built with MongoDB, Express, React, and Node.js. Features breaking news ticker, intelligent content curation, smooth animations, and a sleek purple-themed interface using Framer Motion.

## Project Architecture

```
project-root/
├── /server                 # Express.js backend
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── scripts/
│   │   └── seed.js        # Database seeding
│   ├── server.js          # Main server file
│   └── package.json
│
├── /client                # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities, API client, store
│   │   ├── styles/        # CSS & Tailwind
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── postcss.config.js
│
└── .env.example           # Environment variables template
```

## Tech Stack

### Backend
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router 7
- **State Management**: Zustand
- **Styling**: TailwindCSS 4.0 with custom design tokens
- **Animations**: Framer Motion 11
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Design System
- **Theme**: Dark mode with glassmorphism aesthetic
- **Colors**: Deep blues, purples, with accent orange
- **Components**: Glass-effect cards with backdrop blur effects
- **Animations**: Smooth page transitions, staggered list animations, hover effects

## Features

### Core Features
- **Article Feed**: Browse articles across multiple categories
- **Search & Filter**: Real-time search with category filtering
- **Article Details**: Full-page article view with metadata
- **Bookmarks**: Save favorite articles (requires authentication)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Authentication
- **Sign Up / Login**: User account creation and authentication
- **Session Management**: JWT-based secure sessions
- **Protected Routes**: Bookmarks page requires authentication

### UI/UX
- **Glassmorphism Design**: Modern semi-transparent components with blur effects
- **Smooth Animations**: Page transitions, card animations, hover effects
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Mobile Navigation**: Responsive menu for mobile devices

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas connection)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AssignmentTask
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/news-app
   JWT_SECRET=your_super_secret_key_change_in_production
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Backend

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:5000`

### Running the Frontend

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173`

### Building for Production

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## API Endpoints

### Articles
- `GET /api/articles` - Get all articles with filtering
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles/categories` - Get all categories
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks (requires auth)
- `POST /api/bookmarks/toggle` - Toggle bookmark status
- `DELETE /api/bookmarks/:articleId` - Delete bookmark
- `GET /api/bookmarks/check/:articleId` - Check if article is bookmarked

## Database Schema

### Article
```javascript
{
  title: String,
  description: String,
  content: String,
  author: String,
  category: String (Technology|Business|Science|Health|Entertainment),
  imageUrl: String,
  tags: [String],
  readTime: Number,
  views: Number,
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmark
```javascript
{
  user: ObjectId (ref: User),
  article: ObjectId (ref: Article),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Components

### Frontend Components
- **Header**: Navigation with search, auth buttons, mobile menu
- **ArticleCard**: Reusable article preview card with bookmark button
- **CategoryFilter**: Category selection with animation
- **AuthModal**: Login/signup modal with form validation
- **Footer**: Footer with links and social media

### Pages
- **Home**: Article feed with search and filtering
- **ArticleDetail**: Full article view with metadata and sharing
- **Bookmarks**: User's saved articles (protected route)

## Design Highlights

### Glassmorphism
- Semi-transparent backgrounds with `backdrop-blur`
- Subtle borders with low opacity
- Layered depth with shadows
- Consistent application across all components

### Animations
- Page transitions with Framer Motion
- Staggered list animations for article cards
- Smooth hover effects on interactive elements
- Loading skeletons with shimmer effects
- Modal animations for auth dialog

### Color Scheme
- **Background**: Deep dark (#0f0a0a)
- **Primary**: Vibrant purple (#b624ff)
- **Accent**: Bright orange (#ff8700)
- **Neutrals**: Grays and subtle tones for contrast

## State Management

Uses Zustand for efficient global state management:
- User authentication state
- Articles and categories
- Search and filter queries
- Bookmarks and bookmark status
- Loading states and errors

## Performance Optimizations

- Image lazy loading with Vite
- Component memoization where needed
- Efficient re-renders with Zustand
- CSS transitions for smooth animations
- Optimized Tailwind build with PurgeCSS

## Error Handling

- Try-catch blocks in async operations
- User-friendly error messages
- Automatic token refresh on 401 responses
- Loading states for better UX

## Future Enhancements

- User profiles with reading history
- Article recommendations based on reading history
- Comment system for articles
- Social sharing integration
- Dark/light theme toggle
- Advanced search filters
- Article pagination/infinite scroll
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.
