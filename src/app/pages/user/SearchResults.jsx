import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';
import UserLayout from '@/app/components/UserLayout';
import { Skeleton } from '@/app/components/ui/skeleton';
import resourceService from '@/services/api/resourceService';
import { useAuth } from '@/app/context/AuthContext';

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [resources, setResources] = useState([]);
  const { getUrlSafeName, getUrlSafeEmail } = useAuth();

  const subjectsByCategory = {
    'digital arts': ['Graphic Design', 'Animation', 'Digital Illustration', 'Photo Editing'],
    'programming': ['Web Development', 'Python', 'JavaScript', 'Data Structures'],
    'music theory': ['Composition', 'Notation', 'Harmony', 'Music Analysis'],
    'world languages': ['Spanish', 'French', 'Mandarin', 'Linguistics'],
  };

  const normalizedCategory = category?.toLowerCase();
  const subjects = normalizedCategory ? subjectsByCategory[normalizedCategory] || [] : [];

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      try {
        const response = query
          ? await resourceService.searchResources({
              query,
              category: normalizedCategory || '',
              subject: selectedSubject === 'all' ? '' : selectedSubject,
              type: selectedType === 'all' ? '' : selectedType,
            })
          : await resourceService.getAllResources({
              category: normalizedCategory || '',
              subject: selectedSubject === 'all' ? '' : selectedSubject,
              type: selectedType === 'all' ? '' : selectedType,
            });
        setResources(response.resources || []);
      } catch (error) {
        console.error('Failed to load search results:', error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    loadResults();

    window.addEventListener(resourceService.resourceUpdateEvent, loadResults);
    window.addEventListener('focus', loadResults);

    return () => {
      window.removeEventListener(resourceService.resourceUpdateEvent, loadResults);
      window.removeEventListener('focus', loadResults);
    };
  }, [normalizedCategory, query, selectedSubject, selectedType]);

  const openResource = (resourceId) => {
    navigate(`/Vantalog/User/${getUrlSafeName()}/${getUrlSafeEmail()}/Resource/${resourceId}`);
  };

  return (
    <UserLayout>
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Resources` : `Search Results${query ? ` for "${query}"` : ''}`}
              </h1>

              <motion.button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SlidersHorizontal className="size-5" />
                <span className="font-medium">Filters</span>
              </motion.button>
            </div>
          </motion.div>

          {filterOpen && (
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">Filter Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category && subjects.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">All Subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject.toLowerCase()}>{subject}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Types</option>
                    <option value="pdf">PDF</option>
                    <option value="article">Article</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : resources.length === 0 ? (
            <motion.div
              className="bg-white rounded-xl shadow-md p-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-gray-400">
                {category ? <BookOpen className="size-16 mx-auto mb-4 text-gray-300" /> : <Search className="size-16 mx-auto mb-4 text-gray-300" />}
                <p className="text-lg font-medium mb-2">No results found</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => openResource(resource.id)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{resource.category}</span>
                      <span>·</span>
                      <span>{resource.subject}</span>
                      <span>·</span>
                      <span>{resource.type}</span>
                      <span>·</span>
                      <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                    </div>
                    <motion.button
                      className="text-purple-600 font-medium hover:text-purple-700"
                      whileHover={{ x: 5 }}
                    >
                      View →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
