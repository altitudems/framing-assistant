import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UndoAction {
  id: string;
  type: 'project' | 'wall' | 'opening';
  action: 'create' | 'update' | 'delete';
  data: unknown;
  timestamp: number;
}

interface UndoState {
  actions: UndoAction[];
  maxActions: number;
}

interface UndoActions {
  addAction: (action: Omit<UndoAction, 'id' | 'timestamp'>) => void;
  undoAction: (id: string) => UndoAction | null;
  clearActions: () => void;
  clearActionsByType: (type: UndoAction['type']) => void;
}

type UndoStore = UndoState & UndoActions;

export const useUndoStore = create<UndoStore>()(
  devtools(
    (set, get) => ({
      actions: [],
      maxActions: 10,

      addAction: (action) =>
        set((state) => {
          const newAction: UndoAction = {
            ...action,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          };

          // Keep only the most recent actions
          const actions = [newAction, ...state.actions].slice(0, state.maxActions);

          return { actions };
        }),

      undoAction: (id) => {
        const action = get().actions.find((a) => a.id === id);
        if (action) {
          set((state) => ({
            actions: state.actions.filter((a) => a.id !== id),
          }));
        }
        return action || null;
      },

      clearActions: () => set({ actions: [] }),

      clearActionsByType: (type) =>
        set((state) => ({
          actions: state.actions.filter((action) => action.type !== type),
        })),
    }),
    {
      name: 'undo-store',
    },
  ),
);

// Selectors
export const useUndoActions = () => useUndoStore((state) => state.actions);
export const useRecentUndoAction = (type?: UndoAction['type']) =>
  useUndoStore((state) => {
    const actions = type ? state.actions.filter((action) => action.type === type) : state.actions;
    return actions[0] || null;
  });
