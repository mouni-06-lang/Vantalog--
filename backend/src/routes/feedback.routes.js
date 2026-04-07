import express from 'express';
import { v4 as uuid } from 'uuid';
import { query } from '../config/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, category = 'general', message, rating = null } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const id = uuid();
    await query(`
      INSERT INTO feedback (id, name, email, category, message, rating, status)
      VALUES (:id, :name, :email, :category, :message, :rating, 'pending')
    `, {
      id,
      name,
      email: String(email).toLowerCase(),
      category,
      message,
      rating: rating ? Number(rating) : null,
    });

    res.status(201).json({ message: 'Feedback submitted successfully.', feedbackId: id });
  } catch (error) {
    next(error);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject, and message are required.' });
    }

    const id = uuid();
    await query(`
      INSERT INTO feedback (id, name, email, category, subject, message, status)
      VALUES (:id, :name, :email, 'contact', :subject, :message, 'pending')
    `, {
      id,
      name,
      email: String(email).toLowerCase(),
      subject,
      message,
    });

    res.status(201).json({ message: 'Message sent successfully.', feedbackId: id });
  } catch (error) {
    next(error);
  }
});

router.get('/', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page || 1), 1);
    const size = Math.min(Math.max(Number(req.query.size || 10), 1), 50);
    const offset = (page - 1) * size;
    const conditions = ['1 = 1'];
    const params = { size, offset };

    if (req.query.status) {
      conditions.push('status = :status');
      params.status = req.query.status;
    }

    if (req.query.category) {
      conditions.push('category = :category');
      params.category = req.query.category;
    }

    const feedback = await query(`
      SELECT *
      FROM feedback
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
      LIMIT :size OFFSET :offset
    `, params);

    const [count] = await query(`SELECT COUNT(*) AS total FROM feedback WHERE ${conditions.join(' AND ')}`, params);

    res.json({
      feedback: feedback.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        category: item.category,
        subject: item.subject || '',
        message: item.message,
        rating: item.rating,
        status: item.status,
        adminResponse: item.admin_response || '',
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      totalElements: count.total || 0,
      totalPages: Math.ceil((count.total || 0) / size),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/stats', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const [totals] = await query(`
      SELECT COUNT(*) AS total, COALESCE(AVG(rating), 0) AS averageRating
      FROM feedback
      WHERE category <> 'contact'
    `);
    const byCategory = await query(`
      SELECT category, COUNT(*) AS total
      FROM feedback
      GROUP BY category
      ORDER BY total DESC
    `);
    const byStatus = await query(`
      SELECT status, COUNT(*) AS total
      FROM feedback
      GROUP BY status
      ORDER BY total DESC
    `);

    res.json({
      total: totals.total || 0,
      averageRating: Number(totals.averageRating || 0),
      byCategory,
      byStatus,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:feedbackId', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const [item] = await query('SELECT * FROM feedback WHERE id = :id LIMIT 1', { id: req.params.feedbackId });
    if (!item) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }
    res.json({
      id: item.id,
      name: item.name,
      email: item.email,
      category: item.category,
      subject: item.subject || '',
      message: item.message,
      rating: item.rating,
      status: item.status,
      adminResponse: item.admin_response || '',
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:feedbackId/status', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    await query('UPDATE feedback SET status = :status WHERE id = :id', {
      status,
      id: req.params.feedbackId,
    });
    res.json({ message: 'Feedback status updated successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/:feedbackId/respond', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res.status(400).json({ message: 'Response message is required.' });
    }

    await query(`
      UPDATE feedback
      SET admin_response = :response,
          status = 'resolved',
          responded_by = :userId,
          responded_at = CURRENT_TIMESTAMP
      WHERE id = :id
    `, {
      response,
      userId: req.user.id,
      id: req.params.feedbackId,
    });

    res.json({ message: 'Response saved successfully.' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:feedbackId', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    await query('DELETE FROM feedback WHERE id = :id', { id: req.params.feedbackId });
    res.json({ message: 'Feedback deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

export default router;
