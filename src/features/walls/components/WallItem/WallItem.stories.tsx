import type { Meta, StoryObj } from '@storybook/react-vite';
import WallItem from './WallItem';
import type { Wall } from '../../../../shared/api';

const meta: Meta<typeof WallItem> = {
  title: 'Walls/WallItem',
  component: WallItem,
};

export default meta;

type Story = StoryObj<typeof WallItem>;

const sampleWall: Wall = {
  id: 'wall-1',
  projectId: 'proj-1',
  name: 'Sample Wall',
  length: 12,
  height: 8,
  studSpacing: '16',
  topPlate: 'double',
  bottomPlate: 'standard',
  loadBearing: true,
  bottomPlateTreatment: 'none',
  leftCorner: 'california',
  rightCorner: 'california',
};

export const Default: Story = {
  args: {
    wall: sampleWall,
  },
};

export const WithRemove: Story = {
  args: {
    wall: sampleWall,
    onRemove: () => {},
  },
};
