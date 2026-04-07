import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff, Shield, User, BookOpen, Sparkles, Zap, Menu, X } from 'lucide-react';
import authService from '@/services/api/authService';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/Vantalog/Admin/')) {
      setActiveTab('admin');
      return;
    }

    if (location.pathname.includes('/Vantalog/User/')) {
      setActiveTab('user');
    }
  }, [location.pathname]);

  useEffect(() => {
    const targetPath = activeTab === 'admin' ? '/Vantalog/Admin/Log-In' : '/Vantalog/User/Log-In';
    if (location.pathname !== targetPath && (location.pathname.includes('/Log-In') || location.pathname.includes('/Sign-Up'))) {
      navigate(targetPath, { replace: true });
    }
  }, [activeTab, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Entered wrong email.');
      return;
    }

    try {
      setSubmitting(true);
      await authService.precheckLogin({
        email,
        password,
        role: activeTab,
      });

      sessionStorage.setItem('pending_auth', JSON.stringify({
        email,
        password,
        role: activeTab,
        isLogin: true,
      }));

      if (activeTab === 'admin') {
        navigate('/Vantalog/Admin/authenticator-page');
      } else {
        navigate('/Vantalog/User/authenticator-page');
      }
    } catch (err) {
      setError(err.message || 'Unable to verify login.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.header
        className="relative z-10 py-6 px-8 backdrop-blur-sm border-b border-purple-200/50 depth-3d-elevated glass-3d bg-white/80"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl" />
              <div className="relative bg-gradient-to-br from-purple-600 to-violet-600 p-2.5 rounded-xl shadow-lg">
                <GraduationCap className="size-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Vantalog
              </h1>
              <p className="text-xs text-slate-500 font-medium">Educational Excellence</p>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1 flex-wrap">
            <Link to="/Vantalog/About/About-Us" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">About Us</Link>
            <Link to="/Vantalog/About/Contact" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Contact</Link>
            <span className="text-slate-300">|</span>
            <Link to="/Vantalog/Resources/Browse" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Browse</Link>
            <Link to="/Vantalog/Resources/Categories" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Categories</Link>
            <span className="text-slate-300">|</span>
            <Link to="/Vantalog/Support/Help-Center" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Help Center</Link>
            <Link to="/Vantalog/Support/FAQ" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">FAQ</Link>
          </nav>

          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors">
            {showMobileMenu ? <X className="size-6 text-slate-600" /> : <Menu className="size-6 text-slate-600" />}
          </button>
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-purple-200/50 overflow-hidden"
            >
              <nav className="py-4 px-2 space-y-1">
                <Link to="/Vantalog/About/About-Us" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">About Us</Link>
                <Link to="/Vantalog/About/Contact" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Contact</Link>
                <Link to="/Vantalog/Resources/Browse" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Browse</Link>
                <Link to="/Vantalog/Resources/Categories" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">Categories</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="flex-1 grid lg:grid-cols-2">
        <div className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <motion.div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-300/20 rounded-full blur-3xl" animate={{ y: [0, 40, 0], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
                animate={{ y: [0, -20, 0], rotate: [0, 360], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}
              >
                {i % 3 === 0 ? <BookOpen className="size-8 text-white/30" /> : i % 3 === 1 ? <Sparkles className="size-8 text-white/30" /> : <Zap className="size-8 text-white/30" />}
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-12 lg:px-20 py-20">
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome to<br />
                Your Learning<br />
                Journey
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="relative bg-white flex items-center justify-center p-8 lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-violet-50/50 pointer-events-none" />
          <div className="relative w-full max-w-md">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h3>
              <p className="text-slate-600">Sign in with credentials created by an admin.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative mb-8 p-1 bg-slate-100 rounded-2xl">
              <motion.div
                className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 shadow-lg"
                animate={{ x: activeTab === 'user' ? '0.25rem' : 'calc(100% + 0.25rem)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
              <div className="relative flex gap-2">
                <button type="button" onClick={() => setActiveTab('user')} className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 flex items-center justify-center gap-2 ${activeTab === 'user' ? 'text-white' : 'text-slate-600'}`}>
                  <User className="size-4" />
                  User
                </button>
                <button type="button" onClick={() => setActiveTab('admin')} className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 flex items-center justify-center gap-2 ${activeTab === 'admin' ? 'text-white' : 'text-slate-600'}`}>
                  <Shield className="size-4" />
                  Admin
                </button>
              </div>
            </motion.div>

            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-purple-600 transition-colors z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-purple-600 transition-colors z-10" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all"
                    required
                  />
                  <motion.button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-purple-600 transition-colors z-10" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </motion.button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <motion.button type="submit" className="w-full relative group mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30">
                  {submitting ? 'Checking...' : 'Sign In'}
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              <div className="text-center pt-4 space-y-3">
                <p className="text-sm text-slate-600">
                  {activeTab === 'admin'
                    ? 'Additional admin accounts are created by the main admin in the admin panel.'
                    : 'New user accounts are created by the admin panel only.'}
                </p>
                <div>
                  <Link to="/Vantalog/Auth/Forgot-Password" className="text-sm text-slate-500 hover:text-purple-600 font-medium transition-colors">
                    Reset or Forgot your password?
                  </Link>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-6">
          <p className="text-sm text-slate-600 text-center">© 2026 Vantalog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
