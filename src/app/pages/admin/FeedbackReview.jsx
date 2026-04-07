import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Star, Clock, Mail, Tag, BookOpen, CheckCircle2 } from 'lucide-react';
import AdminLayout from '@/app/components/AdminLayout';
import feedbackService from '@/services/api/feedbackService';

export default function FeedbackReview() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState({ total: 0, averageRating: 0 });

  const loadFeedback = async () => {
    try {
      const [feedbackResponse, statsResponse] = await Promise.all([
        feedbackService.getAllFeedback(),
        feedbackService.getFeedbackStats(),
      ]);
      setFeedbackList(feedbackResponse.feedback || []);
      setStats(statsResponse);
    } catch (error) {
      console.error('Failed to load feedback:', error);
      setFeedbackList([]);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const openFeedback = feedbackList.filter((item) => item.status !== 'resolved');
  const resolvedFeedback = feedbackList.filter((item) => item.status === 'resolved');

  const handleResolve = async (feedbackId) => {
    try {
      await feedbackService.updateFeedbackStatus(feedbackId, 'resolved');
      loadFeedback();
    } catch (error) {
      alert(error.message || 'Unable to update feedback.');
    }
  };

  const renderFeedbackCard = (feedback, index, isResolvedSection = false) => (
    <motion.div
      key={feedback.id}
      className="p-6 hover:bg-purple-50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-start gap-4">
        <div className="size-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <Mail className="size-6 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{feedback.name}</h3>
              <p className="text-sm text-gray-600">{feedback.email}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="size-4" />
              <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 font-semibold text-purple-700">
              <Tag className="size-4" />
              <span>{feedback.category}</span>
            </div>
            {feedback.subject && (
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 font-semibold text-orange-700">
                <BookOpen className="size-4" />
                <span>{feedback.subject}</span>
              </div>
            )}
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold ${feedback.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              <CheckCircle2 className="size-4" />
              <span>{feedback.status === 'resolved' ? 'Resolved' : 'Open'}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-3">{feedback.message}</p>

          {feedback.rating && (
            <div className="flex items-center gap-1 mt-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          )}

          {isResolvedSection ? (
            <p className="text-sm font-semibold text-green-700">This feedback has been resolved.</p>
          ) : (
            <button
              type="button"
              onClick={() => handleResolve(feedback.id)}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Mark Resolved
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Feedback Review
          </h1>
          <p className="text-gray-600 text-lg">Review and respond to user feedback</p>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {openFeedback.length === 0 ? (
            <div className="p-12 text-center">
              <div className="size-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="size-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Open Feedback</h3>
              <p className="text-gray-600 max-w-md mx-auto">All submitted feedback items have been resolved.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {openFeedback.map((feedback, index) => renderFeedbackCard(feedback, index))}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="size-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Total Feedback</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.total || 0}</p>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Star className="size-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Avg Rating</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{Number(stats.averageRating || 0).toFixed(1)}</p>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="size-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Open Items</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{openFeedback.length}</p>
          </motion.div>
        </div>

        {resolvedFeedback.length > 0 && (
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border-b border-green-100 bg-green-50 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Resolved Feedback</h2>
              <p className="text-sm text-gray-600">Previously completed reviews are shown here.</p>
            </div>
            <div className="divide-y divide-gray-200">
              {resolvedFeedback.map((feedback, index) => renderFeedbackCard(feedback, index, true))}
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
