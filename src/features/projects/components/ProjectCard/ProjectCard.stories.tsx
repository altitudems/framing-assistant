import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectCard from './ProjectCard';
import type { Project } from '../../../../app/store/projectStore';

const project: Project = {
  id: '1',
  name: 'Sample Project',
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
  ],
};

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  args: { project },
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
};
