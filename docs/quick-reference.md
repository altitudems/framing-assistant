# Quick Reference Guide

## State Management Quick Reference

### Where to Put State

| State Type      | Use                         | Tool            | Example                       |
| --------------- | --------------------------- | --------------- | ----------------------------- |
| Server data     | Projects, walls, pricing    | TanStack Query  | `useProjects()`, `useWalls()` |
| App-wide UI     | Theme, sidebar, preferences | Zustand         | `useAppStore()`               |
| Component local | Form inputs, modals         | React useState  | `useState()`                  |
| URL state       | Route params, search        | TanStack Router | `useParams()`, `useSearch()`  |

### Common Patterns

#### Fetching Data

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: () => apiClient.getProjects(),
});
```

#### Mutating Data

```typescript
const createProject = useMutation({
  mutationFn: (data) => apiClient.createProject(data),
  onSuccess: () => queryClient.invalidateQueries(['projects']),
});
```

#### Custom Hook

```typescript
export const useProjectManager = () => {
  const { data: projects } = useProjects();
  const createProject = useCreateProject();

  return { projects, createProject };
};
```

## File Organization

```
src/
├── shared/
│   ├── api/           # API interface and adapters
│   ├── store/         # Zustand stores
│   ├── services/      # Domain services
│   └── hooks/         # Shared hooks
├── features/
│   └── projects/
│       ├── hooks/     # Feature-specific hooks
│       ├── components/ # Feature components
│       └── utils/     # Feature utilities
└── routes/            # TanStack Router routes
```

## Common Imports

```typescript
// TanStack Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Zustand
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// TanStack Router
import { createFileRoute } from '@tanstack/react-router';

// API
import { useApiClient } from '../shared/hooks/useApiClient';
```

## API Modes

```typescript
// Mock mode (development)
const apiClient = createApiClient('mock');

// Offline mode (localStorage)
const apiClient = createApiClient('offline');

// Live mode (backend)
const apiClient = createApiClient('live', { baseUrl: 'https://api.example.com' });
```

## Error Handling

```typescript
// TanStack Query error handling
const { data, error, isError } = useQuery({
  queryKey: ['projects'],
  queryFn: () => apiClient.getProjects(),
});

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

## Loading States

```typescript
// TanStack Query loading states
const { data, isLoading, isFetching } = useQuery({
  queryKey: ['projects'],
  queryFn: () => apiClient.getProjects(),
});

if (isLoading) {
  return <div>Loading...</div>;
}
```

## Type Definitions

```typescript
// API types
export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateProjectRequest {
  name: string;
}

export interface UpdateProjectRequest {
  name?: string;
}
```

## Testing

```typescript
// Mock API client for tests
import { MockApiClient } from '../shared/api/adapters/mock.adapter';

const mockApiClient = new MockApiClient();
```

## Development Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Lint code
pnpm lint
```
