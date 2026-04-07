import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio || '',
    avatarUrl: user.avatar_url || '',
    active: Boolean(user.active),
    createdAt: user.created_at,
  };
}

export function normalizeResource(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    subject: row.subject,
    type: row.resource_type,
    description: row.description,
    fileName: row.file_name,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    fileUrl: `/uploads/${row.file_path.split(/[\\/]/).pop()}`,
    uploadedBy: row.uploaded_by,
    isFeatured: Boolean(row.is_featured),
    viewCount: row.view_count,
    downloadCount: row.download_count,
    averageRating: Number(row.average_rating || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
