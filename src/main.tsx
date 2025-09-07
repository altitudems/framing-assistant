import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './shared/components/ui/color-mode';
import { QueryProvider } from './shared/providers/QueryProvider';
import { ApiProvider } from './shared/providers/ApiProvider';

// Import global styles
// import './shared/styles/variables.css';
// import './shared/styles/reset.css';
// import './shared/styles/globals.css';
// import './shared/styles/typography.css';

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
      <QueryProvider>
        <ApiProvider>
          <ColorModeProvider>
            <ChakraProvider value={defaultSystem}>
              <RouterProvider router={router} />
            </ChakraProvider>
          </ColorModeProvider>
        </ApiProvider>
      </QueryProvider>
    </StrictMode>,
  );
}
