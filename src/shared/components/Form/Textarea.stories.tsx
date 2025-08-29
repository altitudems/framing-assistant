import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Textarea from './Textarea';

const meta = {
  component: Textarea,
  title: 'Base/Textarea',
  args: {
    label: 'Description',
    placeholder: 'Enter description',
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
