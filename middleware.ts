export { default } from 'next-auth/middleware';

export const config = { matcher: ['/on-demand', '/', '/users-list', '/profile',] };