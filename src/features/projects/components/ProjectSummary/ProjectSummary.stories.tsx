import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectSummary from './ProjectSummary';
import type { Project } from '../../../../app/store/projectStore';

const project: Project = {
  id: '1',
  name: 'Demo Project',
  createdAt: new Date().toISOString(),
  walls: [
    {
      id: 'w1',
      projectId: '1',
      name: 'Wall A',
      length: 10,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
    {
      id: 'w2',
      projectId: '1',
      name: 'Wall B',
      length: 8,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
  ],
};

const meta: Meta<typeof ProjectSummary> = {
  title: 'Projects/ProjectSummary',
  component: ProjectSummary,
  args: { project },
};

export default meta;

type Story = StoryObj<typeof ProjectSummary>;

export const Default: Story = {};
