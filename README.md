# Vantalog

## Frontend

1. Create `.env` from `.env.example`.
2. Run `npm install`.
3. Run `npm run dev`.

## Spring Boot Backend

1. Create `spring-backend/.env` from `spring-backend/.env.example`.
2. In MySQL, create the database and run [`schema.sql`](/D:/Vantalog/spring-backend/src/main/resources/schema.sql) manually.
3. Run `.\gradlew.bat bootRun` from [spring-backend](/D:/Vantalog/spring-backend).

## Default Admin

- Email: `Iceeu14@kl.in`
- Password: `Iceeu@14`

The Spring backend seeds this admin automatically only when `APP_SEED_DEFAULT_ADMIN=true` and no admin exists yet.

## Deployment Notes

1. Set backend secrets through environment variables or `spring-backend/.env`.
2. Set `APP_UPLOAD_DIR` to a real writable server folder.
3. Keep `SPRING_SQL_INIT_MODE=never` in production and run schema changes manually.
4. Set `VITE_API_BASE_URL` to your deployed backend URL before building the frontend.
