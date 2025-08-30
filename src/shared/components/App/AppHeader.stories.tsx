import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChakraProvider } from '@chakra-ui/react';
import AppHeader from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'App/AppHeader',
  component: AppHeader,
  decorators: [
    (Story) => (
      <ChakraProvider>
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
