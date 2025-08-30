import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = process.cwd();

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mdx-js/react',
      'markdown-to-jsx',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
  test: {
    // Common settings for all projects
    globals: true,
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    projects: [
      {
        // Unit tests project
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: [
            './src/tests/setup.ts', // For general test setup
            '@testing-library/jest-dom/vitest', // For jest-dom matchers
          ],
          include: ['src/**/*.test.tsx'], // Only include regular test files
          isolate: false, // Try with isolate: false for CSS Modules
        },
      },
      {
        // Storybook tests project
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          setupFiles: [
            '.storybook/vitest.setup.ts',
            '@testing-library/jest-dom/vitest', // For jest-dom matchers in Storybook tests
          ],
        },
      },
    ],
  },
});
