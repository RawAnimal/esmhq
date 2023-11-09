import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      title: string;
      phone: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    id: string;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    role: string | undefined | null;
    title: string | undefined | null;
    phone: string | undefined | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    role: string | undefined | null;
    title: string | undefined | null;
    phone: string | undefined | null;
  }
}
