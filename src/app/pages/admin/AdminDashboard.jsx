import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { FolderOpen, Users, MessageSquare, TrendingUp, Activity, PieChart, ArrowUpRight } from 'lucide-react';
import AdminLayout from '@/app/components/AdminLayout';
import { useAuth } from '@/app/context/AuthContext';
import resourceService from '@/services/api/resourceService';
import userService from '@/services/api/userService';
import feedbackService from '@/services/api/feedbackService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { getUrlSafeName, getUrlSafeEmail } = useAuth();
  const [statsData, setStatsData] = useState({
    resources: { totalResources: 0, recentUploads: [] },
    users: { users: [] },
    feedback: { total: 0 },
  });

  const adminName = getUrlSafeName();
  const adminEmail = getUrlSafeEmail();
  const baseUrl = `/Vantalog/Admin/${adminName}/${adminEmail}`;

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [resourceStats, usersResponse, feedbackStats] = await Promise.all([
          resourceService.getResourceStats(),
          userService.getAllUsers(),
          feedbackService.getFeedbackStats(),
        ]);
        setStatsData({
          resources: resourceStats,
          users: usersResponse,
          feedback: feedbackStats,
        });
      } catch (error) {
        console.error('Failed to load admin dashboard:', error);
      }
    };

    loadDashboard();

    window.addEventListener(resourceService.resourceUpdateEvent, loadDashboard);
    window.addEventListener('focus', loadDashboard);

    return () => {
      window.removeEventListener(resourceService.resourceUpdateEvent, loadDashboard);
      window.removeEventListener('focus', loadDashboard);
    };
  }, []);

  const stats = [
    {
      title: 'Total Resources',
      value: String(statsData.resources.totalResources || 0),
      icon: FolderOpen,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      link: `${baseUrl}/Resource-Management`,
      description: 'Educational materials',
    },
    {
      title: 'Total Users',
      value: String((statsData.users.users || []).length),
      icon: Users,
      gradient: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-100',
      link: `${baseUrl}/User-Access`,
      description: 'Active accounts',
    },
    {
      title: 'Feedback Count',
      value: String(statsData.feedback.total || 0),
      icon: MessageSquare,
      gradient: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-100',
      link: `${baseUrl}/Feedback-Review`,
      description: 'User submissions',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 min-h-screen">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Activity className="size-4" />
            Admin Panel
          </motion.div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's your platform performance at a glance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                onClick={() => navigate(stat.link)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 cursor-pointer overflow-hidden border border-purple-100 hover:border-purple-300 transition-all"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${stat.bgColor} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div className={`size-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30`}>
                      <Icon className="size-7 text-white" />
                    </motion.div>
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-purple-100 rounded-lg">
                      <TrendingUp className="size-3.5 text-purple-600" />
                      <span className="text-xs font-bold text-purple-600">Live</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-semibold text-gray-900">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="relative bg-white rounded-2xl shadow-lg p-8 overflow-hidden border border-purple-100">
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <PieChart className="size-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Uploads</h2>
            </div>

            {statsData.resources.recentUploads?.length ? (
              <div className="space-y-4">
                {statsData.resources.recentUploads.map((resource) => (
                  <div key={resource.id} className="rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{resource.title}</p>
                      <p className="text-sm text-gray-600">{resource.category} · {resource.subject}</p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(resource.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">No uploads yet.</div>
            )}
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">System Health</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Platform Status</span><span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">Active</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Database</span><span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">Connected</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">API Services</span><span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">Running</span></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="size-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Platform Metrics</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Downloads</span><span className="text-lg font-bold text-gray-900">{statsData.resources.totalDownloads || 0}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Views</span><span className="text-lg font-bold text-gray-900">{statsData.resources.totalViews || 0}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Average Rating</span><span className="text-lg font-bold text-gray-900">{Number(statsData.feedback.averageRating || 0).toFixed(1)}</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
