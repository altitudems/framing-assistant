import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import HomeIcon from '../../../assets/icons/HomeIcon';

const meta = {
  component: Button,
  title: 'Base/Button',
  argTypes: {
    colorVariant: {
      control: 'select',
      options: ['primary', 'neutral', 'destructive'],
    },
    styleType: {
      control: 'select',
      options: ['filled', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large'],
    },
    iconOnly: { control: 'boolean' },
    circular: { control: 'boolean' },
    disabled: { control: 'boolean' },
    active: { control: 'boolean' },
  },
  args: {
    colorVariant: 'primary',
    styleType: 'filled',
    size: 'medium',
    iconOnly: false,
    circular: false,
    disabled: false,
    active: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const colorVariants = ['primary', 'neutral', 'destructive'] as const;
const styleTypes = ['filled', 'ghost', 'outline'] as const;
const sizes = ['xs', 'small', 'medium', 'large'] as const;

export const AllButtons: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
      {/* Primary Variant - All Styles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
        <h3>Primary</h3>
        {styleTypes.map((styleType) => (
          <Button key={styleType} {...args} colorVariant="primary" styleType={styleType}>
            {styleType.charAt(0).toUpperCase() + styleType.slice(1)}
          </Button>
        ))}
      </div>

      {/* Neutral Variant - All Styles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
        <h3>Neutral</h3>
        {styleTypes.map((styleType) => (
          <Button key={styleType} {...args} colorVariant="neutral" styleType={styleType}>
            {styleType.charAt(0).toUpperCase() + styleType.slice(1)}
          </Button>
        ))}
      </div>

      {/* Destructive Variant - All Styles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
        <h3>Destructive</h3>
        {styleTypes.map((styleType) => (
          <Button key={styleType} {...args} colorVariant="destructive" styleType={styleType}>
            {styleType.charAt(0).toUpperCase() + styleType.slice(1)}
          </Button>
        ))}
      </div>

      {/* Primary Filled - All Sizes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
        <h3>Primary (Sizes)</h3>
        {sizes.map((size) => (
          <Button key={size} {...args} colorVariant="primary" styleType="filled" size={size}>
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const DestructiveButtonStates: Story = {
  args: {
    children: 'Destructive',
    colorVariant: 'destructive',
    styleType: 'filled',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <Button {...args}>Default</Button>
      <Button {...args} data-hover>
        Hover (Data)
      </Button>
      <Button {...args} active>
        Active (Prop)
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} data-active>
        Active (Data)
      </Button>
    </div>
  ),
};

export const IconOnlyButtons: Story = {
  args: {
    children: <HomeIcon />,
    iconOnly: true,
    'aria-label': 'Home',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
      {colorVariants.map((colorVariant) => (
        <div
          key={colorVariant}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '80px' }}
        >
          <h3>{colorVariant.charAt(0).toUpperCase() + colorVariant.slice(1)}</h3>
          {styleTypes.map((styleType) => (
            <Button
              key={`${colorVariant}-${styleType}`}
              {...args}
              colorVariant={colorVariant}
              styleType={styleType}
            >
              {args.children}
            </Button>
          ))}
        </div>
      ))}

      {/* Sizes for Primary Filled Icon Only */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '80px' }}>
        <h3>Sizes</h3>
        {sizes.map((size) => (
          <Button key={size} {...args} colorVariant="primary" styleType="filled" size={size}>
            {args.children}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const CircularButtons: Story = {
  args: {
    children: <HomeIcon />,
    iconOnly: true,
    circular: true,
    'aria-label': 'Home',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
      {colorVariants.map((colorVariant) => (
        <div
          key={colorVariant}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '80px' }}
        >
          <h3>{colorVariant.charAt(0).toUpperCase() + colorVariant.slice(1)}</h3>
          {styleTypes.map((styleType) => (
            <Button
              key={`${colorVariant}-${styleType}`}
              {...args}
              colorVariant={colorVariant}
              styleType={styleType}
            >
              {args.children}
            </Button>
          ))}
        </div>
      ))}

      {/* Sizes for Primary Filled Circular */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '80px' }}>
        <h3>Sizes</h3>
        {sizes.map((size) => (
          <Button key={size} {...args} colorVariant="primary" styleType="filled" size={size}>
            {args.children}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const IconWithLabelButtons: Story = {
  args: {
    children: (
      <>
        <HomeIcon />
        <span>Home</span>
      </>
    ),
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
      {colorVariants.map((colorVariant) => (
        <div
          key={colorVariant}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}
        >
          <h3>{colorVariant.charAt(0).toUpperCase() + colorVariant.slice(1)}</h3>
          {styleTypes.map((styleType) => (
            <Button
              key={`${colorVariant}-${styleType}`}
              {...args}
              colorVariant={colorVariant}
              styleType={styleType}
            >
              {args.children}
            </Button>
          ))}
        </div>
      ))}

      {/* Sizes for Primary Filled Icon With Label */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
        <h3>Sizes</h3>
        {sizes.map((size) => (
          <Button key={size} {...args} colorVariant="primary" styleType="filled" size={size}>
            {args.children}
          </Button>
        ))}
      </div>
    </div>
  ),
};
