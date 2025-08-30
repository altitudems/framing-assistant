import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { webcrypto } from 'node:crypto';

Object.defineProperty(globalThis, 'crypto', { value: webcrypto });

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
