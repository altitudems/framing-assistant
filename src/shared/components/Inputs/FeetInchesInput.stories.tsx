import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Text } from '@chakra-ui/react';
import FeetInchesInput from './FeetInchesInput';

const meta: Meta<typeof FeetInchesInput> = {
  title: 'Inputs/FeetInchesInput',
  component: FeetInchesInput,
  decorators: [
    (Story) => (
      <Box p={6} maxW="800px">
        <Story />
      </Box>
    ),
  ],
  args: {
    id: 'demo-dimension',
    name: 'dimension',
    fieldLabel: 'Dimension',
  },
};

export default meta;

type Story = StoryObj<typeof FeetInchesInput>;

export const Empty: Story = {};

export const WithInitialValue: Story = {
  args: {
    defaultValueDecimalFeet: 8.5, // 8 ft 6 in
  },
};

export const ErrorState: Story = {
  render: (args) => (
    <Box>
      <Box mb={2}>
        <Text fontWeight="medium" mb={2}>
          Length
        </Text>
        <FeetInchesInput {...args} />
        <Text fontSize="sm" color="red.500">
          Please enter a valid length
        </Text>
      </Box>
    </Box>
  ),
};
