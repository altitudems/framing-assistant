import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './ThemeProvider';

const meta = {
  title: 'App/Providers/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '20px',
          color: 'var(--color-text)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <h1>Themed Content</h1>
        <p>This content will adapt to the current theme.</p>
      </div>
    ),
  },
};
