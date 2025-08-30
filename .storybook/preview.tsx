import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import '../src/shared/styles/reset.css';
import '../src/shared/styles/globals.css';
import '../src/shared/styles/typography.css';
import '../src/shared/styles/variables.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
