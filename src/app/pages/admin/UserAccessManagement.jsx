import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, UserCheck, UserX, Shield, Users as UsersIcon, Pencil, Trash2, Save, X } from 'lucide-react';
import AdminLayout from '@/app/components/AdminLayout';
import userService from '@/services/api/userService';

export default function UserAccessManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [adminRequests, setAdminRequests] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'user', bio: '', active: true });
  const [newAccount, setNewAccount] = useState({ name: '', email: '', password: '', role: 'user', bio: '' });

  const loadUsers = async (search = '') => {
    try {
      const response = await userService.getAllUsers({ search });
      setUsers(response.users || []);
      setAdminRequests(response.adminRequests || []);
    } catch (error) {
      console.error('Failed to load users:', error);
      setUsers([]);
      setAdminRequests([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio || '',
      active: user.active,
    });
  };

  const saveUser = async () => {
    try {
      await userService.updateUser(editingUserId, editForm);
      setEditingUserId(null);
      loadUsers(searchTerm);
    } catch (error) {
      alert(error.message || 'Unable to update user.');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await userService.deleteUser(userId);
      loadUsers(searchTerm);
    } catch (error) {
      alert(error.message || 'Unable to delete user.');
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await userService.updateUserRole(userId, role);
      loadUsers(searchTerm);
    } catch (error) {
      alert(error.message || 'Unable to update role.');
    }
  };

  const handleStatusChange = async (userId, active) => {
    try {
      await userService.updateUserStatus(userId, active);
      loadUsers(searchTerm);
    } catch (error) {
      alert(error.message || 'Unable to update status.');
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      if (action === 'approve') {
        await userService.approveAdminRequest(requestId);
      } else {
        await userService.rejectAdminRequest(requestId);
      }
      loadUsers(searchTerm);
    } catch (error) {
      alert(error.message || 'Unable to update admin request.');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser(newAccount);
      setNewAccount({ name: '', email: '', password: '', role: 'user', bio: '' });
      loadUsers(searchTerm);
    } catch (error) {
      alert(error.message || 'Unable to create account.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
            User Access Management
          </h1>
          <p className="text-gray-600 text-lg">Manage user accounts and permissions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create User or Admin</h2>
          <form onSubmit={handleCreateAccount} autoComplete="off" className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              autoComplete="off"
              value={newAccount.name}
              onChange={(e) => setNewAccount((c) => ({ ...c, name: e.target.value }))}
              placeholder="Full name"
              className="rounded-lg border px-4 py-3"
              required
            />
            <input
              type="email"
              autoComplete="new-password"
              name="create-account-email"
              value={newAccount.email}
              onChange={(e) => setNewAccount((c) => ({ ...c, email: e.target.value }))}
              placeholder="Email"
              className="rounded-lg border px-4 py-3"
              required
            />
            <input
              type="password"
              autoComplete="new-password"
              name="create-account-password"
              value={newAccount.password}
              onChange={(e) => setNewAccount((c) => ({ ...c, password: e.target.value }))}
              placeholder="Password"
              className="rounded-lg border px-4 py-3"
              required
            />
            <select
              autoComplete="off"
              value={newAccount.role}
              onChange={(e) => setNewAccount((c) => ({ ...c, role: e.target.value }))}
              className="rounded-lg border px-4 py-3"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700">
              Create Account
            </button>
          </form>
          <textarea
            autoComplete="off"
            value={newAccount.bio}
            onChange={(e) => setNewAccount((c) => ({ ...c, bio: e.target.value }))}
            placeholder="Optional bio"
            rows={3}
            className="mt-4 w-full rounded-lg border px-4 py-3"
          />
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
                loadUsers(next);
              }}
              placeholder="Search users by name or email..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
          {users.length === 0 ? (
            <div className="p-12 text-center">
              <div className="size-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="size-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Users Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">There are no registered users at the moment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50 border-b-2 border-purple-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-purple-900">Status</th>
                    <th className="text-right py-4 px-6 text-sm font-bold text-purple-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    const isEditing = editingUserId === user.id;
                    return (
                      <motion.tr
                        key={user.id}
                        className="border-b border-gray-200 hover:bg-purple-50 transition-colors align-top"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {isEditing ? (
                            <div className="space-y-2 min-w-[180px]">
                              <input className="w-full rounded-lg border px-3 py-2" value={editForm.name} onChange={(e) => setEditForm((c) => ({ ...c, name: e.target.value }))} />
                              <textarea className="w-full rounded-lg border px-3 py-2" rows={3} value={editForm.bio} onChange={(e) => setEditForm((c) => ({ ...c, bio: e.target.value }))} />
                            </div>
                          ) : user.name}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {isEditing ? (
                            <input className="w-full rounded-lg border px-3 py-2 min-w-[220px]" value={editForm.email} onChange={(e) => setEditForm((c) => ({ ...c, email: e.target.value }))} />
                          ) : user.email}
                        </td>
                        <td className="py-4 px-6">
                          {isEditing ? (
                            <select className="rounded-lg border px-3 py-2" value={editForm.role} onChange={(e) => setEditForm((c) => ({ ...c, role: e.target.value }))}>
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {user.role}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {isEditing ? (
                            <select className="rounded-lg border px-3 py-2" value={String(editForm.active)} onChange={(e) => setEditForm((c) => ({ ...c, active: e.target.value === 'true' }))}>
                              <option value="true">active</option>
                              <option value="false">inactive</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {user.active ? 'active' : 'inactive'}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            {isEditing ? (
                              <>
                                <button type="button" onClick={saveUser} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                                  <Save className="size-5" />
                                </button>
                                <button type="button" onClick={() => setEditingUserId(null)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                  <X className="size-5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button type="button" onClick={() => startEditing(user)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit User">
                                  <Pencil className="size-5" />
                                </button>
                                <button type="button" onClick={() => handleStatusChange(user.id, true)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Activate User">
                                  <UserCheck className="size-5" />
                                </button>
                                <button type="button" onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')} className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors" title="Toggle Admin">
                                  <Shield className="size-5" />
                                </button>
                                <button type="button" onClick={() => handleStatusChange(user.id, false)} className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors" title="Deactivate User">
                                  <UserX className="size-5" />
                                </button>
                                <button type="button" onClick={() => handleDelete(user.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete User">
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

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Access Requests</h2>
          {adminRequests.length === 0 ? (
            <p className="text-gray-500">No pending or historical admin requests found.</p>
          ) : (
            <div className="space-y-3">
              {adminRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{request.fullName}</p>
                    <p className="text-sm text-gray-600">{request.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      {request.status}
                    </span>
                    {request.status === 'pending' && (
                      <>
                        <button type="button" onClick={() => handleRequestAction(request.id, 'approve')} className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700">
                          Approve
                        </button>
                        <button type="button" onClick={() => handleRequestAction(request.id, 'reject')} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
