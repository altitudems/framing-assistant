### Project Structure
```
src/
├── features/           # Feature-based modules
│   ├── walls/          # Wall management feature
│   │   ├── components/ # Wall-specific components
│   │   │   ├── WallForm/
│   │   │   │   ├── WallForm.tsx        # Presentation component
│   │   │   │   ├── WallForm.module.css # Component styles
│   │   │   │   ├── WallForm.stories.tsx # Storybook stories
│   │   │   │   └── WallForm.test.tsx   # Component tests
│   │   │   ├── WallList/
│   │   │   │   ├── WallList.tsx
│   │   │   │   ├── WallList.module.css
│   │   │   │   ├── WallList.stories.tsx
│   │   │   │   └── WallList.test.tsx
│   │   │   └── WallItem/
│   │   │       ├── WallItem.tsx        # Presentation component
│   │   │       ├── WallItem.module.css # Component styles
│   │   │       ├── WallItem.stories.tsx # Storybook stories
│   │   │       └── WallItem.test.tsx   # Component tests
│   │   ├── hooks/      # Wall-related workflow hooks
│   │   │   ├── useWallForm.ts        # Workflow hook for wall management
│   │   │   └── useWallEditor.ts      # Example for complex wall editing workflow
│   │   ├── types/      # Wall type definitions
│   │   │   ├── Wall.types.ts
│   │   │   ├── WallForm.types.ts
│   │   │   └── WallCalculations.types.ts
│   │   ├── utils/      # Wall calculations
│   │   │   ├── wallCalculations.ts
│   │   │   ├── wallValidation.ts
│   │   │   └── wallFormatters.ts
│   │   └── index.ts    # Feature exports
│   ├── openings/       # Door/window management
│   │   ├── components/ # Opening components
│   │   │   ├── OpeningForm/
│   │   │   │   ├── OpeningForm.tsx     # Presentation component
│   │   │   │   ├── OpeningForm.module.css # Component styles
│   │   │   │   ├── OpeningForm.stories.tsx # Storybook stories
│   │   │   │   └── OpeningForm.test.tsx   # Component tests
│   │   │   ├── OpeningList/
│   │   │   │   ├── OpeningList.tsx
│   │   │   │   ├── OpeningList.module.css
│   │   │   │   ├── OpeningList.stories.tsx
│   │   │   │   └── OpeningList.test.tsx
│   │   │   └── OpeningItem/
│   │   │       ├── OpeningItem.tsx     # Presentation component
│   │   │       ├── OpeningItem.module.css # Component styles
│   │   │       ├── OpeningItem.stories.tsx # Storybook stories
│   │   │       └── OpeningItem.test.tsx   # Component tests
│   │   ├── hooks/      # Opening-related workflow hooks
│   │   │   ├── useOpeningForm.ts     # Workflow hook for opening management
│   │   │   └── useOpeningEditor.ts   # Example for complex opening editing workflow
│   │   ├── types/      # Opening types
│   │   │   ├── Opening.types.ts
│   │   │   ├── Door.types.ts
│   │   │   ├── Window.types.ts
│   │   │   └── Header.types.ts
│   │   ├── utils/      # Opening calculations
│   │   │   ├── openingCalculations.ts
│   │   │   ├── headerSizing.ts
│   │   │   └── openingValidation.ts
│   │   └── index.ts    # Feature exports
│   ├── visualization/  # SVG drawing system
│   │   ├── components/ # Drawing components
│   │   │   ├── WallDrawing/
│   │   │   │   ├── WallDrawing.tsx     # Presentation component
│   │   │   │   ├── WallDrawing.module.css # Component styles
│   │   │   │   ├── WallDrawing.stories.tsx # Storybook stories
│   │   │   │   └── WallDrawing.test.tsx   # Component tests
│   │   │   ├── StudLayout/
│   │   │   │   ├── StudLayout.tsx      # Presentation component
│   │   │   │   ├── StudLayout.module.css # Component styles
│   │   │   │   ├── StudLayout.stories.tsx # Storybook stories
│   │   │   │   └── StudLayout.test.tsx   # Component tests
│   │   │   ├── OpeningDetail/
│   │   │   │   ├── OpeningDetail.tsx   # Presentation component
│   │   │   │   ├── OpeningDetail.module.css # Component styles
│   │   │   │   ├── OpeningDetail.stories.tsx # Storybook stories
│   │   │   │   └── OpeningDetail.test.tsx   # Component tests
│   │   │   └── Legend/
│   │   │       ├── Legend.tsx          # Presentation component
│   │   │       ├── Legend.module.css   # Component styles
│   │   │       ├── Legend.stories.tsx  # Storybook stories
│   │   │       └── Legend.test.tsx     # Component tests
│   │   ├── hooks/      # Drawing workflow hooks
│   │   │   ├── useDrawingScale.ts      # Workflow hook for drawing scale
│   │   │   └── useDrawingInteraction.ts # Workflow hook for drawing interactions
│   │   ├── types/      # Drawing types
│   │   │   ├── Drawing.types.ts
│   │   │   ├── SVG.types.ts
│   │   │   └── Scale.types.ts
│   │   ├── utils/      # Drawing utilities
│   │   │   ├── svgHelpers.ts
│   │   │   ├── drawingCalculations.ts
│   │   │   ├── scaleUtils.ts
│   │   │   └── exportUtils.ts
│   │   └── index.ts    # Feature exports
│   └── takeoff/        # Material calculations
│       ├── components/ # Takeoff components
│       │   ├── MaterialSummary/
│       │   │   ├── MaterialSummary.tsx # Presentation component
│       │   │   ├── MaterialSummary.module.css # Component styles
│       │   │   ├── MaterialSummary.stories.tsx # Storybook stories
│       │   │   └── MaterialSummary.test.tsx   # Component tests
│       │   ├── MaterialBreakdown/
│       │   │   ├── MaterialBreakdown.tsx # Presentation component
│       │   │   ├── MaterialBreakdown.module.css # Component styles
│       │   │   ├── MaterialBreakdown.stories.tsx # Storybook stories
│       │   │   └── MaterialBreakdown.test.tsx   # Component tests
│       │   └── ExportButton/
│       │       ├── ExportButton.tsx    # Presentation component
│       │       ├── ExportButton.module.css # Component styles
│       │       ├── ExportButton.stories.tsx # Storybook stories
│       │       └── ExportButton.test.tsx   # Component tests
│       ├── hooks/      # Takeoff workflow hooks
│       │   ├── useTakeoffExport.ts     # Workflow hook for takeoff export
│       │   └── useWasteAllowance.ts    # Workflow hook for waste allowance settings
│       ├── types/      # Takeoff types
│       │   ├── Material.types.ts
│       │   ├── Takeoff.types.ts
│       │   ├── Waste.types.ts
│       │   └── Export.types.ts
│       ├── utils/      # Calculation Engines
│       │   ├── materialCalculations.ts # Pure calculation engine
│       │   ├── wasteCalculations.ts    # Pure calculation engine
│       │   ├── csvExport.ts            # Pure calculation engine
│       │   └── takeoffFormatters.ts     # Pure calculation engine
│       └── index.ts    # Feature exports
├── shared/             # Shared resources
│   ├── components/     # Reusable UI components
│   │   ├── Form/       # Form presentation components
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx       # Presentation component
│   │   │   │   ├── Input.module.css # Component styles
│   │   │   │   ├── Input.stories.tsx # Storybook stories
│   │   │   │   └── Input.test.tsx   # Component tests
│   │   │   ├── Select/
│   │   │   │   ├── Select.tsx      # Presentation component
│   │   │   │   ├── Select.module.css # Component styles
│   │   │   │   ├── Select.stories.tsx # Storybook stories
│   │   │   │   └── Select.test.tsx   # Component tests
│   │   │   ├── Checkbox/
│   │   │   │   ├── Checkbox.tsx    # Presentation component
│   │   │   │   ├── Checkbox.module.css # Component styles
│   │   │   │   ├── Checkbox.stories.tsx # Storybook stories
│   │   │   │   └── Checkbox.test.tsx   # Component tests
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx      # Presentation component
│   │   │   │   ├── Button.module.css # Component styles
│   │   │   │   ├── Button.stories.tsx # Storybook stories
│   │   │   │   └── Button.test.tsx   # Component tests
│   │   │   └── FormSection/
│   │   │       ├── FormSection.tsx     # Presentation component
│   │   │       ├── FormSection.module.css # Component styles
│   │   │       ├── FormSection.stories.tsx # Storybook stories
│   │   │       └── FormSection.test.tsx   # Component tests
│   │   ├── Layout/     # Layout components
│   │   │   ├── Container/
│   │   │   │   ├── Container.tsx       # Presentation component
│   │   │   │   ├── Container.module.css # Component styles
│   │   │   │   ├── Container.stories.tsx # Storybook stories
│   │   │   │   └── Container.test.tsx   # Component tests
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx            # Presentation component
│   │   │   │   ├── Card.module.css     # Component styles
│   │   │   │   ├── Card.stories.tsx    # Storybook stories
│   │   │   │   └── Card.test.tsx       # Component tests
│   │   │   ├── Grid/
│   │   │   │   ├── Grid.tsx            # Presentation component
│   │   │   │   ├── Grid.module.css     # Component styles
│   │   │   │   ├── Grid.stories.tsx    # Storybook stories
│   │   │   │   └── Grid.test.tsx       # Component tests
│   │   │   └── Section/
│   │   │       ├── Section.tsx         # Presentation component
│   │   │       ├── Section.module.css  # Component styles
│   │   │       ├── Section.stories.tsx # Storybook stories
│   │   │       └── Section.test.tsx    # Component tests
│   │   └── Feedback/   # User feedback components
│   │       ├── Alert/
│   │       │   ├── Alert.tsx           # Presentation component
│   │       │   ├── Alert.module.css    # Component styles
│   │       │   ├── Alert.stories.tsx   # Storybook stories
│   │       │   └── Alert.test.tsx      # Component tests
│   │       └── Loading/
│   │           ├── Loading.tsx         # Presentation component
│   │           ├── Loading.module.css  # Component styles
│   │           ├── Loading.stories.tsx # Storybook stories
│   │           └── Loading.test.tsx    # Component tests
│   ├── hooks/          # Shared workflow hooks
│   │   ├── useDebounce.ts          # Generic utility hook
│   │   ├── usePrevious.ts          # Generic utility hook
│   │   └── useMediaQuery.ts        # Generic utility hook
│   ├── types/          # Common type definitions
│   │   ├── common.types.ts
│   │   ├── api.types.ts
│   │   ├── form.types.ts
│   │   ├── validation.types.ts
│   │   ├── services.types.ts       # Service interfaces and types
│   │   └── calculation.types.ts    # Calculation engine types
│   ├── utils/          # Shared utilities and logic layers
│   │   ├── validation/           # Validation Services (Zod schemas)
│   │   │   ├── schemaValidators.ts # Centralized Zod schema validation functions
│   │   │   └── rules.ts            # Custom validation rules (if any, not Zod specific)
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── services/             # Domain Services
│   │   │   ├── ProjectService.ts
│   │   │   ├── WallService.ts
│   │   │   └── MaterialTakeoffService.ts
│   │   ├── calculation-engines/  # Pure Calculation Engines
│   │   │   ├── commonCalculations.ts
│   │   │   └── geometryCalculations.ts
│   │   └── persistence/        # Persistence adapters
│   │       ├── localStorage.adapter.ts
│   │       ├── api.adapter.ts
│   │       └── mock.adapter.ts
│   ├── constants/      # Application constants
│   │   ├── buildingCodes.ts
│   │   ├── materialSpecs.ts
│   │   ├── defaultValues.ts
│   │   └── errorMessages.ts
│   └── styles/         # Global styles and theming (CSS Custom Properties for Design Tokens)
│       ├── globals.css
│       ├── variables.css           # Defines CSS Custom Properties (Design Tokens) for themes
│       ├── reset.css
│       └── typography.css
├── app/                 # Application-level concerns
│   ├── providers/      # Context providers
│   │   ├── ProjectProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ErrorBoundary.tsx
│   └── store/          # Zustand state management
│       ├── projectStore.ts           # Normalized project state
│       ├── uiStore.ts                # UI-specific state
│       └── storeTypes.ts             # Global store types
├── assets/             # Static assets
│   ├── icons/          # SVG icons
│   ├── images/         # Image files
│   └── fonts/          # Custom fonts
└── tests/              # Test utilities and setup
    ├── setup.ts
    ├── testUtils.ts
    ├── mocks/
    │   ├── localStorage.ts
    │   ├── persistence.ts     # Mock persistence adapters
    │   └── svg.ts
    └── fixtures/
        ├── sampleWalls.ts
        ├── sampleOpenings.ts
        └── sampleProjects.ts
```