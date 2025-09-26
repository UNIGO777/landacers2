# Migration Guide: React Context to Zustand

## Overview

This guide explains how to migrate from React Context to Zustand for state management in the LandAcers application.

## Why Zustand?

- **Performance**: Zustand only re-renders components when the specific state they subscribe to changes
- **Simplicity**: No providers, reducers, or complex setup required
- **Flexibility**: Easy to create and combine multiple stores
- **DevTools**: Built-in Redux DevTools support
- **Persistence**: Simple integration with localStorage

## Migration Steps

### 1. Replace Context Providers with Zustand Stores

**Before (React Context):**
```jsx
// ThemeContext.js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

**After (Zustand):**
```jsx
// themeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
```

### 2. Update Component Imports and Usage

**Before (React Context):**
```jsx
import { useTheme } from "./context/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === "dark" ? "dark-bg" : "light-bg"}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

**After (Zustand):**
```jsx
import { useTheme } from "./hooks";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === "dark" ? "dark-bg" : "light-bg"}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### 3. Remove Provider Wrappers

**Before (React Context):**
```jsx
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
```

**After (Zustand):**
```jsx
function App() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <AppContent />
    </div>
  );
}
```

## Best Practices

1. **Use Custom Hooks**: Create custom hooks that wrap store access for better abstraction

2. **Separate Concerns**: Split your store into logical slices (UI, theme, auth, etc.)

3. **Selective Subscriptions**: Only subscribe to the specific state pieces you need

4. **Computed Values**: Use selectors for derived state

5. **Persistence**: Use the persist middleware for state that should survive page refreshes

## Example: Adding a New Store

```jsx
// userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);

// hooks/useAuth.js
import { useUserStore } from '../store';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useUserStore();
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    // Additional helper methods
    isAdmin: user?.role === 'admin',
  };
};
```

## Troubleshooting

### State Updates Not Reflecting

Ensure you're using the setter functions from the store, not local React state:

```jsx
// Incorrect
const [theme, setTheme] = useState('light');

// Correct
const { theme, setTheme } = useThemeStore();
```

### Performance Issues

Make sure you're only subscribing to the specific state pieces you need:

```jsx
// Inefficient - component will re-render on ANY store change
const state = useStore();

// Efficient - component only re-renders when theme changes
const theme = useStore(state => state.theme);
```

## Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Recipes](https://github.com/pmndrs/zustand/blob/main/docs/recipes/README.md)
- [React Query + Zustand](https://tkdodo.eu/blog/react-query-and-zustand) for API state management