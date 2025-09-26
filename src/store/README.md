# Zustand Store Structure

## Overview

This project uses Zustand for state management. Zustand is a small, fast, and scalable state management solution that uses hooks for consuming state.

## Store Structure

The store is divided into multiple slices for better organization:

### Theme Store (`themeStore.js`)

Manages the application theme (light/dark mode).

```js
const { theme, setTheme, toggleTheme } = useThemeStore();
```

### Property Store (`propertyStore.js`)

Manages property-related state including:
- Featured properties
- City properties
- Search functionality

```js
const { 
  featuredProperties, 
  cityProperties,
  searchProperties 
} = usePropertyStore();
```

### UI Store (`uiStore.js`)

Manages UI-related state including:
- Mobile detection
- Modal states
- Loading states
- Notifications

```js
const { 
  isMobile, 
  isLoginModalOpen,
  showNotification 
} = useUIStore();
```

## Custom Hooks

For easier usage, custom hooks are provided in the `hooks` directory:

### `useTheme`

```js
const { 
  theme,           // Current theme ('light' or 'dark')
  isDarkMode,      // Boolean for dark mode
  setTheme,        // Function to set theme
  toggleTheme,     // Function to toggle theme
  setDarkMode,     // Function to set dark mode
  setLightMode     // Function to set light mode
} = useTheme();
```

### `useProperty`

```js
const { 
  featuredProperties,      // Array of featured properties
  featuredLoading,         // Boolean for loading state
  cityProperties,          // Array of city properties
  searchProperties,        // Function to search properties
  searchResults,           // Array of search results
  clearSearchResults,      // Function to clear search results
  hasFeaturedProperties,   // Boolean if featured properties exist
  hasSearchResults,        // Boolean if search results exist
  isLoading                // Boolean for any loading state
} = useProperty();
```

### `useUI`

```js
const { 
  isMobile,                  // Boolean for mobile detection
  openLoginModal,            // Function to open login modal
  closeLoginModal,           // Function to close login modal
  isPageLoading,             // Boolean for page loading
  showSuccessNotification,   // Function to show success notification
  showErrorNotification      // Function to show error notification
} = useUI();
```

## Usage Examples

### Theme Toggle

```jsx
import { useTheme } from '../hooks';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
```

### Property Display

```jsx
import { useProperty } from '../hooks';

function FeaturedProperties() {
  const { featuredProperties, featuredLoading, fetchFeaturedProperties } = useProperty();
  
  useEffect(() => {
    fetchFeaturedProperties();
  }, [fetchFeaturedProperties]);
  
  if (featuredLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {featuredProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

### Responsive UI

```jsx
import { useUI } from '../hooks';

function ResponsiveComponent() {
  const { isMobile } = useUI();
  
  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {/* Content */}
    </div>
  );
}
```