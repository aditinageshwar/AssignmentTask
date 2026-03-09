import { motion } from 'framer-motion';
import { useStore } from '../lib/store';

export default function CategoryFilter() {
  const { categories, activeCategory, setActiveCategory } = useStore();

  if (!categories.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.div 
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.button
        onClick={() => setActiveCategory(null)}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
          activeCategory === null
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
            : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50'
        }`}
      >
        All
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
              : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
