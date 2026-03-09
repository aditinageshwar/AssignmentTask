import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Bookmarks from './pages/Bookmarks';
import { useStore } from './lib/store';
import { authAPI, bookmarksAPI } from './lib/api';

export default function App() {
  const { token, setUser, setBookmarks } = useStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const { data } = await authAPI.getCurrentUser();
          setUser(data.user, token);

          // Fetch user bookmarks
          const { data: bookmarksData } = await bookmarksAPI.getAll();
          setBookmarks(bookmarksData);
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    initializeAuth();
  }, [token, setUser, setBookmarks]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
