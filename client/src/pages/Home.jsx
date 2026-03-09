import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../lib/store';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const {
    articles,
    categories,
    activeCategory,
    searchQuery,
    setArticles,
    setCategories,
    setIsLoading,
    isLoading
  } = useStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await articlesAPI.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [setCategories]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        
        const { data } = await articlesAPI.getAll(params);
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchArticles, 300);
    return () => clearTimeout(debounceTimer);
  }, [activeCategory, searchQuery, setArticles, setIsLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Stay Informed
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the latest news and articles across technology, business, science, health, and entertainment.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <CategoryFilter />
        </motion.div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass h-96 animate-pulse" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article, index) => (
              <ArticleCard key={article._id} article={article} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No articles found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
