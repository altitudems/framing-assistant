import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChakraProvider } from '@chakra-ui/react';
import { createRouter, RouterProvider, createRootRoute, createRoute } from '@tanstack/react-router';
import AppSidebar from './AppSidebar';

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

const meta: Meta<typeof AppSidebar> = {
  title: 'App/AppSidebar',
  component: AppSidebar,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <RouterProvider router={router}>
          <Story />
        </RouterProvider>
      </ChakraProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    children: <div style={{ marginTop: 'auto' }}>Footer content</div>,
  },
};
