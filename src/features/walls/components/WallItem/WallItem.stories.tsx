import type { Meta, StoryObj } from '@storybook/react-vite';
import WallItem from './WallItem';
import type { Wall } from '../../types/Wall.types';

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
