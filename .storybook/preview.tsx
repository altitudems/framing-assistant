import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createRouter,
  RouterProvider,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';

import '../src/shared/styles/reset.css';
import '../src/shared/styles/globals.css';
import '../src/shared/styles/typography.css';
import '../src/shared/styles/variables.css';

export const decorators: Preview['decorators'] = [
  (Story) => {
    const rootRoute = createRootRoute({
      component: () => (
        <>
          <Story />
          <Outlet />
        </>
      ),
    });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => null,
    });
    const projectsRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/projects',
      component: () => null,
    });
    const settingsRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/settings',
      component: () => null,
    });
    const routeTree = rootRoute.addChildren([indexRoute, projectsRoute, settingsRoute]);
    const router = createRouter({ routeTree });

    return (
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    );
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
