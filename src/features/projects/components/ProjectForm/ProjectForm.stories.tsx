import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectForm from './ProjectForm';

const meta: Meta<typeof ProjectForm> = {
  title: 'Projects/ProjectForm',
  component: ProjectForm,
};

export default meta;

type Story = StoryObj<typeof ProjectForm>;

export const Default: Story = {
  args: { onSubmit: () => {} },
};
