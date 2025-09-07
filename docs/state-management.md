# State Management Guide

This document outlines the modern state management patterns used in the framing assistant application.

## Overview

We use a **layered state management architecture** that follows React best practices and modern patterns:

1. **TanStack Query** - Server-derived shared state
2. **Zustand** - Client-side app-wide state
3. **React useState/useReducer** - Transient local state
4. **TanStack Router** - Route/URL-related state

## State Management Hierarchy

### 1. TanStack Query (Server State)

**Use for:** Data that comes from or syncs with a server/API

- Projects, walls, pricing configuration
- Automatic caching and background updates
- Optimistic updates with rollback
- Built-in loading and error states

```typescript
// Query hooks for reading data
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation hooks for writing data
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => apiClient.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
```

### 2. Zustand (Client State)

**Use for:** App-wide UI state that needs to persist or be shared

- Theme preferences, sidebar state
- Undo/redo system
- User preferences

```typescript
// shared/store/appStore.ts
interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

interface AppActions {
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        theme: 'light',

        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        setTheme: (theme) => set({ theme }),
      }),
      { name: 'app-store' },
    ),
    { name: 'AppStore' },
  ),
);
```

### 3. React useState/useReducer (Local State)

**Use for:** Component-specific, transient state

- Form inputs, temporary UI state
- Modal open/closed states
- Component-specific calculations

```typescript
// Local form state
const [formState, setFormState] = useState<WallFormState>(initialState);
const [errors, setErrors] = useState<Record<string, string>>({});

// Complex local state with useReducer
const [state, dispatch] = useReducer(wallFormReducer, initialState);
```

### 4. TanStack Router (URL State)

**Use for:** State that should be reflected in the URL

- Current project ID
- Active tab/page
- Search parameters

```typescript
// Route parameters
const { projectId } = Route.useParams();

// Search parameters
const [searchParams, setSearchParams] = useSearch();
```

## Decision Tree

When deciding where to put state, ask these questions:

1. **Does this data come from or sync with a server?**
   - Yes → Use **TanStack Query**

2. **Is this state shared across multiple components and needs to persist?**
   - Yes → Use **Zustand**

3. **Is this state specific to one component and temporary?**
   - Yes → Use **React useState/useReducer**

4. **Should this state be reflected in the URL?**
   - Yes → Use **TanStack Router**

## Custom Hooks Pattern

Custom hooks encapsulate feature logic and provide clean interfaces:

```typescript
// features/projects/hooks/useProjectManager.ts
export const useProjectManager = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  // TanStack Query for data fetching
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
  });

  // TanStack Query mutations for data updates
  const createProject = useMutation({
    mutationFn: (data: CreateProjectRequest) => apiClient.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Return clean interface for components
  return {
    projects: projects || [],
    isLoading,
    error,
    createProject: createProject.mutate,
    isCreating: createProject.isPending,
  };
};
```

## API Layer

The API layer provides a unified interface with multiple implementations:

### API Client Interface

```typescript
export interface ApiClient {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project>;
  createProject(data: CreateProjectRequest): Promise<Project>;
  updateProject(id: string, data: UpdateProjectRequest): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // Walls
  getWalls(projectId: string): Promise<Wall[]>;
  getWall(id: string): Promise<Wall>;
  createWall(data: CreateWallRequest): Promise<Wall>;
  updateWall(id: string, data: UpdateWallRequest): Promise<Wall>;
  deleteWall(id: string): Promise<void>;

  // Pricing
  getPricingConfig(): Promise<PricingConfig>;
  updatePricingConfig(data: UpdatePricingRequest): Promise<PricingConfig>;
}
```

### Multiple Adapter Implementations

1. **Mock Adapter** - For development and testing
2. **Offline Adapter** - For localStorage-based persistence
3. **Live Adapter** - For real backend API calls

## Domain Services

Domain services encapsulate business logic and coordinate between different layers:

```typescript
// shared/services/ProjectService.ts
export class ProjectService {
  constructor(private apiClient: ApiClient) {}

  async createProjectWithWalls(data: CreateProjectRequest, walls: CreateWallRequest[]) {
    // Create project
    const project = await this.apiClient.createProject(data);

    // Create walls
    const createdWalls = await Promise.all(
      walls.map((wall) => this.apiClient.createWall({ ...wall, projectId: project.id })),
    );

    return { project, walls: createdWalls };
  }

  async calculateProjectCost(projectId: string) {
    const walls = await this.apiClient.getWalls(projectId);
    const pricing = await this.apiClient.getPricingConfig();

    return walls.reduce((total, wall) => {
      return total + this.calculateWallCost(wall, pricing);
    }, 0);
  }
}
```

## Best Practices

### 1. Keep State Close to Where It's Used

- Local state in components that need it
- Shared state in appropriate stores
- Server state in TanStack Query

### 2. Use Custom Hooks for Complex Logic

- Encapsulate feature logic
- Provide clean interfaces to components
- Coordinate between different state layers

### 3. Prefer Composition Over Inheritance

- Combine multiple hooks as needed
- Keep hooks focused and single-purpose
- Use domain services for complex business logic

### 4. Handle Loading and Error States

- TanStack Query provides built-in loading/error states
- Custom hooks should expose these states
- Components should handle loading/error UI appropriately

### 5. Use TypeScript for Type Safety

- Define clear interfaces for all state
- Use generic types for reusable patterns
- Leverage TypeScript's type inference

## Migration from Old Patterns

If you're migrating from older state management patterns:

1. **Replace Zustand stores** that manage server data with TanStack Query
2. **Keep Zustand** for client-side UI state only
3. **Extract business logic** into domain services
4. **Create custom hooks** to coordinate between layers
5. **Use the API layer** for all data operations

## Examples

### Simple Component with Local State

```typescript
function WallForm({ projectId }: { projectId: string }) {
  const [name, setName] = useState('');
  const [length, setLength] = useState(0);
  const { createWall, isCreating } = useWallManager();

  const handleSubmit = () => {
    createWall({ projectId, name, length });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={length} onChange={(e) => setLength(Number(e.target.value))} />
      <button disabled={isCreating}>Create Wall</button>
    </form>
  );
}
```

### Component with Shared State

```typescript
function AppSidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        Toggle Sidebar
      </button>
    </aside>
  );
}
```

### Component with Server State

```typescript
function ProjectsList() {
  const { projects, isLoading, error } = useProjectManager();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

This architecture provides a clean separation of concerns, excellent developer experience, and optimal performance for the framing assistant application.
