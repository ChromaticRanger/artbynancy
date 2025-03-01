# Art by Nancy

A Vue.js website showcasing Nancy's artwork collections organized into different categories: Botanicals, Flora, House Portraits, Italy, San Francisco, and Other Roads Travelled.

## Project Overview

Art by Nancy features responsive image galleries with an interactive image carousel for viewing enlarged versions of the artwork. The home page displays a central image montage highlighting pieces from various collections, with a stylized "Art by Nancy" branding element.

## Technology Stack

- Vue 3 with Composition API
- Vue Router for navigation
- Tailwind CSS for styling
- Vite as build tool/bundler
- Pinia for state management

## Features

- Responsive image galleries with grid layout
- Interactive image carousel for viewing larger versions
- Navigation between different artwork collections
- Stylized branding with "Art by Nancy" title and tagline
- Keyboard navigation in image carousel

## Project Structure

- `/src/components` - Reusable Vue components
- `/src/views` - Page components
- `/src/assets` - Static assets and images
- `/src/router` - Vue Router configuration

## Development Setup

### Build Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code with auto-fix
npm run lint

# Format code with Prettier
npm run format
```

## Code Style Guidelines

- **Formatting**: No semicolons, single quotes, 100 character line width
- **Component Structure**: Script setup at top, template in middle, styles at bottom
- **Imports**: Group Vue imports first, then components, then utilities
- **Naming**:
  - Components: PascalCase (e.g., `ImageComponent.vue`)
  - Props: camelCase with type definitions and defaults
  - CSS classes: kebab-case or TailwindCSS utility classes
- **Error Handling**: Use loading/error states for async operations
- **CSS**: Prefer Tailwind utility classes with scoped component styles
- **TypeScript**: Use type definitions for component props
- **State Management**: Use Vue's Composition API with refs and computed properties