import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { query } from '../config/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { normalizeResource, publicUser } from '../utils/security.js';

const router = express.Router();

router.get('/stats', requireAuth, async (req, res, next) => {
  try {
    const [downloads] = await query(`
      SELECT COUNT(*) AS total
      FROM resource_access_logs
      WHERE user_id = :userId AND access_type = 'download'
    `, { userId: req.user.id });

    const [favorites] = await query('SELECT COUNT(*) AS total FROM favorites WHERE user_id = :userId', {
      userId: req.user.id,
    });

    const [uploads] = await query('SELECT COUNT(*) AS total FROM resources WHERE uploaded_by = :userId AND active = 1', {
      userId: req.user.id,
    });

    res.json({
      downloads: downloads.total || 0,
      favorites: favorites.total || 0,
      uploads: uploads.total || 0,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/downloads', requireAuth, async (req, res, next) => {
  try {
    const rows = await query(`
      SELECT r.*
      FROM resource_access_logs ral
      INNER JOIN resources r ON r.id = ral.resource_id
      WHERE ral.user_id = :userId AND ral.access_type = 'download' AND r.active = 1
      GROUP BY r.id
      ORDER BY MAX(ral.created_at) DESC
    `, { userId: req.user.id });
    res.json({ resources: rows.map(normalizeResource) });
  } catch (error) {
    next(error);
  }
});

router.get('/favorites', requireAuth, async (req, res, next) => {
  try {
    const rows = await query(`
      SELECT r.*, f.created_at AS favorited_at
      FROM favorites f
      INNER JOIN resources r ON r.id = f.resource_id
      WHERE f.user_id = :userId AND r.active = 1
      ORDER BY f.created_at DESC
    `, { userId: req.user.id });

    res.json({
      resources: rows.map((row) => ({
        ...normalizeResource(row),
        favoritedAt: row.favorited_at,
      })),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/favorites/:resourceId', requireAuth, async (req, res, next) => {
  try {
    await query(`
      INSERT IGNORE INTO favorites (id, user_id, resource_id)
      VALUES (:id, :userId, :resourceId)
    `, {
      id: uuid(),
      userId: req.user.id,
      resourceId: req.params.resourceId,
    });
    res.json({ message: 'Resource added to favorites.' });
  } catch (error) {
    next(error);
  }
});

router.delete('/favorites/:resourceId', requireAuth, async (req, res, next) => {
  try {
    await query('DELETE FROM favorites WHERE user_id = :userId AND resource_id = :resourceId', {
      userId: req.user.id,
      resourceId: req.params.resourceId,
    });
    res.json({ message: 'Resource removed from favorites.' });
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/profile', requireAuth, async (req, res, next) => {
  try {
    const targetUserId = req.params.userId === 'me' ? req.user.id : req.params.userId;
    if (targetUserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You cannot view this profile.' });
    }

    const [user] = await query('SELECT id, name, email, role, bio, avatar_url, active, created_at FROM users WHERE id = :id LIMIT 1', {
      id: targetUserId,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(publicUser(user));
  } catch (error) {
    next(error);
  }
});

router.put('/profile', requireAuth, async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const existing = await query('SELECT id FROM users WHERE email = :email AND id <> :id LIMIT 1', {
      email: String(email).toLowerCase(),
      id: req.user.id,
    });

    if (existing.length) {
      return res.status(409).json({ message: 'Another account already uses this email.' });
    }

    await query(`
      UPDATE users
      SET name = :name, email = :email, bio = :bio
      WHERE id = :id
    `, {
      id: req.user.id,
      name: String(name).trim(),
      email: String(email).toLowerCase(),
      bio: bio || null,
    });

    const [user] = await query('SELECT * FROM users WHERE id = :id LIMIT 1', { id: req.user.id });
    res.json(publicUser(user));
  } catch (error) {
    next(error);
  }
});

router.post('/avatar', requireAuth, upload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Avatar file is required.' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    await query('UPDATE users SET avatar_url = :avatarUrl WHERE id = :id', {
      id: req.user.id,
      avatarUrl,
    });
    res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
});

router.get('/', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const conditions = ['1 = 1'];
    const params = {};
    if (req.query.role) {
      conditions.push('role = :role');
      params.role = req.query.role;
    }
    if (req.query.search) {
      conditions.push('(name LIKE :search OR email LIKE :search)');
      params.search = `%${req.query.search}%`;
    }

    const users = await query(`
      SELECT id, name, email, role, bio, avatar_url, active, created_at
      FROM users
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
    `, params);

    const adminRequests = await query(`
      SELECT id, full_name, display_name, email, status, created_at
      FROM admin_requests
      ORDER BY created_at DESC
    `);

    res.json({
      users: users.map(publicUser),
      adminRequests: adminRequests.map((row) => ({
        id: row.id,
        fullName: row.full_name,
        displayName: row.display_name,
        email: row.email,
        status: row.status,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { name, email, password, role = 'user', bio = '' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await query('SELECT id FROM users WHERE email = :email LIMIT 1', {
      email: String(email).toLowerCase(),
    });

    if (existingUser.length) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const id = uuid();
    await query(`
      INSERT INTO users (id, name, email, password_hash, role, bio, active)
      VALUES (:id, :name, :email, :passwordHash, :role, :bio, 1)
    `, {
      id,
      name: String(name).trim(),
      email: String(email).toLowerCase(),
      passwordHash: await bcrypt.hash(password, 10),
      role: role === 'admin' ? 'admin' : 'user',
      bio: bio || null,
    });

    res.status(201).json({ message: `${role === 'admin' ? 'Admin' : 'User'} created successfully.` });
  } catch (error) {
    next(error);
  }
});

router.post('/admin-requests/:requestId/approve', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const [request] = await query('SELECT * FROM admin_requests WHERE id = :id LIMIT 1', {
      id: req.params.requestId,
    });

    if (!request) {
      return res.status(404).json({ message: 'Admin request not found.' });
    }

    if (request.status === 'approved') {
      return res.status(400).json({ message: 'This admin request is already approved.' });
    }

    const existingUser = await query('SELECT id FROM users WHERE email = :email LIMIT 1', {
      email: request.email,
    });

    if (existingUser.length) {
      await query(`
        UPDATE users
        SET role = 'admin', active = 1
        WHERE id = :id
      `, { id: existingUser[0].id });
    } else {
      await query(`
        INSERT INTO users (id, name, email, password_hash, role, active)
        VALUES (:id, :name, :email, :passwordHash, 'admin', 1)
      `, {
        id: uuid(),
        name: request.display_name || request.full_name,
        email: request.email,
        passwordHash: request.password_hash,
      });
    }

    await query(`
      UPDATE admin_requests
      SET status = 'approved', reviewed_by = :reviewedBy, reviewed_at = CURRENT_TIMESTAMP
      WHERE id = :id
    `, {
      id: req.params.requestId,
      reviewedBy: req.user.id,
    });

    res.json({ message: 'Admin request approved successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/admin-requests/:requestId/reject', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const [request] = await query('SELECT id FROM admin_requests WHERE id = :id LIMIT 1', {
      id: req.params.requestId,
    });

    if (!request) {
      return res.status(404).json({ message: 'Admin request not found.' });
    }

    await query(`
      UPDATE admin_requests
      SET status = 'rejected', reviewed_by = :reviewedBy, reviewed_at = CURRENT_TIMESTAMP
      WHERE id = :id
    `, {
      id: req.params.requestId,
      reviewedBy: req.user.id,
    });

    res.json({ message: 'Admin request rejected.' });
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/role', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { role } = req.body;
    await query('UPDATE users SET role = :role WHERE id = :id', {
      role,
      id: req.params.userId,
    });
    res.json({ message: 'User role updated successfully.' });
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { name, email, role, bio, active } = req.body;
    const existingEmail = await query('SELECT id FROM users WHERE email = :email AND id <> :id LIMIT 1', {
      email: String(email).toLowerCase(),
      id: req.params.userId,
    });

    if (existingEmail.length) {
      return res.status(409).json({ message: 'Another account already uses this email.' });
    }

    await query(`
      UPDATE users
      SET name = :name,
          email = :email,
          role = :role,
          bio = :bio,
          active = :active
      WHERE id = :id
    `, {
      id: req.params.userId,
      name: String(name).trim(),
      email: String(email).toLowerCase(),
      role,
      bio: bio || null,
      active: active ? 1 : 0,
    });

    res.json({ message: 'User updated successfully.' });
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/status', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { active } = req.body;
    await query('UPDATE users SET active = :active WHERE id = :id', {
      id: req.params.userId,
      active: active ? 1 : 0,
    });
    res.json({ message: 'User status updated successfully.' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    await query('DELETE FROM users WHERE id = :id', { id: req.params.userId });
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

export default router;
