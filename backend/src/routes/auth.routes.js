import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { publicUser, signToken } from '../utils/security.js';

const router = express.Router();

router.post('/precheck-login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase();
    const users = await query('SELECT * FROM users WHERE email = :email LIMIT 1', { email: normalizedEmail });
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: 'Entered unregistered email.' });
    }

    if (!user.active) {
      return res.status(403).json({ message: 'This account is inactive. Please contact admin.' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Entered wrong email.' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Entered wrong password.' });
    }

    return res.json({ message: 'Credentials verified.' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const users = await query('SELECT * FROM users WHERE email = :email LIMIT 1', { email: String(email).toLowerCase() });
    const user = users[0];

    if (!user || !user.active) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: `This account does not have ${role} access.` });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    return res.status(403).json({
      message: 'Public signup is disabled. Please contact an admin to create your account.',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/admin-request', async (req, res, next) => {
  try {
    const { fullName, displayName, email, password } = req.body;
    if (!fullName || !displayName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingRequest = await query('SELECT id FROM admin_requests WHERE email = :email LIMIT 1', {
      email: String(email).toLowerCase(),
    });
    if (existingRequest.length) {
      return res.status(409).json({ message: 'An admin request already exists for this email.' });
    }

    const existingUser = await query('SELECT id FROM users WHERE email = :email LIMIT 1', {
      email: String(email).toLowerCase(),
    });
    if (existingUser.length) {
      return res.status(409).json({ message: 'This email is already registered. Ask an admin to update your role.' });
    }

    await query(`
      INSERT INTO admin_requests (id, full_name, display_name, email, password_hash, status)
      VALUES (:id, :fullName, :displayName, :email, :passwordHash, 'pending')
    `, {
      id: uuid(),
      fullName: String(fullName).trim(),
      displayName: String(displayName).trim(),
      email: String(email).toLowerCase(),
      passwordHash: await bcrypt.hash(password, 10),
    });

    res.status(201).json({
      message: 'Admin access request submitted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/verify-code', async (req, res) => {
  const { code } = req.body;
  if (!code || String(code).length !== 6) {
    return res.status(400).json({ valid: false, message: 'A valid 6-digit code is required.' });
  }
  return res.json({ valid: true });
});

router.post('/logout', async (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

router.get('/me', requireAuth, async (req, res) => {
  res.json(req.user);
});

router.put('/password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required.' });
    }

    const [user] = await query('SELECT * FROM users WHERE id = :id LIMIT 1', { id: req.user.id });
    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    await query('UPDATE users SET password_hash = :passwordHash WHERE id = :id', {
      id: req.user.id,
      passwordHash: await bcrypt.hash(newPassword, 10),
    });

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/forgot-password', async (req, res, next) => {
  try {
    const { fullName, email, previousPassword, newPassword, role } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required.' });
    }

    const users = await query('SELECT * FROM users WHERE email = :email LIMIT 1', {
      email: String(email).toLowerCase(),
    });
    const user = users[0];

    if (!user || (role && user.role !== role)) {
      return res.status(404).json({ message: 'No matching account found.' });
    }

    const requestId = uuid();
    await query(`
      INSERT INTO password_reset_requests (
        id, user_id, full_name, email, role, previous_password_provided, status
      )
      VALUES (
        :id, :userId, :fullName, :email, :role, :previousPasswordProvided, 'pending'
      )
    `, {
      id: requestId,
      userId: user.id,
      fullName: fullName || user.name,
      email: String(email).toLowerCase(),
      role: role || user.role,
      previousPasswordProvided: previousPassword ? 1 : 0,
    });

    if (fullName && user.name.toLowerCase() !== String(fullName).trim().toLowerCase()) {
      return res.status(400).json({ message: 'Full name does not match this account.' });
    }

    if (previousPassword) {
      const valid = await bcrypt.compare(previousPassword, user.password_hash);
      if (!valid) {
        return res.status(400).json({ message: 'Previous password is incorrect.' });
      }
    }

    await query('UPDATE users SET password_hash = :passwordHash WHERE id = :id', {
      id: user.id,
      passwordHash: await bcrypt.hash(newPassword, 10),
    });

    await query('UPDATE password_reset_requests SET status = :status WHERE id = :id', {
      id: requestId,
      status: 'completed',
    });

    res.json({ message: 'Password reset successfully. You can now log in with your new password.' });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res) => {
  res.status(501).json({ message: 'Token-based password reset is not enabled in this project build.' });
});

export default router;
