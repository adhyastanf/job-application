import { createAuthClient } from 'better-auth/client'; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  baseURL: 'https://job-application-steel.vercel.app',
  emailAndPassword: {
    enabled: true,
  },
});

export const { signIn, signOut, signUp, getSession, useSession } = authClient;
