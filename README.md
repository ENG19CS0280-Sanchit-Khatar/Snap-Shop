# Snap Shop

## Architectural Decisions:
- Pagination: used DummyJSON’s API based pagination to keep DOM lightweight and avoid memory overhead

- Debounce: Search term is debounced to reduce unnecessary API calls.

- Modularity: Components are broken down into smaller and reusable components helps reusability (SearchBar, Product Card)

- Query Parameters: URL is kept as primary source of truth, instead of keeping search terms and active filter categories purely on state, ensures forward/back navigation preserves filters and search term and makes the URL shareable

- Pure Modular CSS Over Utility Libraries: The project avoids heavy utility frameworks like Tailwind CSS in favor of custom, modular CSS files matching each component structure for complete control over design tokens, hover animations, and Amazon-inspired aesthetics.

## Setup instructions:
- Clone: `git clone https://github.com/ENG19CS0280-Sanchit-Khatar/Snap-Shop.git`
- Install: `npm install`
- Run: `npm run dev`
