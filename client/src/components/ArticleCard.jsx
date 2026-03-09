import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../lib/store';
import { bookmarksAPI } from '../lib/api';

const ArticleCard = ({ article, index }) => {
  const { token, user, toggleBookmark, bookmarkedArticleIds } = useStore();
  const isBookmarked = bookmarkedArticleIds.has(article._id);

  const handleBookmarkToggle = async (e) => {
    e.preventDefault();
    
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/article/${article._id}`} className="block group h-full">
        <motion.div 
          className="glass overflow-hidden h-full flex flex-col cursor-pointer"
          whileHover={{ boxShadow: "0 20px 40px rgba(var(--primary), 0.2)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Container */}
          <motion.div 
            className="relative h-48 overflow-hidden bg-card flex-shrink-0"
            whileHover={{ filter: "brightness(1.1)" }}
          >
            <motion.img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" 
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 0.3 }}
            />
            
            {/* Category Badge */}
            <motion.div 
              className="absolute top-3 left-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <motion.span 
                className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-semibold rounded-full"
                whileHover={{ backgroundColor: "hsl(var(--primary) / 1)" }}
              >
                {article.category}
              </motion.span>
            </motion.div>

            {/* Bookmark Button */}
            <motion.button
              onClick={handleBookmarkToggle}
              className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background rounded-lg transition-smooth"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isBookmarked ? { rotate: 360 } : {}}
                transition={{ duration: 0.3 }}
              >
                {isBookmarked ? (
                  <BookmarkCheck size={20} className="text-accent" />
                ) : (
                  <Bookmark size={20} className="text-muted-foreground hover:text-accent" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <motion.h3 
              className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              {article.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.15 }}
            >
              {article.description}
            </motion.p>

            {/* Footer */}
            <motion.div 
              className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <span>{article.author}</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readTime} min</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
