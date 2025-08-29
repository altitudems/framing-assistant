import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Radio from './Radio';

const meta = {
  component: Radio,
  title: 'Base/Radio',
  args: {
    label: 'Option A',
    name: 'choices',
    value: 'a',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Group: Story = {
  render: (args) => {
    const [value, setValue] = useState('a');
    return (
      <div>
        <Radio {...args} checked={value === 'a'} onChange={(e) => setValue(e.target.value)} />
        <Radio
          {...args}
          label="Option B"
          value="b"
          checked={value === 'b'}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
