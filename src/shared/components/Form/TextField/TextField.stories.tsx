import type { Meta, StoryObj } from '@storybook/react-vite';
import TextField from './TextField';

// Mock Icons for demonstration
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    styleType: { control: 'select', options: ['filled', 'outline'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    type: { control: 'text' },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    placeholder: 'Enter text',
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Default Text Field',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Your Label',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Custom placeholder text',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Text Field',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Text Field',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Text Field',
    size: 'large',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: 'Search Input',
    leadingIcon: <SearchIcon />,
    placeholder: 'Search...',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: 'Username Input',
    trailingIcon: <UserIcon />,
    placeholder: 'Your username',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Amount Input',
    leadingIcon: <span>$</span>,
    trailingIcon: <span>.00</span>,
    placeholder: '100',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only Input',
    readOnly: true,
    value: 'This is read-only',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    fullWidth: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};
