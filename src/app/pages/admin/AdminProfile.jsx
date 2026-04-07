import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, Save, X } from 'lucide-react';
import AdminLayout from '@/app/components/AdminLayout';
import { useAuth } from '@/app/context/AuthContext';
import userService from '@/services/api/userService';
import authService from '@/services/api/authService';

export default function AdminProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [changePassword, setChangePassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await userService.updateProfile(formData);
      updateProfile(updated);
      setIsEditing(false);
    } catch (error) {
      alert(error.message || 'Unable to update profile.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  const handlePasswordSubmit = async () => {
    if (changePassword.new !== changePassword.confirm) {
      alert('New passwords do not match.');
      return;
    }

    try {
      await authService.updatePassword({
        currentPassword: changePassword.current,
        newPassword: changePassword.new,
      });
      setChangePassword({ current: '', new: '', confirm: '' });
      alert('Password updated successfully.');
    } catch (error) {
      alert(error.message || 'Unable to update password.');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your admin account settings</p>
        </div>

        <motion.div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="size-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-bold">
                {getInitials(user?.name)}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{user?.name || 'Admin User'}</h2>
                <p className="text-purple-100">{user?.email || 'admin@vantalog.com'}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Administrator
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <User className="size-5 text-purple-600" />
                    <span className="text-gray-900">{user?.name || 'Not set'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="size-5 text-purple-600" />
                    <span className="text-gray-900">{user?.email || 'Not set'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{user?.bio || 'No bio added yet'}</p>
                  </div>
                </div>

                <motion.button onClick={() => setIsEditing(true)} className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Edit Profile
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg resize-none" />
                </div>

                <div className="flex gap-3">
                  <motion.button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    <Save className="size-5" />
                    Save Changes
                  </motion.button>
                  <motion.button type="button" onClick={handleCancel} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    <X className="size-5" />
                    Cancel
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input type="password" name="current" value={changePassword.current} onChange={handlePasswordChange} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input type="password" name="new" value={changePassword.new} onChange={handlePasswordChange} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input type="password" name="confirm" value={changePassword.confirm} onChange={handlePasswordChange} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg" />
              </div>
            </div>

            <motion.button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Update Password
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
