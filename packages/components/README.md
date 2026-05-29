# ARB Components

Shared Vue component package for Agenda Rioja Baja.

This package contains reusable UI, layout and feature components consumed by the
web application. Components are developed in Vue, styled with Tailwind CSS, and
documented/tested through Storybook where useful.

## Development

Run the component workspace in Storybook:

```sh
turbo dev --filter=@repo/components
```

Storybook is the main development surface for isolated component work. Use the
web app when a component needs to be checked in its final page context.

## Checks

Run type checks for this package:

```sh
turbo check-types --filter=@repo/components
```

Run linting:

```sh
turbo lint --filter=@repo/components
```

Run tests:

```sh
turbo test --filter=@repo/components
```

Build Storybook:

```sh
turbo build-storybook --filter=@repo/components
```

## Using Components

The package exposes grouped entry points for UI, layout, feature components and
utility modules. Import components through the package exports rather than deep
relative paths.

Example:

```ts
import Button from "@repo/components/ui/Button";
import AppHeader from "@repo/components/features/AppHeader";
```

The shared theme is also exported for consumers that need the package design
tokens:

```css
@import "@repo/components/theme.css";
```

## Notes

- UI and layout components should stay broadly reusable. Feature components may
  encode Agenda Rioja Baja domain concepts, but should receive their data and
  links through props.
- Storybook stories should cover states that are hard to inspect in the app.
- App-specific data fetching, routing and analytics should stay in the app layer
  unless a component only needs passive `data-*` attributes.
