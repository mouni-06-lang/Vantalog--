import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Settings, Save, Heart, Edit, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import UserLayout from '@/app/components/UserLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useAuth } from '@/app/context/AuthContext';
import userService from '@/services/api/userService';

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, updateProfile, getUrlSafeName, getUrlSafeEmail } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User Name',
    email: user?.email || 'user@email.com',
    bio: user?.bio || '',
  });
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'User Name',
        email: user.email || 'user@email.com',
        bio: user.bio || '',
      });
    }
  }, [user]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await userService.getFavorites();
        setFavourites(response.resources || []);
      } catch (error) {
        console.error('Failed to load favorites:', error);
        setFavourites([]);
      }
    };

    loadFavorites();
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await userService.updateProfile(profileData);
      updateProfile(updated);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert(error.message || 'Unable to update your profile.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || 'User Name',
      email: user?.email || 'user@email.com',
      bio: user?.bio || '',
    });
  };

  return (
    <UserLayout>
      <div className="py-8 px-6 min-h-screen bg-gradient-to-br from-purple-50 via-violet-50/30 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-8">
              My Profile
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-100/50 p-6 text-center">
                <div className="size-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4 shadow-lg shadow-purple-500/30">
                  {profileData.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{profileData.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{profileData.email}</p>
                <div className="text-xs text-gray-500">
                  <p>Member since</p>
                  <p className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-100/50">
                <Tabs defaultValue="favourites" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-t-2xl px-6">
                    <TabsTrigger value="favourites" className="gap-2">
                      <Heart className="size-4" />
                      My Favourites
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2">
                      <Settings className="size-4" />
                      Account Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="favourites" className="p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">My Favourites</h2>

                      {favourites.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                          <Heart className="size-16 mx-auto mb-4 text-purple-200" />
                          <p className="text-lg font-medium mb-2">No favourites yet</p>
                          <p className="text-sm">Resources you mark as favourite will appear here</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="border-b border-gray-200">
                              <tr>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Resource</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Added</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {favourites.map((favourite, index) => (
                                <motion.tr
                                  key={favourite.id}
                                  className="border-b border-gray-200 hover:bg-purple-50 transition-colors"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <td className="py-3 px-4">{favourite.title}</td>
                                  <td className="py-3 px-4">{favourite.category}</td>
                                  <td className="py-3 px-4">{favourite.favoritedAt ? new Date(favourite.favoritedAt).toLocaleDateString() : '-'}</td>
                                  <td className="py-3 px-4">
                                    <motion.button
                                      type="button"
                                      onClick={() => navigate(`/Vantalog/User/${getUrlSafeName()}/${getUrlSafeEmail()}/Resource/${favourite.id}`)}
                                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                      whileHover={{ x: 5 }}
                                    >
                                      View →
                                    </motion.button>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="settings" className="p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
                        {!isEditing ? (
                          <motion.button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-violet-700 transition-all shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Edit className="size-4" />
                            Edit Profile
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <X className="size-4" />
                            Cancel
                          </motion.button>
                        )}
                      </div>

                      <form onSubmit={handleSave} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              value={profileData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg transition-all ${
                                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' : 'bg-gray-50 cursor-not-allowed'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg transition-all ${
                                isEditing ? 'focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' : 'bg-gray-50 cursor-not-allowed'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                          <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none transition-all ${
                              isEditing ? 'focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' : 'bg-gray-50 cursor-not-allowed'
                            }`}
                          />
                        </div>

                        {isEditing && (
                          <motion.button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-violet-700 transition-colors shadow-lg shadow-purple-500/30"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Save className="size-4" />
                            Save Changes
                          </motion.button>
                        )}
                      </form>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
