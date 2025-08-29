import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Switch from './Switch';

const meta = {
  component: Switch,
  title: 'Base/Switch',
  args: {
    label: 'Enable',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};
