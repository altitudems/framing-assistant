import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // This file will be generated

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}

export default router;
