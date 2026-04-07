import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { query } from '../config/db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { normalizeResource } from '../utils/security.js';

const router = express.Router();

function buildResourceWhere(params) {
  const where = ['r.active = 1'];
  const sqlParams = {};

  if (params.category) {
    where.push('LOWER(r.category) = :category');
    sqlParams.category = String(params.category).toLowerCase();
  }

  if (params.subject) {
    where.push('LOWER(r.subject) = :subject');
    sqlParams.subject = String(params.subject).toLowerCase();
  }

  if (params.type) {
    where.push('LOWER(r.resource_type) = :type');
    sqlParams.type = String(params.type).toLowerCase();
  }

  const keyword = params.search || params.query;
  if (keyword) {
    where.push('(r.title LIKE :keyword OR r.description LIKE :keyword OR r.subject LIKE :keyword)');
    sqlParams.keyword = `%${keyword}%`;
  }

  return { where: where.join(' AND '), sqlParams };
}

router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page || 1), 1);
    const size = Math.min(Math.max(Number(req.query.size || 12), 1), 50);
    const offset = (page - 1) * size;
    const sort = req.query.sort === 'title' ? 'r.title ASC' : 'r.created_at DESC';
    const { where, sqlParams } = buildResourceWhere(req.query);

    const resources = await query(`
      SELECT r.*
      FROM resources r
      WHERE ${where}
      ORDER BY ${sort}
      LIMIT :size OFFSET :offset
    `, { ...sqlParams, size, offset });

    const countRows = await query(`SELECT COUNT(*) AS total FROM resources r WHERE ${where}`, sqlParams);
    const totalElements = countRows[0]?.total || 0;

    res.json({
      resources: resources.map(normalizeResource),
      totalElements,
      totalPages: Math.ceil(totalElements / size),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const mergedQuery = { ...req.query, search: req.query.query || req.query.search || '' };
    const page = Math.max(Number(mergedQuery.page || 1), 1);
    const size = Math.min(Math.max(Number(mergedQuery.size || 12), 1), 50);
    const offset = (page - 1) * size;
    const { where, sqlParams } = buildResourceWhere(mergedQuery);

    const resources = await query(`
      SELECT r.*
      FROM resources r
      WHERE ${where}
      ORDER BY r.created_at DESC
      LIMIT :size OFFSET :offset
    `, { ...sqlParams, size, offset });

    const countRows = await query(`SELECT COUNT(*) AS total FROM resources r WHERE ${where}`, sqlParams);
    const totalElements = countRows[0]?.total || 0;

    res.json({
      resources: resources.map(normalizeResource),
      totalElements,
      totalPages: Math.ceil(totalElements / size),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const rows = await query(`
      SELECT category, COUNT(*) AS resourceCount
      FROM resources
      WHERE active = 1
      GROUP BY category
      ORDER BY category ASC
    `);
    res.json(rows.map((row) => ({
      category: row.category,
      resourceCount: row.resourceCount,
    })));
  } catch (error) {
    next(error);
  }
});

router.get('/featured', async (req, res, next) => {
  try {
    const limitValue = Math.min(Math.max(Number(req.query.limit || 6), 1), 20);
    const rows = await query(`
      SELECT *
      FROM resources
      WHERE active = 1
      ORDER BY is_featured DESC, average_rating DESC, created_at DESC
      LIMIT :limitValue
    `, { limitValue });
    res.json(rows.map(normalizeResource));
  } catch (error) {
    next(error);
  }
});

router.get('/stats', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const [counts] = await query(`
      SELECT
        COUNT(*) AS totalResources,
        COALESCE(SUM(download_count), 0) AS totalDownloads,
        COALESCE(SUM(view_count), 0) AS totalViews
      FROM resources
      WHERE active = 1
    `);

    const byCategory = await query(`
      SELECT category, COUNT(*) AS total
      FROM resources
      WHERE active = 1
      GROUP BY category
      ORDER BY total DESC
    `);

    const recentUploads = await query(`
      SELECT r.*, u.name AS uploaderName
      FROM resources r
      INNER JOIN users u ON u.id = r.uploaded_by
      WHERE r.active = 1
      ORDER BY r.created_at DESC
      LIMIT 5
    `);

    res.json({
      totalResources: counts.totalResources || 0,
      totalDownloads: counts.totalDownloads || 0,
      totalViews: counts.totalViews || 0,
      byCategory,
      recentUploads: recentUploads.map((row) => ({
        ...normalizeResource(row),
        uploaderName: row.uploaderName,
      })),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/category/:category', async (req, res, next) => {
  try {
    req.query.category = req.params.category;
    const page = Math.max(Number(req.query.page || 1), 1);
    const size = Math.min(Math.max(Number(req.query.size || 12), 1), 50);
    const offset = (page - 1) * size;
    const { where, sqlParams } = buildResourceWhere(req.query);

    const resources = await query(`
      SELECT r.*
      FROM resources r
      WHERE ${where}
      ORDER BY r.created_at DESC
      LIMIT :size OFFSET :offset
    `, { ...sqlParams, size, offset });

    const countRows = await query(`SELECT COUNT(*) AS total FROM resources r WHERE ${where}`, sqlParams);
    const totalElements = countRows[0]?.total || 0;

    res.json({
      resources: resources.map(normalizeResource),
      totalElements,
      totalPages: Math.ceil(totalElements / size),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:resourceId/ratings', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page || 1), 1);
    const size = Math.min(Math.max(Number(req.query.size || 10), 1), 50);
    const offset = (page - 1) * size;

    const ratings = await query(`
      SELECT rr.id, rr.rating, rr.comment, rr.created_at, u.name
      FROM resource_ratings rr
      INNER JOIN users u ON u.id = rr.user_id
      WHERE rr.resource_id = :resourceId
      ORDER BY rr.updated_at DESC
      LIMIT :size OFFSET :offset
    `, { resourceId: req.params.resourceId, size, offset });

    const [summary] = await query(`
      SELECT COUNT(*) AS totalRatings, COALESCE(AVG(rating), 0) AS averageRating
      FROM resource_ratings
      WHERE resource_id = :resourceId
    `, { resourceId: req.params.resourceId });

    res.json({
      ratings: ratings.map((row) => ({
        id: row.id,
        rating: row.rating,
        comment: row.comment || '',
        userName: row.name,
        createdAt: row.created_at,
      })),
      totalRatings: summary.totalRatings || 0,
      averageRating: Number(summary.averageRating || 0),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/:resourceId/rate', requireAuth, async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const [resource] = await query(`
      SELECT id, title, category, subject
      FROM resources
      WHERE id = :resourceId AND active = 1
      LIMIT 1
    `, { resourceId: req.params.resourceId });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    const existing = await query(`
      SELECT id
      FROM resource_ratings
      WHERE user_id = :userId AND resource_id = :resourceId
      LIMIT 1
    `, { userId: req.user.id, resourceId: req.params.resourceId });

    if (existing.length) {
      await query(`
        UPDATE resource_ratings
        SET rating = :rating, comment = :comment
        WHERE id = :id
      `, {
        id: existing[0].id,
        rating: numericRating,
        comment: comment || null,
      });
    } else {
      await query(`
        INSERT INTO resource_ratings (id, user_id, resource_id, rating, comment)
        VALUES (:id, :userId, :resourceId, :rating, :comment)
      `, {
        id: uuid(),
        userId: req.user.id,
        resourceId: req.params.resourceId,
        rating: numericRating,
        comment: comment || null,
      });
    }

    await query(`
      INSERT INTO feedback (id, name, email, category, subject, message, rating, status)
      VALUES (:id, :name, :email, :category, :subject, :message, :rating, 'pending')
    `, {
      id: uuid(),
      name: req.user.name,
      email: String(req.user.email).toLowerCase(),
      category: resource.category,
      subject: `${resource.subject} - ${resource.title}`,
      message: comment?.trim() || `Rated "${resource.title}" with ${numericRating} star${numericRating === 1 ? '' : 's'}.`,
      rating: numericRating,
    });

    await query(`
      UPDATE resources
      SET average_rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM resource_ratings
        WHERE resource_id = :resourceId
      )
      WHERE id = :resourceId
    `, { resourceId: req.params.resourceId });

    res.json({ message: 'Rating submitted successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/:resourceId/track', requireAuth, async (req, res, next) => {
  try {
    await query(`
      INSERT INTO resource_access_logs (id, user_id, resource_id, access_type)
      VALUES (:id, :userId, :resourceId, 'view')
    `, {
      id: uuid(),
      userId: req.user.id,
      resourceId: req.params.resourceId,
    });

    await query('UPDATE resources SET view_count = view_count + 1 WHERE id = :resourceId', {
      resourceId: req.params.resourceId,
    });

    res.json({ message: 'Resource access tracked.' });
  } catch (error) {
    next(error);
  }
});

router.get('/:resourceId/download', requireAuth, async (req, res, next) => {
  try {
    const [resource] = await query('SELECT * FROM resources WHERE id = :id AND active = 1 LIMIT 1', {
      id: req.params.resourceId,
    });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    const filePath = path.resolve(process.cwd(), resource.file_path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on disk.' });
    }

    await query(`
      INSERT INTO resource_access_logs (id, user_id, resource_id, access_type)
      VALUES (:id, :userId, :resourceId, 'download')
    `, {
      id: uuid(),
      userId: req.user.id,
      resourceId: resource.id,
    });
    await query('UPDATE resources SET download_count = download_count + 1 WHERE id = :id', { id: resource.id });

    res.download(filePath, resource.file_name);
  } catch (error) {
    next(error);
  }
});

router.get('/:resourceId', async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM resources WHERE id = :id AND active = 1 LIMIT 1', { id: req.params.resourceId });
    const resource = rows[0];
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.json(normalizeResource(resource));
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, requireRole('admin'), upload.single('file'), async (req, res, next) => {
  try {
    const { title, category, subject, resourceType, description, isFeatured } = req.body;
    if (!title || !category || !subject || !resourceType || !description || !req.file) {
      return res.status(400).json({ message: 'Title, category, subject, resource type, description, and file are required.' });
    }

    const id = uuid();
    await query(`
      INSERT INTO resources (
        id, title, category, subject, resource_type, description,
        file_name, file_path, mime_type, size_bytes, uploaded_by, is_featured
      )
      VALUES (
        :id, :title, :category, :subject, :resourceType, :description,
        :fileName, :filePath, :mimeType, :sizeBytes, :uploadedBy, :isFeatured
      )
    `, {
      id,
      title,
      category,
      subject,
      resourceType,
      description,
      fileName: req.file.originalname,
      filePath: path.join('uploads', req.file.filename),
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      uploadedBy: req.user.id,
      isFeatured: isFeatured === 'true' ? 1 : 0,
    });

    const [resource] = await query('SELECT * FROM resources WHERE id = :id LIMIT 1', { id });
    res.status(201).json({
      message: 'Resource uploaded successfully.',
      resourceId: id,
      resource: normalizeResource(resource),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:resourceId', requireAuth, requireRole('admin'), upload.single('file'), async (req, res, next) => {
  try {
    const [existing] = await query('SELECT * FROM resources WHERE id = :id LIMIT 1', { id: req.params.resourceId });
    if (!existing) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    const updates = {
      title: req.body.title || existing.title,
      category: req.body.category || existing.category,
      subject: req.body.subject || existing.subject,
      resourceType: req.body.resourceType || existing.resource_type,
      description: req.body.description || existing.description,
      fileName: existing.file_name,
      filePath: existing.file_path,
      mimeType: existing.mime_type,
      sizeBytes: existing.size_bytes,
      isFeatured: req.body.isFeatured === undefined ? existing.is_featured : (req.body.isFeatured === 'true' ? 1 : 0),
    };

    if (req.file) {
      const previousFilePath = path.resolve(process.cwd(), existing.file_path);
      if (fs.existsSync(previousFilePath)) {
        fs.unlinkSync(previousFilePath);
      }

      updates.fileName = req.file.originalname;
      updates.filePath = path.join('uploads', req.file.filename);
      updates.mimeType = req.file.mimetype;
      updates.sizeBytes = req.file.size;
    }

    await query(`
      UPDATE resources
      SET title = :title,
          category = :category,
          subject = :subject,
          resource_type = :resourceType,
          description = :description,
          file_name = :fileName,
          file_path = :filePath,
          mime_type = :mimeType,
          size_bytes = :sizeBytes,
          is_featured = :isFeatured
      WHERE id = :id
    `, {
      id: req.params.resourceId,
      ...updates,
    });

    const [resource] = await query('SELECT * FROM resources WHERE id = :id LIMIT 1', { id: req.params.resourceId });
    res.json({
      message: 'Resource updated successfully.',
      resource: normalizeResource(resource),
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:resourceId', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    await query('UPDATE resources SET active = 0 WHERE id = :id', { id: req.params.resourceId });
    res.json({ message: 'Resource deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

export default router;
