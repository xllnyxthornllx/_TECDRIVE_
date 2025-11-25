# TecDrive - Cloud Storage Platform

## Overview

TecDrive is a private cloud storage solution similar to Google Drive, Dropbox, and OneDrive. The platform emphasizes data privacy, user control, and enterprise-grade security while providing a clean, professional SaaS interface. Users can upload files, organize them in folders, and access their data from any device through a modern web dashboard.

The application is built as a full-stack TypeScript project with a React frontend, Express backend, and PostgreSQL database. It uses Replit's authentication system and provides both free and paid subscription tiers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, bundled with Vite for development and production builds.

**UI Component Library**: Radix UI primitives wrapped with shadcn/ui components, providing accessible, unstyled components that are customized with Tailwind CSS. This approach was chosen for flexibility, accessibility compliance, and design consistency across the application.

**Routing**: wouter (lightweight client-side router) instead of React Router, minimizing bundle size while providing declarative routing.

**State Management**: 
- TanStack Query (React Query) for server state management, caching, and synchronization
- React Context for theme management (light/dark mode)
- Local component state for UI interactions

**Styling**: 
- Tailwind CSS with custom design system tokens defined in CSS variables
- Theme system supporting light and dark modes with localStorage persistence
- Custom utility classes for elevation effects (hover-elevate, active-elevate)

**Design System**: Corporate blue primary color scheme with neutral grays, following Google Drive/Dropbox aesthetic. The design uses an 8px spacing scale and consistent border radius values.

### Backend Architecture

**Server Framework**: Express.js with TypeScript for type safety and modern JavaScript features.

**Authentication**: Replit's OpenID Connect (OIDC) authentication via Passport.js strategy. This eliminates the need for custom user registration/login flows and leverages Replit's secure authentication infrastructure.

**Session Management**: 
- Express sessions stored in PostgreSQL using connect-pg-simple
- 7-day session TTL with HTTP-only, secure cookies
- Session data includes user claims, access tokens, and refresh tokens

**API Design**: RESTful endpoints under `/api/*` prefix:
- `/api/auth/user` - Get authenticated user details
- `/api/files/*` - File CRUD operations
- `/api/folders/*` - Folder CRUD operations
- `/api/upgrade-plan` - Subscription management

**Request Handling**:
- JSON body parsing with raw body preservation for webhook verification
- Request/response logging with timing information for debugging
- Error handling with appropriate HTTP status codes

**Development vs Production**:
- Development mode uses Vite middleware for hot module replacement
- Production serves pre-built static assets from dist/public
- Separate entry points (index-dev.ts, index-prod.ts) handle environment-specific concerns

### Data Storage

**Database**: PostgreSQL (Neon serverless) accessed via WebSocket connections for serverless compatibility.

**ORM**: Drizzle ORM chosen for:
- Type-safe database queries with TypeScript inference
- Lightweight runtime with minimal overhead
- SQL-first approach allowing direct schema definition
- Automatic schema-to-Zod validation generation

**Schema Design**:

- `users` table: Stores user profile data (email, name, profile image) and plan type (user_free or user_basic). The ID is provided by Replit Auth.

- `files` table: Stores file metadata including filename, size, MIME type, owner reference, optional folder reference, and soft-delete/favorite flags. File content is referenced via pathOrUrl field (implementation supports both filesystem paths and cloud URLs).

- `folders` table: Hierarchical folder structure with parent folder references for nested organization. Each folder belongs to a user and can contain other folders or files.

- `sessions` table: Stores Express session data with expiration timestamps, indexed for efficient cleanup.

**Relationships**:
- Users have many files and folders (one-to-many)
- Folders can contain files and other folders (self-referential hierarchy)
- Cascade deletes ensure data integrity when users or folders are removed

**Migration Strategy**: Drizzle Kit manages schema migrations in the `/migrations` directory. The `db:push` script synchronizes schema changes to the database.

### File Storage Strategy

The current implementation stores file metadata in PostgreSQL with a `pathOrUrl` field that can reference either:
- Local filesystem paths (for development/testing)
- Cloud storage URLs (for production deployment)

The actual file upload and storage mechanism is designed to be pluggable, allowing integration with services like AWS S3, Google Cloud Storage, or Azure Blob Storage.

### Authentication Flow

1. User clicks "Iniciar sesión" or "Comenzar ahora"
2. Redirect to `/api/login` which initiates Replit OIDC flow
3. User authenticates with Replit
4. Callback to `/api/auth/callback` with authorization code
5. Exchange code for tokens, extract user claims
6. Upsert user record in database
7. Create session and redirect to dashboard
8. Protected routes check session via `isAuthenticated` middleware

### Plan Management

**Free Plan (user_free)**:
- Default tier for all new users
- Limited storage quota (not enforced in current schema)
- Access to core features

**Basic Plan (user_basic)**:
- S/ 35 per month
- 5GB storage
- Full dashboard access
- Upgrade flow redirects to `/upgrade-plan` page
- Plan change updates user record via `/api/upgrade-plan` endpoint

The payment processing is designed as a placeholder - production implementation would integrate with payment providers like Stripe or PayPal.

### Client-Side Routing

**Public Routes**:
- `/` - Landing page with hero, features, team section
- `/about` - Company mission, vision, team bios
- `/pricing` - Plan details and pricing
- `/faq` - Frequently asked questions with accordions
- `/contact` - Contact form (frontend-only, no backend integration)

**Protected Routes**:
- `/home` - User dashboard summary with statistics
- `/dashboard` - Full file/folder management interface
- `/upgrade-plan` - Subscription upgrade flow

Protected routes use a `PrivateRoute` component wrapper that checks authentication status and displays loading states or login prompts for unauthenticated users.

## External Dependencies

### Authentication & Session Management
- **Replit Auth (OpenID Connect)**: Primary authentication provider, eliminating need for custom user management
- **Passport.js with openid-client**: OIDC client implementation
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Database & ORM
- **Neon Serverless PostgreSQL**: Managed PostgreSQL with WebSocket support for serverless environments
- **Drizzle ORM**: Type-safe database queries and schema management
- **drizzle-zod**: Automatic Zod schema generation from Drizzle tables

### Frontend Libraries
- **React & React DOM**: UI rendering
- **wouter**: Lightweight routing
- **TanStack Query**: Server state management and caching
- **Radix UI**: Unstyled, accessible component primitives (40+ components)
- **shadcn/ui**: Pre-styled Radix components with Tailwind CSS
- **Tailwind CSS**: Utility-first styling
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library

### Build Tools & Development
- **Vite**: Fast development server and production bundler
- **esbuild**: Server-side TypeScript bundling
- **TypeScript**: Type safety across frontend and backend
- **PostCSS & Autoprefixer**: CSS processing

### Utilities
- **date-fns**: Date formatting and manipulation
- **nanoid**: Unique ID generation for cache busting
- **memoizee**: Function memoization for OIDC config caching

### Replit-Specific Plugins
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation
- **@replit/vite-plugin-dev-banner**: Development environment indicator

### API & Data Validation
- **Zod**: Runtime schema validation
- **@hookform/resolvers**: Form validation integration

All external services (database, authentication) are configured via environment variables (`DATABASE_URL`, `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`) making the application environment-agnostic and easy to deploy.