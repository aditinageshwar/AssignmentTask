import { useStore } from '../lib/store';

export default function CategoryFilter() {
  const { categories, activeCategory, setActiveCategory } = useStore();

  if (!categories || !categories.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => setActiveCategory(null)}
        className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
          activeCategory === null
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
            : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
              : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
