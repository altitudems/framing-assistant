## 🛠️ Development

### Tech Stack

- **Package Manager**: pnpm for fast, efficient dependency management
- **Build Tool**: Vite for lightning-fast development and optimized builds
- **Framework**: React 18+ with TypeScript for type-safe, maintainable code
- **Styling**: [Chakra UI](https://chakra-ui.com) with theme-based style props; CSS Modules for custom cases
- **Visualizations**: Custom SVG components for wall diagrams and technical drawings
- **Persistence**: Pluggable persistence adapters (default: localStorage, easily swappable for server APIs)
- **Export**: CSV format for material takeoffs and project documentation
- **Testing**: Vitest for fast unit and component testing
- **Component Development**: Storybook for isolated component development and documentation

### Architecture Overview

- **Static Application**: No server required - runs entirely in the browser
- **Component-Based**: Modular React components for each framing element
- **Type Safety**: Full TypeScript coverage for calculations and data structures
- **Responsive Design**: Mobile-first approach for field use on tablets and phones
- **Offline Capable**: Works without internet connection once loaded

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm type-check

# Linting
pnpm lint

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

### File Organization & Co-location

Each component follows a **co-location pattern** where all related files live together in the same folder:

- **`.tsx`** - React component implementation
- **`.module.css`** - Optional component-specific styles when Chakra props aren't enough
- **`.stories.tsx`** - Storybook stories for component development and documentation
- **`.test.tsx`** - Vitest unit tests for component functionality

This approach provides several benefits:

- **Easier Navigation** - All component files are in one place
- **Better Maintainability** - Related code stays together
- **Clearer Dependencies** - Easy to see what files belong to each component
- **Simplified Imports** - Clean import paths within components

### Component Architecture: Presentation vs. Services

The application adopts a clear separation of concerns, dividing responsibilities into distinct layers to enhance maintainability, testability, and scalability.

#### **Presentation Components (Dumb)**

- **Purpose**: Primarily responsible for rendering UI based on props.
- **Characteristics**:
  - Receive props only; no internal state or business logic.
  - Pure functions: same props always produce the same output.
  - Highly reusable across different contexts.
  - Easy to test due to their predictable nature.

**Examples in our app:**

- `WallItem` - Displays wall information, no business logic.
- `AppHeader` - Top navigation built with Chakra primitives.
- `AppSidebar` - Feature navigation using Chakra components.

#### **Domain Services (Smart)**

- **Purpose**: Encapsulate complex business operations, data orchestration, and workflows.
- **Responsibility**: Coordinate between various calculation engines, validation services, and persistence adapters.
- **Characteristics**:
  - Stateless from a UI perspective; manage the flow of data and application logic.
  - Interact with persistence adapters for data storage and retrieval.
  - Can be composed to create complex features.

**Examples in our app:**

- `ProjectService` - Orchestrates project-level operations, interacting with `WallService`, `OpeningService`, etc., and the persistence layer.
- `MaterialTakeoffService` - Coordinates material calculations, waste allowance, and export.

#### **Business Logic Layers**

To achieve a clean architecture and clear responsibility boundaries, business logic is distributed across the following layers:

**1. Calculation Engines**

- **Purpose**: Pure computational logic for specific domains.
- **Responsibility**: Perform mathematical operations and transformations, free of state or side effects.
- **Examples**: Stud spacing algorithms, header sizing formulas, waste calculations.

**2. Validation Services**

- **Purpose**: Enforce business rules, data integrity, and safety checks.
- **Responsibility**: Ensure all data and outputs meet industry standards and building codes.
- **Examples**: Building code compliance checks, structural integrity validations.

**3. Custom Hooks (Modern Patterns)**

- **Purpose**: Encapsulate feature logic and provide clean interfaces to components.
- **Responsibility**: Coordinate between TanStack Query, domain services, and UI state.
- **Examples**: `useProjectManager` for project operations, `useWallManager` for wall management, `useWallForm` for form state.

**Example hook structure:**

```typescript
// features/projects/hooks/useProjectManager.ts
export const useProjectManager = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
  });

  const createProject = useMutation({
    mutationFn: (data: CreateProjectRequest) => apiClient.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      apiClient.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id: string) => apiClient.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projects || [],
    isLoading,
    error,
    createProject: createProject.mutate,
    updateProject: updateProject.mutate,
    deleteProject: deleteProject.mutate,
    isCreating: createProject.isPending,
    isUpdating: updateProject.isPending,
    isDeleting: deleteProject.isPending,
  };
};

// features/walls/hooks/useWallForm.ts
export const useWallForm = (projectId: string, wallId?: string) => {
  const [formState, setFormState] = useState<WallFormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: wall } = useWall(wallId);
  const updateWall = useUpdateWall();
  const createWall = useCreateWall();

  // Form validation and submission logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (formState.length <= 0) newErrors.length = 'Length must be positive';
    // ... more validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const wallData: CreateWallRequest = {
      projectId,
      ...formState,
    };

    if (wallId) {
      updateWall.mutate({ id: wallId, data: wallData });
    } else {
      createWall.mutate(wallData);
    }
  };

  return {
    formState,
    setFormState,
    errors,
    handleSubmit,
    isLoading: updateWall.isPending || createWall.isPending,
  };
};
```

**When to Use Each Pattern**

- **Presentation Components**: For rendering UI and handling basic user interaction.
- **Domain Services**: For managing business logic, data flow, and complex workflows.
- **Calculation Engines**: For pure, stateless computations.
- **Validation Services**: For enforcing business rules and data integrity.
- **Custom Hooks**: For encapsulating feature logic and coordinating between TanStack Query, services, and UI state.
- **TanStack Query**: For server state management, caching, and synchronization.
- **Zustand**: For client-side app-wide state that needs to persist or be shared across components.

### Technology Stack: State Management & Routing

#### **State Management: Modern React Patterns**

We've implemented a **layered state management architecture** that follows modern React best practices:

**State Management Hierarchy:**

1. **TanStack Query** - Server-derived shared state (projects, walls, pricing)
2. **Zustand** - Client-side app-wide state (UI preferences, undo/redo)
3. **React useState/useReducer** - Transient local state (form inputs, temporary UI state)
4. **TanStack Router** - Route/URL-related state

#### **TanStack Query for Server State**

- **Automatic Caching** - Intelligent caching with background updates
- **Optimistic Updates** - Immediate UI feedback with rollback on errors
- **Background Refetching** - Keep data fresh automatically
- **Error Handling** - Built-in retry logic and error boundaries
- **Loading States** - Automatic loading and error state management

**Query Hooks Structure:**

```typescript
// features/projects/hooks/useProjects.ts
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => apiClient.getProject(id),
    enabled: !!id,
  });
};

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

#### **Zustand for Client State**

- **App-wide UI State** - Theme preferences, sidebar state, etc.
- **Undo/Redo System** - Command pattern for reversible operations
- **Lightweight** - Minimal boilerplate, excellent performance

**Store Structure:**

```typescript
// shared/store/appStore.ts
interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  // ... other UI state
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

#### **Unified API Interface**

- **Multiple Modes** - Mock, offline (localStorage), and live (backend) adapters
- **Type Safety** - Full TypeScript coverage across all adapters
- **Consistent Interface** - Same API regardless of underlying storage
- **Easy Testing** - Mock adapter for unit tests

**API Client Structure:**

```typescript
// shared/api/client.interface.ts
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

#### **Routing: TanStack Router**

We use **TanStack Router** for type-safe, file-based routing:

- **File-based Routing** - Routes defined by file structure
- **Type Safety** - Full TypeScript support with automatic type inference
- **Code Splitting** - Automatic route-based code splitting
- **Search Params** - Type-safe search parameter handling
- **Loaders** - Data loading at the route level

**Route Structure:**

```typescript
// routes/projects.tsx
export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
});

// routes/projects_.$projectId.tsx
export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    // Data loading logic
  },
});
```

#### **Why These Choices?**

**TanStack Query over custom state management:**

- **Battle-tested** - Proven in production at scale
- **Automatic Optimizations** - Caching, deduplication, background updates
- **Developer Experience** - Excellent DevTools and debugging
- **Performance** - Intelligent re-rendering and data synchronization

**Zustand for client state:**

- **Lightweight** - Minimal bundle impact
- **Simple** - Easy to understand and maintain
- **Performant** - Excellent performance characteristics
- **Flexible** - Works well with other state management solutions

**TanStack Router over React Router:**

- **Type Safety** - Full TypeScript integration
- **File-based** - Intuitive route organization
- **Performance** - Built-in optimizations
- **Modern** - Designed for modern React patterns

### Testing & Development Workflow

#### **Vitest Testing**

- **Fast Unit Tests** - Component logic and utility functions
- **Component Testing** - Render and interaction testing
- **Coverage Reports** - Track test coverage across the codebase
- **Watch Mode** - Automatic test re-runs during development

#### **Storybook Development**

- **Isolated Development** - Build components in isolation
- **Interactive Documentation** - Live examples of component usage
- **Visual Testing** - Catch visual regressions and layout issues
- **Component Library** - Living documentation of the design system

#### **Development Process**

1. **Create Component** - Start with the `.tsx` file
2. **Add Styles** - Use Chakra style props or add a `.module.css` file if needed
3. **Write Stories** - Document component variants and states
4. **Add Tests** - Ensure component reliability and functionality
5. **Iterate** - Use Storybook for visual development, tests for logic validation

### Key Features

- **Persistence Layer**: Projects automatically save via configurable persistence adapters
- **CSV Export**: Generate material lists for suppliers and project managers
- **SVG Visualizations**: High-quality, scalable wall diagrams
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Type Safety**: Full TypeScript coverage prevents calculation errors
- **Chakra UI**: Themeable components with responsive style props
- **SVG First**: Vector graphics for crisp visualizations at any scale
- **TypeScript Strict**: Strict type checking enabled
- **Performance Focus**: Optimized calculations and rendering
- **Modular Structure**: Each feature is self-contained with its own components, hooks, types, and utilities
- **Reusable Components**: Shared components only when they provide real value across features
- **Data Validation**: Zod for robust runtime schema validation and parsing.
- **TypeScript Strict**: Strict type checking enabled.
- **Performance Focus**: Optimized calculations and rendering.
- **Modular Structure**: Each feature is self-contained with its own components, hooks, types, and utilities.
- **Reusable Components**: Shared components only when they provide real value across features.
- **Theming**: Out-of-the-box theme switching support using CSS custom properties (design tokens).
- **TypeScript Strict**: Strict type checking enabled.
- **Performance Focus**: Optimized calculations and rendering.
- **Modular Structure**: Each feature is self-contained with its own components, hooks, types, and utilities.
- **Reusable Components**: Shared components only when they provide real value across features.

### Styling & Theming: CSS Custom Properties and Design Tokens

We leverage **CSS Custom Properties (CSS Variables)** to define design tokens and facilitate flexible theming across the application.

#### **Benefits of this approach:**

- **Centralized Design Tokens**: Define global design values (colors, spacing, typography, etc.) once and reuse them across all components.
- **Dynamic Theming**: Easily switch between themes (e.g., light/dark mode) by updating a few CSS Custom Properties, typically on the `:root` element or a theme wrapper.
- **Runtime Flexibility**: Theme changes can be applied at runtime without JavaScript recompilation.
- **Cascading Nature**: Inherits naturally, making it easy to override tokens at different levels of the component tree.
- **Developer Experience**: Simpler to manage and consistent with native CSS.

#### **Implementation Details:**

- **Definition**: Design tokens live in the Chakra theme and can be extended as needed.
- **Theme Switching**: Chakra UI's color mode system manages light and dark values.
- **Usage**: Components access tokens through Chakra's style props or `useTheme` hook.

#### **Example (Conceptual):**

```css
/* src/shared/styles/variables.css */
:root {
  /* Light Theme Defaults */
  --color-primary: #007bff;
  --color-text: #333;
  --color-background: #f8f9fa;
}

[data-theme='dark'] {
  --color-primary: #66b3ff;
  --color-text: #f8f9fa;
  --color-background: #212529;
}

/* src/features/walls/components/WallForm/WallForm.module.css */
.wallForm {
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-primary);
}
```

### Data Validation: Zod Integration

We utilize **Zod** for schema declaration and validation, ensuring data integrity across the application.

#### **Benefits of Zod:**

- **Type Safety**: Automatically infers TypeScript types from schemas, maintaining end-to-end type safety.
- **Runtime Validation**: Ensures data conforms to expected schemas at runtime, crucial for API responses, form inputs, and persistence.
- **Coercion & Parsing**: Can automatically coerce types and parse complex data structures.
- **Developer Experience**: Simple, intuitive API for defining schemas.
- **Error Handling**: Provides detailed and user-friendly error messages.

#### **Integration Points:**

- **Form Validation**: Validate user inputs against Zod schemas before processing.
- **API Data Parsing**: Parse and validate data received from external sources (e.g., a future backend API).
- **Persistence Layer**: Ensure data saved to and loaded from persistence adapters (like localStorage) adheres to the application's data models.
- **State Management**: Validate data before it enters the Zustand store.

#### **Example Schema & Usage:**

```typescript
// shared/validation/schemas/project.schema.ts
import { z } from 'zod';

export const wallSchema = z.object({
  id: z.string().uuid(),
  length: z.number().min(0, { message: 'Length must be positive' }),
  height: z.number().min(0, { message: 'Height must be positive' }),
  studSpacing: z.enum(['16oc', '24oc']),
  // ... other wall properties
});

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: 'Project name is required' }),
  walls: z.array(wallSchema),
  // ... other project properties
});

// Example usage in a service or hook
import { projectSchema } from './schemas/project.schema';

const validateProject = (data: unknown) => {
  try {
    return projectSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid project data');
    }
    throw error;
  }
};
```

### API Architecture

The app uses a **unified API interface** that supports multiple storage modes:

#### **API Client Interface**

```typescript
// shared/api/client.interface.ts
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

#### **Multiple Adapter Implementations**

**1. Mock Adapter (Development/Demo)**

```typescript
// shared/api/adapters/mock.adapter.ts
export class MockApiClient implements ApiClient {
  private projects: Project[] = [];
  private walls: Wall[] = [];
  private pricingConfig: PricingConfig = defaultPricingConfig;

  async getProjects(): Promise<Project[]> {
    return [...this.projects];
  }

  async createProject(data: CreateProjectRequest): Promise<Project> {
    const project: Project = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.projects.push(project);
    return project;
  }

  // ... other methods
}
```

**2. Offline Adapter (LocalStorage)**

```typescript
// shared/api/adapters/offline.adapter.ts
export class OfflineApiClient implements ApiClient {
  private storage = new Map<string, any>();

  async getProjects(): Promise<Project[]> {
    const projects = this.storage.get('projects') || [];
    return projects;
  }

  async createProject(data: CreateProjectRequest): Promise<Project> {
    const project: Project = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    const projects = this.getProjects();
    projects.push(project);
    this.storage.set('projects', projects);

    return project;
  }

  // ... other methods with localStorage persistence
}
```

**3. Live Adapter (Backend API)**

```typescript
// shared/api/adapters/live.adapter.ts
export class LiveApiClient implements ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${this.baseUrl}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  }

  async createProject(data: CreateProjectRequest): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  }

  // ... other methods with HTTP requests
}
```

#### **API Client Factory**

```typescript
// shared/api/client.factory.ts
export function createApiClient(mode: 'mock' | 'offline' | 'live', config?: any): ApiClient {
  switch (mode) {
    case 'mock':
      return new MockApiClient();
    case 'offline':
      return new OfflineApiClient();
    case 'live':
      return new LiveApiClient(config.baseUrl);
    default:
      throw new Error(`Unknown API mode: ${mode}`);
  }
}
```

#### **Integration with TanStack Query**

```typescript
// features/projects/hooks/useProjects.ts
export const useProjects = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProject = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => apiClient.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
```

#### **Benefits of This Architecture**

- **Flexibility** - Easy to switch between storage modes
- **Testing** - Mock adapter for unit tests
- **Development** - Mock mode for rapid prototyping
- **Offline Support** - Offline mode for field use
- **Production Ready** - Live mode for backend integration
- **Type Safety** - Consistent interface across all adapters
- **Migration Path** - Smooth transition between modes

### Development Guidelines

- **Chakra UI**: Base component library and theming system
- **Feature-First Architecture**: Code organized by business features rather than technical concerns
- **Practical Component Design**: Components designed for actual use cases, not theoretical purity
- **Container/Display Pattern**: Separate business logic (containers) from presentation (display components)
- **Custom Hooks**: Extract reusable logic into custom hooks for better composition and testing
- **CSS Modules**: Scoped styles for cases not covered by Chakra props
- **SVG First**: Vector graphics for crisp visualizations at any scale
- **TypeScript Strict**: Strict type checking enabled
- **Performance Focus**: Optimized calculations and rendering
- **Modular Structure**: Each feature is self-contained with its own components, hooks, types, and utilities
- **Reusable Components**: Shared components only when they provide real value across features
