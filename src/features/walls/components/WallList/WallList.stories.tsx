import type { Meta, StoryObj } from '@storybook/react-vite';
import WallList from './WallList';
import type { Wall } from '../../types/Wall.types';

const meta: Meta<typeof WallList> = {
  title: 'Walls/WallList',
  component: WallList,
};

export default meta;

type Story = StoryObj<typeof WallList>;

const walls: Wall[] = [
  {
    id: 'wall-1',
    projectId: 'proj-1',
    name: 'Wall A',
    length: 10,
    height: 8,
    studSpacing: '16',
    topPlate: 'double',
    bottomPlate: 'standard',
  },
  {
    id: 'wall-2',
    projectId: 'proj-1',
    name: 'Wall B',
    length: 12,
    height: 9,
    studSpacing: '24',
    topPlate: 'single',
    bottomPlate: 'floating',
    floorGap: 1,
  },
];

export const Default: Story = {
  args: {
    walls,
  },
};

export const WithRemove: Story = {
  args: {
    walls,
    onRemove: () => {},
  },
};
