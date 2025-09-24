# Vue + NestJS Monorepo

A modern monorepo containing a Vue.js frontend and NestJS backend application.

## Project Structure

```
├── apps/
│   ├── frontend/          # Vue.js frontend application
│   └── backend/           # NestJS backend application
├── packages/
│   └── shared/            # Shared utilities and types
├── package.json           # Root package.json with workspace configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Development

```bash
# Run both frontend and backend in development mode
npm run dev

# Run only the backend
npm run dev:backend

# Run only the frontend
npm run dev:frontend
```

### Building

```bash
# Build all applications
npm run build

# Build only the backend
npm run build:backend

# Build only the frontend
npm run build:frontend
```

### Production

```bash
# Start all applications in production mode
npm run start
```

### Other Commands

```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Clean all build artifacts and dependencies
npm run clean
```

## Applications

### Frontend (Vue.js)

- **Location**: `apps/frontend/`
- **Port**: 4200
- **URL**: http://localhost:4200
- **Framework**: Vue 3 with Vite
- **Features**: TypeScript, Router, Pinia, Vitest, ESLint, Prettier

### Backend (NestJS)

- **Location**: `apps/backend/`
- **Port**: 3000
- **URL**: http://localhost:3000
- **Framework**: NestJS
- **Features**: TypeScript, Jest testing, ESLint, Prettier

## Shared Packages

### Shared

- **Location**: `packages/shared/`
- **Purpose**: Common utilities, types, and configurations shared between frontend and backend
- **Features**: TypeScript types, utility functions, API constants

## Quick Start

1. **Install dependencies**:
   ```bash
   npm run install:all
   ```

2. **Start development servers**:
   ```bash
   npm run dev
   ```

3. **Access your applications**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000

## Development Workflow

- **Frontend development**: Edit files in `apps/frontend/src/`
- **Backend development**: Edit files in `apps/backend/src/`
- **Shared code**: Edit files in `packages/shared/src/`
- **Hot reload**: Both frontend and backend support hot reloading in development mode

## Project Features

- ✅ **Monorepo structure** with npm workspaces
- ✅ **Vue 3** frontend with TypeScript and Vite
- ✅ **NestJS** backend with TypeScript
- ✅ **Shared package** for common utilities
- ✅ **Development scripts** for easy workflow
- ✅ **TypeScript** throughout the entire project
- ✅ **Modern tooling** (ESLint, Prettier, Jest, Vitest)
