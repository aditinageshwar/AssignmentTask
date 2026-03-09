import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Globe } from 'lucide-react';

export default function FeaturedStats() {
  const stats = [
    {
      label: 'Articles',
      value: '10K+',
      icon: Globe,
      color: 'from-primary',
      delay: 0,
    },
    {
      label: 'Active Users',
      value: '50K+',
      icon: Users,
      color: 'from-accent',
      delay: 0.1,
    },
    {
      label: 'Daily Updates',
      value: '100+',
      icon: Zap,
      color: 'from-primary',
      delay: 0.2,
    },
    {
      label: 'Categories',
      value: '8',
      icon: TrendingUp,
      color: 'from-accent',
      delay: 0.3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-lg p-6 group"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--primary), 0.2)' }}
            >
              <motion.div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} to-accent/50 rounded-lg flex items-center justify-center mb-4`}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <IconComponent size={24} className="text-white" />
              </motion.div>

              <motion.h3
                className="text-sm text-muted-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: stat.delay }}
              >
                {stat.label}
              </motion.h3>

              <motion.p
                className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: stat.delay + 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.p>

              <motion.div
                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: stat.delay + 0.2, duration: 0.6 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
