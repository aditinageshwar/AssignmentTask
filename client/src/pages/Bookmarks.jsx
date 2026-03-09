import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useStore } from '../lib/store';
import { bookmarksAPI } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function Bookmarks() {
  const navigate = useNavigate();
  const { token, user, bookmarks, setBookmarks, isLoading, setIsLoading } = useStore();

  useEffect(() => {
    if (!token || !user) {
      navigate('/');
      return;
    }

    const fetchBookmarks = async () => {
      setIsLoading(true);
      try {
        const { data } = await bookmarksAPI.getAll();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [token, user, navigate, setBookmarks, setIsLoading]);

  if (!token || !user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-card/20 flex items-center justify-center">
        <div className="text-center">
          <LogIn size={48} className="mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Sign in required</h2>
          <p className="text-muted-foreground mb-6">Please log in to view your bookmarks</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
          >
            Go to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">My Bookmarks</h1>
          <p className="text-xl text-muted-foreground">
            {bookmarks.length} article{bookmarks.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {/* Bookmarked Articles */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass h-96 animate-pulse" />
            ))}
          </div>
        ) : bookmarks.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bookmarks.map((article, index) => (
              <ArticleCard key={article._id} article={article} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No bookmarks yet</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
            >
              Browse Articles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
