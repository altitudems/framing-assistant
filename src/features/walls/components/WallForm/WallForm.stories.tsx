import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@chakra-ui/react';
import WallForm from './WallForm';

const meta: Meta<typeof WallForm> = {
  title: 'Walls/WallForm',
  component: WallForm,
  decorators: [
    (Story) => (
      <Box p={6} maxW="900px" mx="auto">
        <Story />
      </Box>
    ),
  ],
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
      loadBearing: true,
      bottomPlateTreatment: 'none',
    },
  },
};
