import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // ← wajib 'postgresql', bukan 'pg'
  schema: 'src/lib/db/auth-schema.js',
  out: 'src/lib/db/migrations-folder',
  dbCredentials: {
    url: 'postgresql://adhyasta:adhyastanf@localhost:5432/job_application',
  },
});
