import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import AppHeader from '../shared/components/App/AppHeader';
import AppSidebar from '../shared/components/App/AppSidebar';
import { ThemeProvider } from '../app/providers/ThemeProvider';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <AppSidebar />
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
  notFoundComponent: () => <div>404 Not Found</div>,
});
