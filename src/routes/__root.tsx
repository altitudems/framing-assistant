import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import AppHeader from '../shared/components/App/AppHeader';
import AppSidebar from '../shared/components/App/AppSidebar';

export const Route = createRootRoute({
  component: () => (
    <>
      <AppSidebar />
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <div>404 Not Found</div>,
});
