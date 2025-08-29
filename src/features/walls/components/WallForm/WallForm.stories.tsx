import type { Meta, StoryObj } from '@storybook/react-vite';
import WallForm from './WallForm';

const meta: Meta<typeof WallForm> = {
  title: 'Walls/WallForm',
  component: WallForm,
};

export default meta;

type Story = StoryObj<typeof WallForm>;

export const Default: Story = {
  args: {
    onSubmit: (values) => console.log(values),
    initialValues: {
      name: 'Wall A',
      length: 10,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    },
  },
};
