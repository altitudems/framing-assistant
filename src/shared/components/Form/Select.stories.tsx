import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const meta = {
  component: Select,
  title: 'Base/Select',
  args: {
    label: 'Fruit',
    options,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
