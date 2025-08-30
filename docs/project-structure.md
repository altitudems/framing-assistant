### Project Structure

The application is organized by feature with shared resources for cross-cutting concerns. Chakra UI provides the base component library.

```
src/
├── app/                # Application-level setup (router, global state)
├── assets/             # Static assets (icons, images, fonts)
├── features/           # Feature modules (walls, openings, visualization, takeoff)
│   ├── components/     # Feature-specific UI and logic
│   ├── hooks/
│   ├── types/
│   └── utils/
├── routes/             # TanStack Router route files
├── shared/             # Shared resources
│   ├── components/     # App-specific components built on Chakra UI
│   ├── hooks/          # Reusable hooks
│   ├── types/          # Common type definitions
│   ├── utils/          # Shared utilities and services
│   └── constants/      # Application constants
├── tests/              # Test utilities and setup
├── main.tsx            # Application entry (ChakraProvider + router)
├── routeTree.gen.ts    # Generated route tree
└── vite-env.d.ts       # Vite TypeScript declarations
```
