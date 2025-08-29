# 📏 Cursor Rules: Framing Assistant Project Guidelines

This document outlines key design and architectural principles to ensure consistency, maintainability, and scalability across the Framing Assistant codebase. Adhering to these rules will help maintain a cohesive and robust application.

---

## 🚀 Core Principles

1.  **Feature-First Architecture**: Organize code by business features (e.g., `walls`, `openings`, `takeoff`) rather than technical concerns. Each feature should be self-contained with its components, hooks, types, and utilities.
2.  **Clear Separation of Concerns**: Strictly separate Presentation logic from Business logic and Persistence.
3.  **Type Safety Everywhere**: Utilize TypeScript with `strict` mode enabled for end-to-end type safety, complemented by runtime validation.
4.  **Performance Minded**: Optimize calculations and rendering, particularly for visualizations and complex data processing.
5.  **Testability**: Design components, services, and hooks to be easily testable in isolation. Always validate work with comprehensive tests.

---

## 🛠️ Tooling & Environment

- **Package Manager**: **pnpm** is the mandated package manager for its speed, efficiency, and workspace support. Always use `pnpm install`, `pnpm add`, etc.
- **Build Tool**: **Vite** is used for lightning-fast development and optimized production builds.
- **Testing Framework**: **Vitest** is the official choice for unit and component testing.
- **Component Development**: **Storybook** is used for isolated UI development and documentation.

---

## 🏗️ Architectural Layers

The application follows a layered architecture to clearly define responsibilities:

### 1. Presentation Layer (React Components)

- **Purpose**: Primarily responsible for rendering the UI and handling basic user interactions.
- **Characteristics**:
  - "Dumb" components: receive props only, no internal state (unless purely UI-related), no business logic.
  - Highly reusable and predictable.
- **Location**: Typically within `src/features/*/components/` or `src/shared/components/`.

### 2. Workflow Hooks Layer (`use*` hooks)

- **Purpose**: Bridge UI components with Domain Services. Manage UI-specific state, loading, error handling, and user feedback.
- **Characteristics**:
  - Orchestrate calls to Domain Services.
  - Delegate complex business operations; do not contain significant business logic themselves.
- **Location**: `src/features/*/hooks/` for feature-specific workflows, `src/shared/hooks/` for generic utility hooks.

### 3. Domain Services Layer (`*Service.ts`)

- **Purpose**: Encapsulate complex business operations, data orchestration, and application workflows.
- **Responsibility**:
  - Coordinate between Calculation Engines, Validation Services, and Persistence Adapters.
  - Manage application-level business rules.
- **Characteristics**:
  - Stateless from a UI perspective.
  - Can be composed to create complex features (e.g., `ProjectService` orchestrates `WallService`).
- **Location**: `src/shared/utils/services/`.

### 4. Business Logic Core (Pure Functions)

#### a. Calculation Engines (`*Calculations.ts`)

- **Purpose**: Pure computational logic for specific domains.
- **Responsibility**: Perform mathematical operations and transformations; free of state or side effects.
- **Location**: `src/shared/utils/calculation-engines/` or feature-specific `src/features/*/utils/`.

#### b. Validation Services (Zod Schemas & Rules)

- **Purpose**: Enforce business rules, data integrity, and safety checks.
- **Responsibility**: Ensure all data and outputs meet industry standards and building codes using Zod schemas for runtime validation.
- **Location**: `src/shared/utils/validation/`.

### 5. Persistence Layer (Adapters)

- **Purpose**: Abstract data storage and retrieval mechanisms.
- **Responsibility**: Provide a consistent interface for `save`, `load`, `remove`, and `list` operations, independent of the underlying storage technology.
- **Characteristics**:
  - Pluggable: easily swappable (e.g., localStorage, server API, mock).
- **Location**: `src/shared/utils/persistence/`.

---

## 🗄️ State Management (Zustand)

- **Normalized State**: All entities (projects, walls, openings) are stored in a flat structure keyed by ID within the Zustand store (`projectStore.ts`), ensuring a single source of truth.
- **Selectors**: Derived state (e.g., a project with all its walls and openings) is computed using selectors, avoiding data duplication and ensuring data consistency.
- **Action Orchestration**: Zustand actions primarily interact with Domain Services to perform complex updates, rather than containing business logic directly.

---

## ✅ Data Validation (Zod)

- **Runtime Validation**: All critical data (form inputs, API responses, persistence data) must be validated using Zod schemas at runtime.
- **Schema Location**: Zod schemas are centrally defined in `src/shared/utils/validation/schemas/`.
- **Type Inference**: Leverage Zod's ability to infer TypeScript types from schemas for end-to-end type safety.

---

## 🎨 Styling (CSS Modules + BEM)

- **Scoped Styles**: Use CSS Modules (`.module.css`) for component-specific styles to prevent global style conflicts.
- **BEM Methodology**: Adopt Block\_\_Element--Modifier naming conventions for clarity and maintainability.
- **Design Tokens**: Utilize CSS Custom Properties (`--token-name`) defined in `src/shared/styles/variables.css` for all global design values (colors, spacing, typography).
- **Theme Switching**: Support dynamic theme switching (e.g., light/dark mode) by updating CSS Custom Properties, with themes defined in `src/shared/styles/variables.css` and managed via a global mechanism (e.g., a `ThemeProvider`).

---

## 🧪 Testing

- **Co-located Tests**: Tests (`.test.tsx`) reside in the same directory as the component, hook, or utility they test.
- **Storybook**: Use Storybook for isolated component development, documentation, and visual testing.
- **Mocking**: Utilize mocks (`tests/mocks/`) for external dependencies to ensure fast and reliable unit tests.

---

## 💡 Naming Conventions

- **Components**: PascalCase (e.g., `WallForm`, `MaterialSummary`).
- **Hooks**: `use` prefix for custom hooks (e.g., `useProjectEditor`, `useWallForm`).
- **Services**: PascalCase with `Service` suffix (e.g., `ProjectService`, `MaterialTakeoffService`).
- **Calculation Engines**: camelCase with `Calculations` suffix (e.g., `wallCalculations`, `geometryCalculations`).
- **Zod Schemas**: camelCase with `Schema` suffix (e.g., `projectSchema`, `wallSchema`).
- **Types/Interfaces**: PascalCase with `Type` or `Interface` suffix (e.g., `WallType`, `PersistenceAdapter`). (Note: `.types.ts` is fine for file naming, but within the file, it's `interface MyInterface {}` or `type MyType = {}`.)
