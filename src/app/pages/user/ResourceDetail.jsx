import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Calendar, Tag, Star, Send, Heart, Download, ExternalLink, Eye } from 'lucide-react';
import { useParams } from 'react-router';
import UserLayout from '@/app/components/UserLayout';
import resourceService from '@/services/api/resourceService';
import feedbackService from '@/services/api/feedbackService';
import userService from '@/services/api/userService';

export default function ResourceDetail() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [resource, setResource] = useState(null);

  const previewUrl = resource
    ? `${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api').replace('/api', '')}${resource.fileUrl}`
    : '';
  const isPdfPreview = resource?.mimeType?.toLowerCase().includes('pdf');
  const isTextPreview = resource?.mimeType?.toLowerCase().startsWith('text/');
  const canPreview = Boolean(isPdfPreview || isTextPreview);

  useEffect(() => {
    const loadResource = async () => {
      try {
        const [resourceResponse, favoritesResponse] = await Promise.all([
          resourceService.getResourceById(id),
          userService.getFavorites(),
        ]);
        setResource(resourceResponse);
        setIsFavorite((favoritesResponse.resources || []).some((item) => item.id === id));
        try {
          await resourceService.trackResourceAccess(id);
        } catch (error) {
          console.error('Failed to track resource access:', error);
        }
      } catch (error) {
        console.error('Failed to load resource:', error);
        setResource(null);
      }
    };

    loadResource();
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await userService.removeFromFavorites(id);
      } else {
        await userService.addToFavorites(id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      alert(error.message || 'Unable to update favorites.');
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await feedbackService.rateResource(id, rating, feedback);
      alert('Thank you for your feedback!');
      setRating(0);
      setFeedback('');
      const updatedResource = await resourceService.getResourceById(id);
      setResource(updatedResource);
    } catch (error) {
      alert(error.message || 'Unable to submit feedback.');
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await resourceService.downloadResource(id);
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = resource?.fileName || 'resource';
      link.click();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      alert(error.message || 'Unable to download this resource.');
    }
  };

  return (
    <UserLayout>
      <div className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {!resource ? (
            <motion.div
              className="bg-white rounded-xl shadow-md p-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-400">
                <FileText className="size-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Resource not found</p>
                <p className="text-sm">The resource you're looking for doesn't exist</p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="bg-white rounded-xl shadow-md p-8 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{resource.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Tag className="size-4" />
                        <span>{resource.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="size-4" />
                        <span>{resource.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="size-4" />
                        <span>{resource.averageRating?.toFixed?.(1) || Number(resource.averageRating || 0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {canPreview && (
                      <motion.button
                        type="button"
                        onClick={() => window.open(previewUrl, '_blank', 'noopener,noreferrer')}
                        className="flex items-center gap-2 px-6 py-3 border border-purple-200 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="size-5" />
                        Preview
                      </motion.button>
                    )}
                    <motion.button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="size-5" />
                      Download
                    </motion.button>
                    <motion.button
                      onClick={handleToggleFavorite}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="size-5" />
                      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </motion.button>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700">{resource.description}</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl shadow-md p-8 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Preview Resource</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Read the resource here or open the full preview in a new tab.
                    </p>
                  </div>
                  {canPreview && (
                    <motion.button
                      type="button"
                      onClick={() => window.open(previewUrl, '_blank', 'noopener,noreferrer')}
                      className="inline-flex items-center gap-2 rounded-lg border border-orange-200 px-5 py-3 font-medium text-orange-600 transition-colors hover:bg-orange-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink className="size-4" />
                      Open Full Preview
                    </motion.button>
                  )}
                </div>

                {canPreview ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <iframe
                      key={previewUrl}
                      src={isPdfPreview ? `${previewUrl}#toolbar=1&navpanes=1&scrollbar=1` : previewUrl}
                      title={`${resource.title} preview`}
                      className="h-[850px] w-full bg-white"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                    <FileText className="mx-auto mb-4 size-12 text-slate-400" />
                    <p className="text-lg font-medium text-slate-700">Preview is not available for this file type.</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Use the download button above to open the resource on your device.
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="bg-white rounded-xl shadow-md p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Leave Feedback</h2>

                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rate this resource
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            className={`size-8 transition-colors ${
                              star <= (hoveredRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your feedback (optional)
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts about this resource..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={rating === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: rating > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: rating > 0 ? 0.98 : 1 }}
                  >
                    <Send className="size-4" />
                    Submit Feedback
                  </motion.button>
                </form>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
