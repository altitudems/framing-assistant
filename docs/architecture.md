## 🛠️ Development

### Tech Stack

- **Package Manager**: pnpm for fast, efficient dependency management
- **Build Tool**: Vite for lightning-fast development and optimized builds
- **Framework**: React 18+ with TypeScript for type-safe, maintainable code
- **Styling**: Modern CSS Modules with BEM methodology for scalable, maintainable styles
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
- **`.module.css`** - Component-specific styles using CSS Modules
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
- `Button` - Generic button component with various styles.
- `Card` - Layout wrapper with no internal logic.

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

**3. Workflow Hooks (Refocused)**

- **Purpose**: Bridge the gap between UI components and domain services.
- **Responsibility**: Manage UI-specific state, handle loading states, error display, and user feedback, while delegating complex operations to domain services.
- **Examples**: `useProjectEditor` for coordinating project updates, `useWallForm` for managing wall input and validation via services.

**Example hook structure:**

```typescript
// hooks/useWallCalculations.ts (now a calculation engine)
export const calculateWallMaterials = (wall: Wall, options: CalculationOptions) => {
  // Pure stud calculations, plate lengths, etc.
  return { studCount, plateLength, totalCost };
};

// services/ProjectService.ts
export const projectService = {
  saveProject: async (project: Project) => {
    // Orchestrates saving project, walls, openings via persistence adapter
    await persistenceAdapter.save(`project-${project.id}`, project);
  },
  loadProject: async (id: string) => {
    // Orchestrates loading project data
    return persistenceAdapter.load(`project-${id}`);
  },
};

// hooks/useProjectEditor.ts
export const useProjectEditor = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const loadedProject = await projectService.loadProject(projectId);
        setProject(loadedProject);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSave = async () => {
    if (project) {
      setIsLoading(true);
      try {
        await projectService.saveProject(project);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { project, isLoading, error, setProject, handleSave };
};
```

**When to Use Each Pattern**

- **Presentation Components**: For rendering UI and handling basic user interaction.
- **Domain Services**: For managing business logic, data flow, and complex workflows.
- **Calculation Engines**: For pure, stateless computations.
- **Validation Services**: For enforcing business rules and data integrity.
- **Workflow Hooks**: For integrating UI with services and managing UI-specific state.

### Technology Stack: State Management & Routing

#### **State Management: Zustand**

We chose **Zustand** for its simplicity and performance, now augmented with a normalized state structure:

- **Normalized State**: All entities (projects, walls, openings) are stored in a flat structure keyed by ID, ensuring a single source of truth.
- **Selectors**: Derived state (e.g., a project with all its walls and openings) is computed using selectors, avoiding data duplication.
- **Action Orchestration**: Zustand actions now primarily interact with domain services and update the normalized state, rather than containing complex business logic directly.

**Store Structure (Conceptual):**

```typescript
// app/store/projectStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { projectService } from '../../services/ProjectService'; // Example service

interface EntitiesState {
  projects: Record<string, Project>;
  walls: Record<string, Wall>;
  openings: Record<string, Opening>;
}

interface ProjectState extends EntitiesState {
  activeProjectId: string | null;
  // ... other global UI state not specific to a project entity
}

interface ProjectActions {
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  setActiveProject: (id: string | null) => void;
  loadActiveProject: (id: string) => Promise<void>;
  // ... actions for walls, openings, etc. that interact with services
}

const useProjectStore = create<ProjectState & ProjectActions>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          projects: {},
          walls: {},
          openings: {},
          activeProjectId: null,

          addProject: async (project) => {
            await projectService.saveProject(project);
            set((state) => {
              state.projects[project.id] = project;
            });
          },
          updateProject: async (id, updates) => {
            const currentProject = get().projects[id];
            if (currentProject) {
              const updatedProject = { ...currentProject, ...updates };
              await projectService.saveProject(updatedProject);
              set((state) => {
                state.projects[id] = updatedProject;
              });
            }
          },
          removeProject: async (id) => {
            await projectService.removeProject(id);
            set((state) => {
              delete state.projects[id];
              // Also remove associated walls/openings
              state.walls = Object.fromEntries(
                Object.entries(state.walls).filter(([, wall]) => wall.projectId !== id),
              );
              state.openings = Object.fromEntries(
                Object.entries(state.openings).filter(([, opening]) => opening.projectId !== id),
              );
              if (state.activeProjectId === id) {
                state.activeProjectId = null;
              }
            });
          },
          setActiveProject: (id) => set({ activeProjectId: id }),
          loadActiveProject: async (id) => {
            const project = await projectService.loadProject(id);
            if (project) {
              set((state) => {
                state.projects[project.id] = project;
                project.walls.forEach((wall: Wall) => {
                  state.walls[wall.id] = wall;
                });
                // Assuming openings are nested within walls or handled separately
                project.walls.forEach((wall: Wall) => {
                  wall.openings.forEach((opening: Opening) => {
                    state.openings[opening.id] = opening;
                  });
                });
                state.activeProjectId = project.id;
              });
            }
          },
        }),
        {
          name: 'framing-assistant-store',
          storage: {
            getItem: (name) => {
              /* use persistenceAdapter.load */ return Promise.resolve(null);
            }, // Placeholder for actual persistence adapter integration
            setItem: (name, value) => {
              /* use persistenceAdapter.save */ return Promise.resolve();
            }, // Placeholder
            removeItem: (name) => {
              /* use persistenceAdapter.remove */ return Promise.resolve();
            }, // Placeholder
          },
          // Customize serialize/deserialize to work with normalized state
          // migrate: (persistedState, version) => { /* handle migrations */ return persistedState; }
        },
      ),
    ),
    { name: 'ProjectStore' },
  ),
);
```

#### **Routing: React Router v6**

We use **React Router** for client-side navigation:

- **Declarative Routing** - Routes defined as components
- **Nested Routes** - Support for complex layouts
- **Type Safety** - Full TypeScript support
- **Code Splitting** - Lazy loading for better performance
- **Search Params** - URL state management for projects
- **Protected Routes** - Route guards for project access

**Route Structure:**

```typescript
// routes.tsx
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'project/:id', element: <ProjectEditor /> },
      { path: 'project/:id/walls', element: <WallManager /> },
      { path: 'project/:id/openings', element: <OpeningManager /> },
      { path: 'project/:id/takeoff', element: <MaterialTakeoff /> },
      { path: 'project/:id/visualization', element: <WallVisualization /> }
    ]
  }
];
```

#### **Why These Choices?**

**Zustand over Redux:**

- **Simpler** - Less boilerplate, easier to learn
- **Lighter** - Smaller bundle size for our needs
- **Faster** - Better performance for our use case
- **Modern** - Built for modern React patterns

**React Router over alternatives:**

- **Mature** - Battle-tested in production
- **Standard** - Most React developers know it
- **Flexible** - Handles our routing needs perfectly
- **Performance** - Excellent code splitting support

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
2. **Add Styles** - Create `.module.css` with BEM methodology
3. **Write Stories** - Document component variants and states
4. **Add Tests** - Ensure component reliability and functionality
5. **Iterate** - Use Storybook for visual development, tests for logic validation

### Key Features

- **Persistence Layer**: Projects automatically save via configurable persistence adapters
- **CSV Export**: Generate material lists for suppliers and project managers
- **SVG Visualizations**: High-quality, scalable wall diagrams
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Type Safety**: Full TypeScript coverage prevents calculation errors
- **Modern CSS**: CSS Modules with BEM for maintainable, scoped styles
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

- **Definition**: Design tokens are defined as CSS Custom Properties, primarily in `src/shared/styles/variables.css`.
- **Theme Switching**: A global mechanism (e.g., a `ThemeProvider` or a class on the `body` element) will dynamically update the CSS Custom Properties based on the active theme.
- **Usage**: Components consume these design tokens directly via `var(--token-name)` in their CSS Modules.

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

### Persistence Architecture

The app uses a **persistence adapter pattern** that abstracts storage operations:

#### **Adapter Interface**

```typescript
// shared/types/persistence.types.ts
interface PersistenceAdapter {
  save: (key: string, data: any) => Promise<void>;
  load: (key: string) => Promise<any>;
  remove: (key: string) => Promise<void>;
  list: () => Promise<string[]>;
}
```

#### **Current Implementation: LocalStorage**

```typescript
// shared/utils/localStorage.adapter.ts
export const localStorageAdapter: PersistenceAdapter = {
  save: async (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load: async (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove: async (key) => {
    localStorage.removeItem(key);
  },
  list: async () => {
    return Object.keys(localStorage).filter((key) => key.startsWith('framing-project-'));
  },
};
```

#### **Future Implementation: Server API**

```typescript
// shared/utils/api.adapter.ts
export const apiAdapter: PersistenceAdapter = {
  save: async (key, data) => {
    await fetch(`/api/projects/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  load: async (key) => {
    const response = await fetch(`/api/projects/${key}`);
    return response.ok ? response.json() : null;
  },
  remove: async (key) => {
    await fetch(`/api/projects/${key}`, { method: 'DELETE' });
  },
  list: async () => {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    return projects.map((p) => p.id);
  },
};
```

#### **Zustand Store Integration**

```typescript
// app/store/projectStore.ts
import { persist } from 'zustand/middleware';
import { localStorageAdapter } from '../shared/utils/localStorage.adapter';

interface ProjectStore {
  project: Project;
  walls: Wall[];
  // ... other state

  // Actions use the adapter
  saveProject: () => Promise<void>;
  loadProject: (id: string) => Promise<void>;
}

const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      // ... state

      saveProject: async () => {
        const state = get();
        await persistenceAdapter.save(`project-${state.project.id}`, state.project);
      },

      loadProject: async (id: string) => {
        const project = await persistenceAdapter.load(`project-${id}`);
        if (project) {
          set({ project, walls: project.walls });
        }
      },
    }),
    {
      name: 'framing-assistant-store',
      storage: {
        getItem: (name) => localStorageAdapter.load(name),
        setItem: (name, value) => localStorageAdapter.save(name, value),
        removeItem: (name) => localStorageAdapter.remove(name),
      },
    },
  ),
);
```

#### **Benefits of This Pattern**

- **Flexibility** - Easy to switch from localStorage to server APIs
- **Testing** - Mock adapters for unit tests
- **Feature Flags** - Switch adapters based on environment or user preferences
- **Offline Support** - Fallback to localStorage when server is unavailable
- **Migration** - Smooth transition from local-only to cloud-based storage

### Development Guidelines

- **No External UI Libraries**: All components built from scratch
- **Feature-First Architecture**: Code organized by business features rather than technical concerns
- **Practical Component Design**: Components designed for actual use cases, not theoretical purity
- **Container/Display Pattern**: Separate business logic (containers) from presentation (display components)
- **Custom Hooks**: Extract reusable logic into custom hooks for better composition and testing
- **BEM Methodology**: Block\_\_Element--Modifier naming convention for CSS
- **CSS Modules**: Scoped styles to prevent conflicts
- **SVG First**: Vector graphics for crisp visualizations at any scale
- **TypeScript Strict**: Strict type checking enabled
- **Performance Focus**: Optimized calculations and rendering
- **Modular Structure**: Each feature is self-contained with its own components, hooks, types, and utilities
- **Reusable Components**: Shared components only when they provide real value across features
