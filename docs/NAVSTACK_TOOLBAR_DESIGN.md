# NavStack Toolbar Management Design

## Problem

When using NavStack, each view can have its own toolbar displayed in the title bar. The current implementation has bugs:

1. **Toolbar from wrong view** - When navigating from View A to View B (which has no toolbar), View A's toolbar still shows
2. **Stale state** - When going back from View B to View A, the toolbar shows stale state (e.g., loading spinner still spinning)
3. **Views interfere** - Hidden views' `useEffect` can re-run and overwrite the active view's toolbar

## Root Cause

- All views in NavStack remain **mounted** (hidden with `display: none`)
- Each view's `useEffect` hooks **keep running** even when hidden
- Toolbar state is captured in closures, leading to stale values
- No clear ownership of which view controls the toolbar

## Solution: Stack-Based Toolbar Management

### Core Concept

Manage toolbars in a **parallel stack** alongside the view stack. Each view's toolbar is tied to its position in the stack:

```
viewStack:    [RootView, DetailView, SubView]
toolbarStack: [RefreshBtn, EditBtn,   null   ]
                                       ^ top (visible)
```

- When a view is **pushed**, a new toolbar slot is added (initially `null`)
- When a view is **popped**, its toolbar slot is also removed
- Only the **top** toolbar is displayed in AppContainer
- Each view can only modify **its own** toolbar slot

### Implementation

#### 1. NavStack State

```tsx
// Inside NavStackProvider
const [viewStack, setViewStack] = useState<NavView[]>([rootView]);
const [toolbarStack, setToolbarStack] = useState<(React.ReactNode | null)[]>([null]);
```

#### 2. NavViewContext (Per-View Context)

Each view is wrapped with a context that knows its stack index:

```tsx
interface NavViewContextValue {
  /** Set toolbar for THIS view only */
  setToolbar: (toolbar: React.ReactNode) => void;
  /** Clear toolbar for THIS view */
  clearToolbar: () => void;
}

const NavViewContext = createContext<NavViewContextValue | null>(null);

export function useNavView(): NavViewContextValue {
  const ctx = useContext(NavViewContext);
  if (!ctx) throw new Error('useNavView must be used within NavStack');
  return ctx;
}
```

#### 3. NavViewProvider (Wraps Each View)

```tsx
function NavViewProvider({ index, children }: { index: number; children: React.ReactNode }) {
  const { updateToolbar, clearToolbarAt, topIndex } = useNavStackInternal();
  
  // Only allow updates if this view is the active (top) view
  const setToolbar = useCallback((toolbar: React.ReactNode) => {
    if (index === topIndex) {
      updateToolbar(index, toolbar);
    }
  }, [index, topIndex, updateToolbar]);
  
  const clearToolbar = useCallback(() => {
    if (index === topIndex) {
      clearToolbarAt(index);
    }
  }, [index, topIndex, clearToolbarAt]);
  
  return (
    <NavViewContext.Provider value={{ setToolbar, clearToolbar }}>
      {children}
    </NavViewContext.Provider>
  );
}
```

#### 4. Rendering Views with NavViewProvider

```tsx
// In NavStackContainer
{viewStack.map((view, index) => (
  <NavViewProvider key={view.id} index={index}>
    <div style={{ display: index === viewStack.length - 1 ? 'flex' : 'none', ... }}>
      {view.component}
    </div>
  </NavViewProvider>
))}
```

#### 5. Push/Pop Operations

```tsx
const push = useCallback((view: NavView) => {
  setViewStack(prev => [...prev, view]);
  setToolbarStack(prev => [...prev, null]); // New view starts with no toolbar
  pushNavInUrl(view.id);
}, []);

const pop = useCallback(() => {
  setViewStack(prev => {
    if (prev.length <= 1) return prev;
    popNavInUrl();
    return prev.slice(0, -1);
  });
  setToolbarStack(prev => prev.slice(0, -1)); // Remove toolbar slot
}, []);
```

#### 6. Sync Top Toolbar to AppContainer

```tsx
useEffect(() => {
  const topToolbar = toolbarStack[toolbarStack.length - 1];
  if (topToolbar) {
    appContext.setToolbar(topToolbar);
  } else {
    appContext.clearToolbar();
  }
}, [toolbarStack, appContext]);
```

### View Usage (After Implementation)

Views become simpler - no ID tracking, no `isActive` checks:

```tsx
// MapListView.tsx
export function MapListView() {
  const { push } = useNavStack();
  const { setToolbar } = useNavView(); // NEW: use NavView context for toolbar
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await mapListStore.refresh();
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Set toolbar - effect re-runs when refreshing changes
  useEffect(() => {
    setToolbar(<RefreshButton onClick={handleRefresh} loading={refreshing} />);
  }, [setToolbar, handleRefresh, refreshing]);

  // ... rest of component
}
```

### Why This Works

| Scenario | Behavior |
|----------|----------|
| View A sets toolbar | Updates `toolbarStack[0]`, syncs to AppContainer |
| Push View B | `toolbarStack` becomes `[A's toolbar, null]`, AppContainer shows `null` (cleared) |
| View B sets toolbar | Updates `toolbarStack[1]`, syncs to AppContainer |
| View A's effect re-runs (hidden) | `setToolbar` is a no-op because `index !== topIndex` |
| Pop View B | `toolbarStack` becomes `[A's toolbar]`, AppContainer shows A's toolbar |
| View A's `refreshing` changes | Effect re-runs, `setToolbar` updates `toolbarStack[0]` with fresh state |

### Key Benefits

1. **No ID tracking** - Views don't need to know or compare their ID
2. **No `isActive` checks** - The context handles this automatically
3. **Automatic cleanup** - Popping removes the toolbar slot
4. **Fresh state on re-activation** - When a dependency changes, the effect re-runs with current state
5. **Hidden views can't interfere** - `setToolbar` is a no-op for non-top views
6. **Simple view code** - Just call `setToolbar()` in an effect

### Migration Path

1. Update `NavStack.tsx` with new implementation
2. Update views to use `useNavView().setToolbar()` instead of `useNavStack().setToolbar()`
3. Remove all `currentViewId` checks from views
4. Remove `currentViewId` from `NavStackContextValue`

### Files to Modify

- `src/components/ui/NavStack.tsx` - Core implementation
- `src/apps/bundles/Maps/MapListView.tsx`
- `src/apps/bundles/Maps/MapDetailView.tsx`
- `src/apps/bundles/MoveActions/MoveActionsList.tsx`
- `src/apps/bundles/PackageUpdater/PackageListView.tsx`
- `src/apps/bundles/PackageUpdater/TaskLogView.tsx`
- `src/apps/bundles/CreateMapApp/MappingTaskListView.tsx`
- `src/apps/bundles/LocalUserManager/UserDetailView.tsx`
