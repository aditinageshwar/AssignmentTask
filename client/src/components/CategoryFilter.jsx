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
      className="flex gap-2 overflow-x-auto pb-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={() => setActiveCategory(null)}
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(var(--primary), 0.2)" }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 glass-sm whitespace-nowrap transition-smooth ${
          activeCategory === null
            ? 'bg-primary text-primary-foreground glow'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        All
      </motion.button>
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(var(--primary), 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 glass-sm whitespace-nowrap transition-smooth ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground glow'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <motion.span
            animate={activeCategory === category ? { letterSpacing: "0.05em" } : {}}
            transition={{ duration: 0.2 }}
          >
            {category}
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  );
}
