# Art by Nancy - Development Guide

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

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

## Project Structure
- `/src/components` - Reusable Vue components
- `/src/views` - Page components
- `/src/assets` - Static assets and images
- `/src/router` - Vue Router configuration
