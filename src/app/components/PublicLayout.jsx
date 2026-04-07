import { useState } from 'react';
import { GraduationCap, Menu, X, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

export default function PublicLayout({ children, showBack = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-purple-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Back Button + Logo */}
            <div className="flex items-center gap-4">
              {showBack && (
                <motion.button
                  onClick={() => navigate(-1)}
                  className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="size-5" />
                </motion.button>
              )}
              
              <Link to="/Vantalog/Log-In" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-violet-600 p-2 rounded-lg shadow-md group-hover:shadow-xl transition-shadow">
                    <GraduationCap className="size-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    Vantalog
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/Vantalog/About/About-Us"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/About/About-Us')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/Vantalog/About/Contact"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/About/Contact')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Contact
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to="/Vantalog/Resources/Browse"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Resources/Browse')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Browse
              </Link>
              <Link
                to="/Vantalog/Resources/Categories"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Resources/Categories')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Categories
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to="/Vantalog/Support/Help-Center"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Support/Help-Center')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Help Center
              </Link>
              <Link
                to="/Vantalog/Support/FAQ"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Support/FAQ')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                FAQ
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to="/Vantalog/Legal/Privacy"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Legal/Privacy')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Privacy
              </Link>
              <Link
                to="/Vantalog/Legal/Terms"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive('/Legal/Terms')
                    ? 'text-purple-600 bg-purple-50 font-semibold'
                    : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Terms
              </Link>
            </nav>

            {/* Login Button */}
            <div className="flex items-center gap-3">
              <motion.div
                className="hidden md:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/Vantalog/User/Log-In"
                  className="relative group block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative px-5 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-purple-600/30">
                    Login
                  </div>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-purple-200/50 py-4"
              >
                <nav className="flex flex-col gap-1">
                  <Link
                    to="/Vantalog/About/About-Us"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/Vantalog/About/Contact"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/Vantalog/Resources/Browse"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Browse Resources
                  </Link>
                  <Link
                    to="/Vantalog/Resources/Categories"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/Vantalog/Support/Help-Center"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Help Center
                  </Link>
                  <Link
                    to="/Vantalog/Support/FAQ"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/Vantalog/Legal/Privacy"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Privacy
                  </Link>
                  <Link
                    to="/Vantalog/Legal/Terms"
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    Terms
                  </Link>
                  <Link
                    to="/Vantalog/User/Log-In"
                    className="mt-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold rounded-lg shadow-lg text-center"
                  >
                    Login
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
