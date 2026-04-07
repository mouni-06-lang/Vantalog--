import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { query } from '../config/db.js';
import { publicUser } from '../utils/security.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const users = await query(
      'SELECT id, name, email, role, bio, avatar_url, active, created_at FROM users WHERE id = :id LIMIT 1',
      { id: payload.sub }
    );
    const user = users[0];

    if (!user || !user.active) {
      return res.status(401).json({ message: 'User not found or inactive.' });
    }

    req.user = publicUser(user);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }

    next();
  };
}
