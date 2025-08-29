import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta = {
  component: Checkbox,
  title: 'Base/Checkbox',
  args: {
    label: 'Accept terms',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};
