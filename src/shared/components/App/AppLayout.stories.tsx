import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@chakra-ui/react';
import AppLayout from './AppLayout';

const meta: Meta<typeof AppLayout> = {
  title: 'App/AppLayout',
  component: AppLayout,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof AppLayout>;

export const Default: Story = {
  render: () => (
    <AppLayout>
      <Box p={4}>
        <h1>Dashboard</h1>
        <p>Content area goes here.</p>
      </Box>
    </AppLayout>
  ),
};
