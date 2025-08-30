import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect } from 'vitest';
import { createRouter, RouterProvider, createRootRoute, createRoute } from '@tanstack/react-router';
import AppLayout from './AppLayout';

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => null });
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

  return render(
    <ChakraProvider>
      <RouterProvider router={router} />
      {ui}
    </ChakraProvider>,
  );
}

describe('AppLayout', () => {
  it('renders children content area', () => {
    renderWithRouter(
      <AppLayout>
        <div>Content here</div>
      </AppLayout>,
    );
    expect(screen.getByText(/content here/i)).toBeInTheDocument();
  });
});
