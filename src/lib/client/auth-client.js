import { createAuthClient } from 'better-auth/client'; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
  },
});

export const { signIn, signOut, signUp, getSession, useSession } = authClient;
