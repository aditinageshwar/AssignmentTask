import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react';
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
      console.error('[v0] Error toggling bookmark:', error);
    }
  };

  return (
    <div>
      <Link to={`/article/${article._id}`} className="block group h-full">
        <div 
          className="bg-card rounded-lg overflow-hidden h-full flex flex-col cursor-pointer border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
        >
          {/* Image Container */}
          <div 
            className="relative h-48 overflow-hidden bg-card flex-shrink-0"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
            />
            
            {/* Category Badge */}
            <div 
              className="absolute top-3 left-3"
            >
              <span 
                className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-semibold rounded-full"
              >
                {article.category}
              </span>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkToggle}
              className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background rounded-lg transition-smooth"
            >
              {isBookmarked ? (
                <BookmarkCheck size={20} className="text-accent" />
              ) : (
                <Bookmark size={20} className="text-muted-foreground hover:text-accent" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
              {article.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
              <span className="font-medium">{article.author}</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
