import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ApiProvider } from '../shared/providers/ApiProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ApiClient } from '../shared/api';
import { vi } from 'vitest';

// Minimal Chakra v3 system for tests
const system = createSystem(defaultConfig);

// Create a test query client
const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

// Mock API client for tests
const mockApiClient: ApiClient = {
  getProjects: vi.fn().mockResolvedValue({ data: [], success: true }),
  getProject: vi.fn().mockResolvedValue({ data: null, success: false, error: 'Not found' }),
  createProject: vi.fn().mockResolvedValue({ data: null, success: true }),
  updateProject: vi.fn().mockResolvedValue({ data: null, success: true }),
  deleteProject: vi.fn().mockResolvedValue({ data: undefined, success: true }),
  duplicateProject: vi.fn().mockResolvedValue({ data: null, success: true }),
  getWalls: vi.fn().mockResolvedValue({ data: [], success: true }),
  getWall: vi.fn().mockResolvedValue({ data: null, success: false, error: 'Not found' }),
  createWall: vi.fn().mockResolvedValue({ data: null, success: true }),
  updateWall: vi.fn().mockResolvedValue({ data: null, success: true }),
  deleteWall: vi.fn().mockResolvedValue({ data: undefined, success: true }),
  getPricingConfig: vi.fn().mockResolvedValue({ data: null, success: false, error: 'Not found' }),
  updatePricingConfig: vi.fn().mockResolvedValue({ data: null, success: true }),
};

export function renderWithProviders(ui: ReactElement, api?: ApiClient) {
  return render(
    <ChakraProvider value={system}>
      <QueryClientProvider client={testQueryClient}>
        <ApiProvider api={api || mockApiClient}>{ui}</ApiProvider>
      </QueryClientProvider>
    </ChakraProvider>,
  );
}

export function renderWithChakra(ui: ReactElement, api?: ApiClient) {
  return render(
    <ChakraProvider value={system}>
      <QueryClientProvider client={testQueryClient}>
        <ApiProvider api={api || mockApiClient}>{ui}</ApiProvider>
      </QueryClientProvider>
    </ChakraProvider>,
  );
}

export function renderWithRouter(ui: ReactElement, api?: ApiClient) {
  // For now, just use the regular render with providers since router setup is complex
  // The ProjectCard component uses useNavigate which requires router context
  // We'll mock the router hooks instead
  return render(
    <ChakraProvider value={system}>
      <QueryClientProvider client={testQueryClient}>
        <ApiProvider api={api || mockApiClient}>{ui}</ApiProvider>
      </QueryClientProvider>
    </ChakraProvider>,
  );
}
