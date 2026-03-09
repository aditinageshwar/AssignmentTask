import { useEffect } from 'react';
import { useStore } from '../lib/store';
import { articlesAPI } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const {
    articles,
    activeCategory,
    searchQuery,
    setArticles,
    setIsLoading,
    isLoading
  } = useStore();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        
        const { data } = await articlesAPI.getAll(params);
        console.log('[v0] Fetched articles:', data);
        setArticles(data.articles || data);
      } catch (error) {
        console.error('[v0] Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory, searchQuery, setArticles, setIsLoading]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <CategoryFilter />
        </div>

        {/* Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Latest News</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ArticleCard key={article._id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
