import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Upload as UploadIcon } from 'lucide-react';
import AdminLayout from '@/app/components/AdminLayout';
import resourceService from '@/services/api/resourceService';

export default function UploadResource() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subject: '',
    resourceType: 'pdf',
    description: '',
    file: null,
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'Digital Arts', subjects: ['Graphic Design', 'Animation', 'Digital Illustration', 'Photo Editing'] },
    { value: 'Programming', subjects: ['Web Development', 'Python', 'JavaScript', 'Data Structures'] },
    { value: 'Music Theory', subjects: ['Composition', 'Notation', 'Harmony', 'Music Analysis'] },
    { value: 'World Languages', subjects: ['Spanish', 'French', 'Mandarin', 'Linguistics'] },
  ];

  const selectedCategory = categories.find((item) => item.value === formData.category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === 'category' ? { subject: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please choose a file to upload.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('category', formData.category);
      payload.append('subject', formData.subject);
      payload.append('resourceType', formData.resourceType);
      payload.append('description', formData.description);
      payload.append('file', formData.file);

      await resourceService.uploadResource(payload);
      setUploadSuccess(true);
      setFormData({
        title: '',
        category: '',
        subject: '',
        resourceType: 'pdf',
        description: '',
        file: null,
      });
    } catch (error) {
      alert(error.message || 'Upload failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Upload Resource
          </h1>
          <p className="text-gray-600">Add educational content to Vantalog</p>
        </div>

        {uploadSuccess && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 flex items-center gap-3">
            <CheckCircle className="size-5" />
            Resource uploaded successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-purple-100 p-8 shadow-lg space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category.value}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                required
              >
                <option value="">Select subject</option>
                {(selectedCategory?.subjects || []).map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resource Type</label>
              <select
                name="resourceType"
                value={formData.resourceType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="pdf">PDF</option>
                <option value="article">Article</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">File</label>
            <input
              type="file"
              onChange={(e) => setFormData((current) => ({ ...current, file: e.target.files?.[0] || null }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-700 disabled:opacity-50"
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
          >
            <UploadIcon className="size-5" />
            {submitting ? 'Uploading...' : 'Upload Resource'}
          </motion.button>
        </form>
      </div>
    </AdminLayout>
  );
}
