# PulseNews AI - Quick Start Guide

## What Changed?

The NewsHub application has been completely redesigned to match the **PulseNews AI** platform with:

✨ **Breaking News Ticker** - Auto-rotating headlines at the top  
🎨 **New Branding** - PulseNews AI logo with purple theme  
🎭 **Modern UI** - Cleaner cards, improved animations  
🚀 **Better UX** - Smoother interactions and transitions  

## Running the App

### Prerequisites
- Node.js 16+
- MongoDB (for backend)
- npm or yarn

### Client Setup (Port 5173)
```bash
cd client
npm install
npm run dev
```

### Server Setup (Port 5000)
```bash
cd server
npm install
npm run dev
```

### Seeding Database
```bash
cd server
npm run seed
```

## What You'll See

### Home Page Features
1. **Breaking News Ticker** (Red banner at top)
   - Rotates through news headlines every 5 seconds
   - Click dots to manually navigate

2. **Header** 
   - PulseNews AI logo with animated glow
   - Search bar (functional)
   - Sign In/Sign Up buttons
   - Bookmarks link

3. **Hero Section**
   - Large "PulseNews AI" title
   - Animated background gradients
   - Call-to-action buttons

4. **Article Grid**
   - Filter by category (Technology, Business, Science, Health, Entertainment)
   - Cards with images, titles, descriptions
   - Author and read time info
   - Bookmark functionality

### Design Colors
- **Purple Primary**: `#A855F7`
- **Red Accent** (Breaking News): `#FF0000`
- **Dark Background**: `#121212`
- **Light Text**: `#F2F2F2`

## Key Files Modified

### New Components
- `client/src/components/BreakingNewsTicker.jsx` - News ticker
- `client/src/components/PulseHeroSection.jsx` - Hero section

### Updated Components
- `client/src/components/Header.jsx` - New PulseNews AI branding
- `client/src/components/ArticleCard.jsx` - Simplified design
- `client/src/components/CategoryFilter.jsx` - Better styling
- `client/src/components/Footer.jsx` - Updated branding

### Updated Pages
- `client/src/pages/Home.jsx` - New layout with hero section
- `client/src/styles/index.css` - Purple theme colors
- `client/tailwind.config.js` - CSS color variables

### Updated Config
- `client/index.html` - New page title

## Features

### Fully Functional
✅ User authentication (sign up, login, logout)  
✅ Article browsing and filtering  
✅ Bookmark articles  
✅ Search functionality  
✅ Responsive design (mobile, tablet, desktop)  
✅ Smooth animations throughout  

### Data
- Real articles fetched from backend
- Dummy breaking news (can be updated)
- Multiple categories to explore
- User accounts with bookmarks

## Animation Details

### Breaking News
- Auto-scrolls every 5 seconds
- Smooth slide transitions
- Pulsing alert icon

### Cards
- Entrance animations on scroll
- Hover lift effect
- Image zoom on hover
- Shadow glow enhancement

### Navigation
- Smooth page transitions
- Button scale effects
- Logo glow animation

## Mobile Responsiveness

All features work perfectly on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 🖥️ Desktop (1024px+)

Touch-friendly buttons and menus for mobile users.

## Customization

### Change Breaking News
Edit `client/src/components/BreakingNewsTicker.jsx`:
```javascript
const breakingNews = [
  "Your custom news here",
  "Another headline",
  // ...
];
```

### Change Colors
Edit `client/src/styles/index.css`:
```css
:root {
  --primary: 280 100% 50%;      /* Change this */
  --accent: 0 100% 50%;         /* Or this */
}
```

### Update Brand Name
Replace "PulseNews" in:
- `Header.jsx`
- `Footer.jsx`
- `index.html`

## Troubleshooting

### Articles not showing?
1. Make sure MongoDB is running
2. Run `npm run seed` in server directory
3. Check server logs for errors

### Styling looks wrong?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Verify Tailwind CSS is loaded

### Search not working?
1. Ensure server is running on port 5000
2. Check network tab in DevTools
3. Verify search query is being sent

## Deployment

### To Vercel
```bash
# Connect GitHub repo
vercel --prod

# Or via Vercel dashboard
```

### Environment Variables
Create `.env` files:

**Server** (`server/.env`):
```
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=5000
```

**Client** (`client/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

## Next Steps

1. **Test locally** - Run dev servers and explore
2. **Customize colors** - Update theme to your brand
3. **Update breaking news** - Add real news sources
4. **Deploy** - Push to production
5. **Monitor** - Track user engagement

## Support

For issues or questions:
1. Check the `PULSENEWS_REDESIGN.md` for detailed info
2. Review component comments
3. Check browser console for errors
4. Inspect network requests in DevTools

---

**Ready to launch PulseNews AI?** 🚀  
Run `npm run dev` in both directories and open `http://localhost:5173`
