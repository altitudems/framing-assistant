import type { Preview } from '@storybook/react-vite'

import '../src/shared/styles/reset.css';
import '../src/shared/styles/globals.css';
import '../src/shared/styles/typography.css';
import '../src/shared/styles/variables.css';
import React from 'react';
import { ThemeProvider } from '../src/app/providers/ThemeProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;