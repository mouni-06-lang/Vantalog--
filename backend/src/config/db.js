import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { env } from './env.js';

export const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.database,
  user: env.db.user,
  password: env.db.password,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

export async function query(sql, params = {}) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function ensureDatabaseReady() {
  await query('SELECT 1');

  const usersTable = await query(`
    SELECT COUNT(*) AS total
    FROM information_schema.tables
    WHERE table_schema = :databaseName AND table_name = 'users'
  `, { databaseName: env.db.database });

  if (!usersTable[0]?.total) {
    throw new Error(`Database schema not found in ${env.db.database}. Run backend/schema.sql first.`);
  }

  const admins = await query("SELECT COUNT(*) AS total FROM users WHERE role = 'admin'");
  if (!admins[0]?.total) {
    const passwordHash = await bcrypt.hash(env.defaultAdmin.password, 10);
    await query(`
      INSERT INTO users (id, name, email, password_hash, role, active)
      VALUES (:id, :name, :email, :passwordHash, 'admin', 1)
    `, {
      id: uuid(),
      name: env.defaultAdmin.name,
      email: env.defaultAdmin.email,
      passwordHash,
    });
    console.log(`Seeded default admin: ${env.defaultAdmin.email}`);
  }
}
