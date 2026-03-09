import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus('error');
      }
      setLoading(false);
    }, 500);
  };

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="my-20 py-16"
    >
      {/* Background gradient elements */}
      <div className="relative">
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 glass-lg p-12 md:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Mail size={18} className="text-primary" />
                <span className="text-primary font-semibold text-sm">Stay Updated</span>
              </motion.div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              Never Miss Breaking News
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8"
            >
              Subscribe to our newsletter and get the latest articles delivered straight to your inbox every week.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <motion.input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 px-6 py-4 glass-sm bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
                whileFocus={{ scale: 1.02 }}
              />

              <motion.button
                type="submit"
                disabled={loading || status === 'success'}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    ⏳
                  </motion.span>
                ) : status === 'success' ? (
                  'Subscribed!'
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </motion.form>

            {/* Status Messages */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: status ? 1 : 0,
                height: status ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {status === 'success' && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-accent"
                >
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">Welcome! Check your email for a welcome message.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-destructive"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">Please enter a valid email address.</span>
                </motion.div>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mt-8 pt-8 border-t border-white/10"
            >
              <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                <span className="text-primary">✓</span>
                <span>No spam, unsubscribe anytime</span>
              </motion.div>
              <motion.div className="hidden md:block text-white/20">|</motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                <span className="text-primary">✓</span>
                <span>Exclusive content for subscribers</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
