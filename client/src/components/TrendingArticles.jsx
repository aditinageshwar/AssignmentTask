import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrendingArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  const trendingArticles = articles.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="my-20 py-12"
    >
      <motion.div
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Flame className="text-accent" size={28} />
        <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {trendingArticles.map((article, index) => (
          <Link key={article._id} to={`/article/${article._id}`}>
            <motion.div
              variants={itemVariants}
              className="glass-lg overflow-hidden group cursor-pointer h-full"
              whileHover={{
                y: -8,
                boxShadow: '0 25px 50px rgba(var(--primary), 0.25)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <motion.div
                className="relative h-56 overflow-hidden bg-card"
                whileHover={{ filter: 'brightness(1.15)' }}
              >
                <motion.img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
                  initial={{ opacity: 0.4 }}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Rank Badge */}
                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    #{index + 1}
                  </div>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                  className="absolute bottom-4 left-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </motion.div>

                {/* Trending Icon */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="text-accent" size={20} />
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="p-5">
                <motion.h3
                  className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  viewport={{ once: true }}
                >
                  {article.title}
                </motion.h3>

                <motion.p
                  className="text-sm text-muted-foreground mb-4 line-clamp-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {article.description}
                </motion.p>

                <motion.div
                  className="flex items-center justify-between text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="font-medium">{article.author}</span>
                  <span>{article.readTime} min read</span>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="/#articles"
          className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            View All Articles
          </motion.span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
