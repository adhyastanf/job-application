import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle('postgresql://adhyasta:adhyastanf@localhost:5432/job_application');

// export const db = drizzle('mysql://haimotio_hai-motion:SW%40_%24c%29w_Wp%28@localhost:3306/haimotio_hai-motion');
