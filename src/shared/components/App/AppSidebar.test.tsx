import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, RouterProvider, createRootRoute, createRoute } from '@tanstack/react-router';
import AppSidebar from './AppSidebar';

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

describe('AppSidebar', () => {
  it('navigates buttons render', () => {
    renderWithRouter(<AppSidebar />);
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('calls onNavigate when a link is clicked', () => {
    const onNavigate = vi.fn();
    renderWithRouter(<AppSidebar onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('button', { name: /home/i }));
    expect(onNavigate).toHaveBeenCalled();
  });
});
