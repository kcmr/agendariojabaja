# Agenda Rioja Baja

## Overview

This project is a monorepo that contains multiple packages, including a UI component library and a web application. The UI component library provides reusable components that can be used across different projects, while the web application serves as a demo to showcase the components in action.

## Packages

### UI Component Library

The UI component library is located in the `packages/ui` directory. It contains various components such as `Card` and `Tag`, which are designed to be reusable and customizable. The components are built using Vue.js and are styled with Tailwind CSS.

### Web Application

The web application is located in the `apps/web` directory. It will contain an application that will show the events happening in the Rioja Baja region. The application will utilize the components from the UI library, prioritizing SSR (Server-Side Rendering) for better performance and SEO whenever possible.

## Development

The project is set up with Turborepo, which allows for efficient development and management of multiple packages. Each package can be developed and tested independently, while still being able to share code and dependencies across the monorepo.

### Commands for Development

- `turbo dev`: Runs the development server for the web application and watches for changes in the UI component library.
- `turbo build`: Builds the UI component library and the web application for production.
- `turbo test`: Runs tests for all packages in the monorepo.
- `turbo lint`: Lints the codebase for all packages to ensure code quality and consistency.
- `turbo clean`: Cleans the build artifacts and node_modules for all packages.

## Reference application

There is a file that can be used as a reference for the web application, located at `packages/ui/reference.tsx`. This file contains an example of how the home page should look like, including the components that should be used and the layout of the page. The page is using React, but the components should be implemented in Vue.js, so the structure and design can be used as a guide for the development of the web application.

The Web Application will get the events data from Supabase, which is a backend-as-a-service platform that provides a PostgreSQL database and an API for managing data. The events data will be stored in the Supabase database and can be accessed through the API to display the events on the web application.