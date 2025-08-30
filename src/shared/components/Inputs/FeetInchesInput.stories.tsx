import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
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
    isRequired: true,
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
      <FormControl isInvalid>
        <FormLabel>Length</FormLabel>
        <FeetInchesInput {...args} />
        <FormErrorMessage>Please enter a valid length</FormErrorMessage>
      </FormControl>
    </Box>
  ),
};
