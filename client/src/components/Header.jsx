import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, LogOut, LogIn, Bookmark } from 'lucide-react';
import { useStore } from '../lib/store';
import AuthModal from './AuthModal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, token, logout, searchQuery, setSearchQuery } = useStore();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:inline">
                NewsHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/bookmarks"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Bookmark size={20} />
                <span>Bookmarks</span>
              </Link>
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center gap-2 flex-1 mx-8">
              <div className="relative w-full max-w-xs">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-sm bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {token && user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 glass-sm hover:bg-card/60 transition-smooth"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-card/60 rounded-lg transition-smooth"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-white/10">
              <div className="mt-4 mb-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 glass-sm bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <Link
                to="/bookmarks"
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                <Bookmark size={20} />
                <span>Bookmarks</span>
              </Link>

              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                {token && user ? (
                  <>
                    <p className="px-4 py-2 text-sm text-muted-foreground">Hi, {user.name}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleAuthClick('login');
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('signup');
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}
