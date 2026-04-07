import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, Download, Pencil, Save, X } from 'lucide-react';
import AdminLayout from '@/app/components/AdminLayout';
import resourceService from '@/services/api/resourceService';

const categoryMap = {
  'Digital Arts': ['Graphic Design', 'Animation', 'Digital Illustration', 'Photo Editing'],
  Programming: ['Web Development', 'Python', 'JavaScript', 'Data Structures'],
  'Music Theory': ['Composition', 'Notation', 'Harmony', 'Music Analysis'],
  'World Languages': ['Spanish', 'French', 'Mandarin', 'Linguistics'],
};

export default function ResourceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    subject: '',
    resourceType: '',
    description: '',
    file: null,
    currentFileName: '',
  });

  const loadResources = async (search = '') => {
    try {
      const response = await resourceService.getAllResources({ search });
      setResources(response.resources || []);
    } catch (error) {
      console.error('Failed to load resources:', error);
      setResources([]);
    }
  };

  useEffect(() => {
    loadResources();

    const refreshResources = () => {
      loadResources(searchTerm);
    };

    window.addEventListener(resourceService.resourceUpdateEvent, refreshResources);
    window.addEventListener('focus', refreshResources);

    return () => {
      window.removeEventListener(resourceService.resourceUpdateEvent, refreshResources);
      window.removeEventListener('focus', refreshResources);
    };
  }, [searchTerm]);

  const handleDelete = async (resourceId) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      await resourceService.deleteResource(resourceId);
      loadResources(searchTerm);
    } catch (error) {
      alert(error.message || 'Delete failed.');
    }
  };

  const startEditing = (resource) => {
    setEditingId(resource.id);
    setEditForm({
      title: resource.title,
      category: resource.category,
      subject: resource.subject,
      resourceType: resource.type,
      description: resource.description,
      file: null,
      currentFileName: resource.fileName || '',
    });
  };

  const saveEdit = async () => {
    try {
      const payload = new FormData();
      payload.append('title', editForm.title);
      payload.append('category', editForm.category);
      payload.append('subject', editForm.subject);
      payload.append('resourceType', editForm.resourceType);
      payload.append('description', editForm.description);
      if (editForm.file) {
        payload.append('file', editForm.file);
      }
      await resourceService.updateResource(editingId, payload);
      setEditingId(null);
      setEditForm({
        title: '',
        category: '',
        subject: '',
        resourceType: '',
        description: '',
        file: null,
        currentFileName: '',
      });
      loadResources(searchTerm);
    } catch (error) {
      alert(error.message || 'Update failed.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            Resource Management
          </h1>
          <p className="text-gray-600 text-lg">Manage and organize your educational resources</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                const next = e.target.value;
                setSearchTerm(next);
                loadResources(next);
              }}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
          {resources.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No resources found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50 border-b-2 border-purple-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Title</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Category</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Type</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Date</th>
                    <th className="text-right py-4 px-6 text-sm font-bold text-purple-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource, index) => {
                    const isEditing = editingId === resource.id;
                    return (
                      <motion.tr
                        key={resource.id}
                        className="border-b border-gray-200 hover:bg-purple-50 transition-colors align-top"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {isEditing ? (
                            <div className="space-y-3 min-w-[260px]">
                              <input className="w-full rounded-lg border px-3 py-2" value={editForm.title} onChange={(e) => setEditForm((c) => ({ ...c, title: e.target.value }))} />
                              <textarea className="w-full rounded-lg border px-3 py-2" rows={4} value={editForm.description} onChange={(e) => setEditForm((c) => ({ ...c, description: e.target.value }))} />
                              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
                                <p className="mb-2 text-xs font-medium text-gray-500">
                                  Current file: <span className="text-gray-700">{editForm.currentFileName || 'No file name'}</span>
                                </p>
                                <input
                                  type="file"
                                  className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
                                  onChange={(e) => setEditForm((c) => ({ ...c, file: e.target.files?.[0] || null }))}
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                  Choose a new file only if you want to replace the existing resource file.
                                </p>
                              </div>
                            </div>
                          ) : resource.title}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {isEditing ? (
                            <div className="space-y-3 min-w-[180px]">
                              <select className="w-full rounded-lg border px-3 py-2" value={editForm.category} onChange={(e) => setEditForm((c) => ({ ...c, category: e.target.value, subject: '' }))}>
                                {Object.keys(categoryMap).map((category) => <option key={category} value={category}>{category}</option>)}
                              </select>
                              <select className="w-full rounded-lg border px-3 py-2" value={editForm.subject} onChange={(e) => setEditForm((c) => ({ ...c, subject: e.target.value }))}>
                                {(categoryMap[editForm.category] || []).map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                              </select>
                            </div>
                          ) : resource.category}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {isEditing ? (
                            <select className="w-full rounded-lg border px-3 py-2 min-w-[120px]" value={editForm.resourceType} onChange={(e) => setEditForm((c) => ({ ...c, resourceType: e.target.value }))}>
                              <option value="pdf">pdf</option>
                              <option value="article">article</option>
                            </select>
                          ) : resource.type}
                        </td>
                        <td className="py-4 px-6 text-gray-600">{new Date(resource.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            {isEditing ? (
                              <>
                                <button type="button" onClick={saveEdit} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                                  <Save className="size-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditForm({
                                      title: '',
                                      category: '',
                                      subject: '',
                                      resourceType: '',
                                      description: '',
                                      file: null,
                                      currentFileName: '',
                                    });
                                  }}
                                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <X className="size-5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => startEditing(resource)}
                                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                  <Pencil className="size-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => window.open(`${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api').replace('/api', '')}${resource.fileUrl}`, '_blank')}
                                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                                >
                                  <Download className="size-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(resource.id)}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                  <Trash2 className="size-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
