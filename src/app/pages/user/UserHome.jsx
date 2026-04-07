import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Search, Palette, Code, Music, Globe, BookOpen, TrendingUp } from 'lucide-react';
import UserLayout from '@/app/components/UserLayout';
import { useAuth } from '@/app/context/AuthContext';
import resourceService from '@/services/api/resourceService';

export default function UserHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { getUrlSafeName, getUrlSafeEmail, user } = useAuth();
  const [categoriesData, setCategoriesData] = useState([]);
  const [featuredResources, setFeaturedResources] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [categoriesResponse, featuredResponse] = await Promise.all([
          resourceService.getCategories(),
          resourceService.getFeaturedResources(3),
        ]);
        setCategoriesData(categoriesResponse);
        setFeaturedResources(featuredResponse);
      } catch (error) {
        console.error('Failed to load home data:', error);
      }
    };

    loadDashboardData();

    window.addEventListener(resourceService.resourceUpdateEvent, loadDashboardData);
    window.addEventListener('focus', loadDashboardData);

    return () => {
      window.removeEventListener(resourceService.resourceUpdateEvent, loadDashboardData);
      window.removeEventListener('focus', loadDashboardData);
    };
  }, []);

  const handleCategoryClick = (category) => {
    const userName = getUrlSafeName();
    const userEmail = getUrlSafeEmail();
    navigate(`/Vantalog/User/${userName}/${userEmail}/Search?category=${category.toLowerCase()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const userName = getUrlSafeName();
      const userEmail = getUrlSafeEmail();
      navigate(`/Vantalog/User/${userName}/${userEmail}/Search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    {
      title: 'Digital Arts',
      description: 'Graphic design, digital illustration, and visual creativity',
      icon: Palette,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      count: '0 resources',
    },
    {
      title: 'Programming',
      description: 'Software development, coding, and computer science',
      icon: Code,
      gradient: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-100',
      count: '0 resources',
    },
    {
      title: 'Music Theory',
      description: 'Musical composition, instruments, and audio production',
      icon: Music,
      gradient: 'from-purple-600 to-violet-600',
      bgColor: 'bg-purple-100',
      count: '0 resources',
    },
    {
      title: 'World Languages',
      description: 'Foreign languages, linguistics, and cultural studies',
      icon: Globe,
      gradient: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      count: '0 resources',
    },
  ].map((category) => {
    const match = categoriesData.find((item) => item.category.toLowerCase() === category.title.toLowerCase());
    return {
      ...category,
      count: `${match?.resourceCount || 0} resources`,
    };
  });

  return (
    <UserLayout>
      <div className="py-12 px-6 min-h-screen bg-gradient-to-br from-purple-50 via-violet-50/30 to-purple-50 relative overflow-hidden">
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-xl border border-purple-200/50 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-purple-100/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                boxShadow: '0 4px 24px -8px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(147, 51, 234, 0.1) inset'
              }}
            >
              <TrendingUp className="size-4 text-purple-600" />
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Your Learning Dashboard
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
                style={{ textShadow: '0 2px 40px rgba(147, 51, 234, 0.1)' }}
              >
                Welcome, {user?.name || 'Learner'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Discover curated educational content across diverse fields of study
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl blur-xl opacity-20" />
                <div className="relative flex items-center bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-200/50 overflow-hidden">
                  <Search className="absolute left-6 size-6 text-purple-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for resources, topics, or subjects..."
                    className="w-full pl-16 pr-6 py-5 bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400 text-lg"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/40"
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: '0 10px 30px -8px rgba(147, 51, 234, 0.5)'
                    }}
                  >
                    Search
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Explore by Category</h2>
              <p className="text-lg text-gray-600">Browse our comprehensive collection organized by subject area</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    onClick={() => handleCategoryClick(category.title)}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 overflow-hidden border border-white/20 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      {/* Hover Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative">
                        {/* Icon */}
                        <motion.div 
                          className={`size-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          style={{
                            boxShadow: '0 10px 40px -10px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                          }}
                        >
                          <Icon className="size-7 text-white" />
                        </motion.div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {category.description}
                        </p>
                        <p className="text-xs text-purple-600 font-semibold">
                          {category.count}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent/Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-center"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-lg max-w-2xl mx-auto">
              <motion.div
                className="size-20 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
              >
                <BookOpen className="size-10 text-purple-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {featuredResources.length ? 'Featured Resources' : 'Start Your Learning Journey'}
              </h3>
              {featuredResources.length ? (
                <div className="space-y-4 text-left">
                  {featuredResources.map((resource) => (
                    <button
                      key={resource.id}
                      type="button"
                      onClick={() => navigate(`/Vantalog/User/${getUrlSafeName()}/${getUrlSafeEmail()}/Resource/${resource.id}`)}
                      className="w-full rounded-2xl border border-purple-100 bg-purple-50/70 p-4 text-left transition hover:bg-purple-100/80"
                    >
                      <p className="font-semibold text-gray-900">{resource.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{resource.subject} · {resource.type}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-lg leading-relaxed">
                  Explore categories above or use the search bar to discover educational resources tailored to your interests
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
}
