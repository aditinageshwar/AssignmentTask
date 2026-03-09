import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../lib/store';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import PulseHeroSection from '../components/PulseHeroSection';

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
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <PulseHeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <CategoryFilter />
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8">Latest News</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="bg-card rounded-lg h-96 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ArticleCard key={article._id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-muted-foreground">No articles found. Try adjusting your filters.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
