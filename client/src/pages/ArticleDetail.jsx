import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, User, Share2 } from 'lucide-react';
import { useStore } from '../lib/store';
import { articlesAPI, bookmarksAPI } from '../lib/api';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, user, toggleBookmark, bookmarkedArticleIds } = useStore();
  const isBookmarked = article && bookmarkedArticleIds.has(article._id);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await articlesAPI.getById(id);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, navigate]);

  const handleBookmarkToggle = async () => {
    if (!token || !user) {
      alert('Please login to bookmark articles');
      return;
    }

    try {
      await bookmarksAPI.toggle(article._id);
      toggleBookmark(article._id);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/20 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.p 
            className="text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading article...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Article not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8"
        >
          <ArrowLeft size={20} />
          Back to Articles
        </motion.button>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-lg p-8 mb-8"
        >
          {/* Category Badge */}
          <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
            {article.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime} min read</span>
            </div>
            <div>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-lg overflow-hidden mb-8"
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-lg p-8 mb-8"
        >
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg leading-relaxed text-foreground">
              {article.content}
            </p>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-card/40 border border-white/10 rounded-full text-sm text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-lg p-6 flex gap-4"
        >
          <motion.button
            onClick={handleBookmarkToggle}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth font-medium"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(var(--primary), 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={isBookmarked ? { rotate: 360 } : {}}
              transition={{ duration: 0.3 }}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck size={20} />
                  Bookmarked
                </>
              ) : (
                <>
                  <Bookmark size={20} />
                  Bookmark
                </>
              )}
            </motion.div>
          </motion.button>
          
          <motion.button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('Link copied to clipboard!');
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 glass-sm hover:bg-card/60 transition-smooth font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Share2 size={20} />
            </motion.div>
            Share
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
