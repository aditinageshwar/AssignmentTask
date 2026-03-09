import { motion } from 'framer-motion';
import { useStore } from '../lib/store';

export default function CategoryFilter() {
  const { categories, activeCategory, setActiveCategory } = useStore();

  if (!categories.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => setActiveCategory(null)}
        className={`px-4 py-2 glass-sm whitespace-nowrap transition-smooth ${
          activeCategory === null
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 glass-sm whitespace-nowrap transition-smooth ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
