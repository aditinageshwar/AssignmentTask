import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.footer 
      className="border-t border-white/10 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-2 mb-4"
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <span className="text-white font-bold text-sm">N</span>
              </motion.div>
              <span className="text-lg font-bold">NewsHub</span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Your daily source for news and insights across technology, business, science, health, and entertainment.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="/" className="hover:text-foreground transition-colors">Home</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="/bookmarks" className="hover:text-foreground transition-colors">Bookmarks</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="hover:text-foreground transition-colors">Categories</a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="hover:text-foreground transition-colors">About Us</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 10px 25px rgba(var(--primary), 0.4)" }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 glass-sm hover:bg-primary/20 transition-colors rounded-lg"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 10px 25px rgba(var(--primary), 0.4)" }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 glass-sm hover:bg-primary/20 transition-colors rounded-lg"
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 10px 25px rgba(var(--primary), 0.4)" }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 glass-sm hover:bg-primary/20 transition-colors rounded-lg"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="border-t border-white/10 pt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
        >
          <motion.p 
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} NewsHub. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
