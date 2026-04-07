import { Link, useNavigate, useLocation } from 'react-router';
import { GraduationCap, User, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export default function UserLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, getUrlSafeName, getUrlSafeEmail } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Get dynamic URL parts
  const userName = getUrlSafeName();
  const userEmail = getUrlSafeEmail();
  const baseUrl = `/Vantalog/User/${userName}/${userEmail}`;

  // Check if we're not on the home page
  const showBackButton = !location.pathname.includes('/Home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link 
            to={`${baseUrl}/Home`} 
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <GraduationCap className="size-6 text-purple-600" />
            <span className="text-xl font-semibold text-gray-900">Vantalog</span>
          </Link>

          <nav className="flex items-center gap-6">
            {showBackButton && (
              <motion.button
                onClick={handleBack}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="size-4" />
                Back
              </motion.button>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`${baseUrl}/Home`}
                className={`text-sm font-medium transition-colors ${
                  location.pathname.includes('/Home') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`${baseUrl}/Profile`}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                  location.pathname.includes('/Profile') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="size-4" />
                Profile
              </Link>
            </motion.div>
            <motion.button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="size-4" />
              Logout
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-180px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="size-6 text-purple-500" />
              <span className="text-xl font-semibold">Vantalog</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 Vantalog. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
