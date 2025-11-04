// import { db } from '@/lib/db/drizzle';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/drizzle';
import { account, session, user, verification } from './db/auth-schema';
// import { db } from './src/lib/db/drizzle';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    schema: {
      user,
      session,
      verification,
      account,
    },
    provider: 'pg',
  }),
});
