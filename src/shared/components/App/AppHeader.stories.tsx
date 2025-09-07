import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import AppHeader from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'App/AppHeader',
  component: AppHeader,
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  args: {},
};

export const WithSidebarButton: Story = {
  args: {
    onOpenSidebar: () => {},
  },
};
