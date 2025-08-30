import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectList from './ProjectList';
import type { Project } from '../../../../app/store/projectStore';

const meta: Meta<typeof ProjectList> = {
  title: 'Projects/ProjectList',
  component: ProjectList,
};

export default meta;

type Story = StoryObj<typeof ProjectList>;

const sampleProjects: Project[] = [
  { id: '1', name: 'Project One', createdAt: new Date().toISOString() },
  { id: '2', name: 'Project Two', createdAt: new Date().toISOString() },
];

export const Default: Story = {
  args: { projects: sampleProjects },
};
