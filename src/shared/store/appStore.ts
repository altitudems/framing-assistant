import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// UI State interfaces
interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: unknown;
}

interface ToastState {
  id: string;
  title: string;
  description?: string;
  status: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface AppState {
  // UI State
  modals: Record<string, ModalState>;
  toasts: ToastState[];

  // App Preferences
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';

  // Feature Flags
  features: Record<string, boolean>;

  // Current User Context (when we add auth)
  currentUserId: string | null;
}

interface AppActions {
  // Modal management
  openModal: (id: string, type: string, data?: unknown) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  // Toast management
  addToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;

  // App preferences
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Feature flags
  setFeatureFlag: (feature: string, enabled: boolean) => void;

  // User context
  setCurrentUser: (userId: string | null) => void;
}

type AppStore = AppState & AppActions;

const defaultState: AppState = {
  modals: {},
  toasts: [],
  sidebarCollapsed: false,
  theme: 'system',
  features: {
    // Example feature flags
    enableAdvancedCalculations: true,
    enableExportFeatures: true,
    enableCollaboration: false,
  },
  currentUserId: null,
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,

        // Modal management
        openModal: (id, type, data) =>
          set((state) => ({
            modals: {
              ...state.modals,
              [id]: { isOpen: true, type, data },
            },
          })),

        closeModal: (id) =>
          set((state) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: _, ...rest } = state.modals;
            return { modals: rest };
          }),

        closeAllModals: () => set({ modals: {} }),

        // Toast management
        addToast: (toast) =>
          set((state) => ({
            toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
          })),

        removeToast: (id) =>
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          })),

        clearAllToasts: () => set({ toasts: [] }),

        // App preferences
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

        setTheme: (theme) => set({ theme }),

        // Feature flags
        setFeatureFlag: (feature, enabled) =>
          set((state) => ({
            features: {
              ...state.features,
              [feature]: enabled,
            },
          })),

        // User context
        setCurrentUser: (userId) => set({ currentUserId: userId }),
      }),
      {
        name: 'framing-app-store',
        // Only persist certain parts of the state
        partialize: (state) => ({
          sidebarCollapsed: state.sidebarCollapsed,
          theme: state.theme,
          features: state.features,
          currentUserId: state.currentUserId,
        }),
      },
    ),
    {
      name: 'app-store',
    },
  ),
);

// Selectors for common use cases
export const useModal = (id: string) => useAppStore((state) => state.modals[id]);
export const useToasts = () => useAppStore((state) => state.toasts);
export const useSidebarCollapsed = () => useAppStore((state) => state.sidebarCollapsed);
export const useTheme = () => useAppStore((state) => state.theme);
export const useFeatureFlag = (feature: string) =>
  useAppStore((state) => state.features[feature] ?? false);
export const useCurrentUser = () => useAppStore((state) => state.currentUserId);
