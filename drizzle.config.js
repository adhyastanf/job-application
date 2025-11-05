import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // ← wajib 'postgresql', bukan 'pg'
  schema: 'src/lib/db/auth-schema.js',
  out: 'src/lib/db/migrations-folder',
  dbCredentials: {
    url: 'postgresql://postgres.omedfxyhttizigezlmlb:adhyasta123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres',
  },
});
