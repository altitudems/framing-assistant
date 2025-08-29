import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';

// Import global styles
import './shared/styles/variables.css';
import './shared/styles/reset.css';
import './shared/styles/globals.css';
import './shared/styles/typography.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
