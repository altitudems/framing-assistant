import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { webcrypto } from 'node:crypto';

Object.defineProperty(globalThis, 'crypto', { value: webcrypto });

// Chakra UI Menu uses scrollTo on the menu list; jsdom doesn't implement it
// Provide a no-op polyfill to avoid crashes in tests
if (!HTMLElement.prototype.scrollTo) {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    value: () => {},
    writable: true,
  });
}

// Polyfill matchMedia for Chakra's media query hooks in jsdom
// Touch getter to initialize if present in some environments
void window.matchMedia;
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
