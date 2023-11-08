//export { default } from 'next-auth/middleware';

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/auth/signin',
  },
});
