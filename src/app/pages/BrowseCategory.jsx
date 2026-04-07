import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Calculator, BookOpen, Globe, Palette, Code, Music, Dumbbell, X, Lock, ArrowRight } from 'lucide-react';
import PublicLayout from '@/app/components/PublicLayout';

export default function BrowseCategory() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const categories = [
    {
      title: 'Digital Arts',
      description: 'Graphic design, animation, digital illustration, and creative technologies',
      icon: Palette,
      gradient: 'from-purple-600 to-violet-600',
      bgGradient: 'from-purple-100 to-violet-100',
    },
    {
      title: 'Programming',
      description: 'Software development, coding fundamentals, algorithms, and computer science',
      icon: Code,
      gradient: 'from-purple-600 to-purple-700',
      bgGradient: 'from-purple-100 to-purple-200',
    },
    {
      title: 'Music Theory',
      description: 'Musical composition, notation, harmony, rhythm, and instrumental techniques',
      icon: Music,
      gradient: 'from-violet-500 to-violet-600',
      bgGradient: 'from-violet-50 to-violet-100',
    },
    {
      title: 'World Languages',
      description: 'Global languages, cultural communication, linguistics, and language learning',
      icon: Globe,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
    },
  ];

  const handleExploreClick = () => {
    setShowLoginPrompt(true);
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-4rem)] py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-2xl opacity-40" />
                <div className="relative bg-gradient-to-r from-purple-600 to-violet-600 p-6 rounded-3xl shadow-2xl">
                  <BookOpen className="size-14 text-white" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
                style={{ textShadow: '0 2px 40px rgba(147, 51, 234, 0.1)' }}
              >
                Browse by Category
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of educational resources organized by subject area
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className={`relative bg-gradient-to-br ${category.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-white/20`}>
                    {/* Icon */}
                    <motion.div 
                      className={`inline-flex p-4 bg-gradient-to-r ${category.gradient} rounded-2xl shadow-xl mb-6`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                      style={{
                        boxShadow: '0 10px 40px -10px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                      }}
                    >
                      <Icon className="size-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {category.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Button */}
                    <motion.button
                      onClick={handleExploreClick}
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-200"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Resources
                      <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-2xl opacity-10" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0 p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-xl shadow-purple-500/40"
                  style={{
                    boxShadow: '0 15px 40px -10px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                  }}
                >
                  <Lock className="size-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Login Required
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    To access our complete library of educational resources, please create an account or log in.
                  </p>
                </div>
                <motion.a
                  href="/Vantalog/User/Log-In"
                  className="relative group flex-shrink-0"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/40"
                    style={{
                      boxShadow: '0 10px 30px -8px rgba(147, 51, 234, 0.5)'
                    }}
                  >
                    Go to Login
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-10 border border-white/20"
              style={{
                boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                <X className="size-5" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-6"
              >
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-2xl opacity-40" />
                  <div className="relative bg-gradient-to-r from-purple-600 to-violet-600 p-5 rounded-3xl shadow-2xl shadow-purple-500/50"
                    style={{
                      boxShadow: '0 15px 40px -10px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                    }}
                  >
                    <Lock className="size-10 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Login Required
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Please log in to explore resources and access our comprehensive educational library.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <motion.a
                  href="/Vantalog/User/Log-In"
                  className="relative group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-2xl text-center shadow-2xl shadow-purple-500/40"
                    style={{
                      boxShadow: '0 10px 30px -8px rgba(147, 51, 234, 0.5)'
                    }}
                  >
                    Go to Login
                  </div>
                </motion.a>
                
                <motion.button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-8 py-4 text-gray-600 hover:bg-gray-100 font-semibold rounded-2xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}