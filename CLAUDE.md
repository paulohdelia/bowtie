# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Configure environment variables (first time only)
cp .env.example .env
# Edit .env with the correct webhook URLs

# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Variables

The application uses environment variables for configuration. **Never commit the `.env` file** (it's in `.gitignore`).

**Required variables:**
- `VITE_API_ENDPOINT` - Main webhook URL for BowTie data
- `VITE_API_SPRINTS_ENDPOINT` - Webhook URL for sprints data
- `VITE_CHAT_WEBHOOK_URL` - n8n chat assistant webhook URL

**Optional variables:**
- `VITE_API_CACHE_TTL` - Cache duration in milliseconds (default: 300000)
- `VITE_API_TIMEOUT` - Request timeout in milliseconds (default: 10000)

**Production Build (Easypanel/Docker):**
- All `VITE_*` variables must be configured as **Build Arguments** (not Environment Variables)
- Vite processes these at build time, not runtime
- See `docs/DEPLOY.md` for deployment guide

See `.env.example` for reference.

## Project Overview

**Ferraz Piai BowTie** is a Revenue Operations management application that visualizes the customer journey using a "Bow Tie" funnel concept, from pre-sales to monetization/expansion.

**Core Concepts:**
- **BowTie Visualization**: Visual funnel representing 8 stages of the revenue journey
- **Bottleneck Detection**: Automatically identifies the stage with highest accumulated impact (the "trava")
- **Heatmap System**: Visual gradient based on impact scores (High=3, Medium=2, Low=1)
- **Sprint Planning**: Actions are mapped to sprint cycles for team workflow visualization
- **Default Sprint Filter**: Automatically initializes with current active sprint on app load
- **Table Sorting**: Click any column header to sort data (ascending/descending/reset)
  - Smart sorting for dates, priorities (Impact/Effort), and text
  - Visual indicators show active sort direction
  - See `docs/SORTING_FEATURE.md` for details
- **Smart Reset Button**: Appears only when filters or sorting are active
  - One-click reset to default state
  - Resets all filters (sprint, status, person, micro-steps, stage) and sorting
- **Recommended Actions**: Intelligent prioritization system for backlog actions
  - Highlights top 5 actions with ⭐ star icon in the table
  - Algorithm: Score = Impact - Effort + Bottleneck Bonus (+2 if action is in "trava")
  - Only considers backlog items (unplanned actions)
  - See `docs/RECOMMENDED_ACTIONS.md` for details
- **AI Assistant**: Integrated n8n chat widget with auto-refresh on registration completion
  - Floating button for easy access
  - Conversational problem classification
  - Automatic data refresh when "Registro concluído!" is detected
  - Context preservation during refresh (chat stays open)
  - See `docs/CHAT_INTEGRATION.md` for details

## Architecture

The codebase follows a **modular React architecture** with clear separation of concerns:

```
index.jsx                    # Main app - composition only
src/
├── components/
│   ├── common/             # Reusable UI components
│   │   ├── N8nChat.jsx            # n8n chat widget with auto-refresh
│   │   ├── LoadingSpinner.jsx     # Loading indicator
│   │   ├── ErrorMessage.jsx       # Error display
│   │   └── ...                    # Other common components (badges, etc)
│   ├── layout/             # Structural components (Header, ActionTable)
│   └── bowtie/             # Domain-specific (BowTieStage, BowTieContainer)
├── hooks/                  # Business logic
│   ├── useBowTieData.js           # Data layer with refetch capability
│   ├── useSprintsData.js          # Sprint data and active sprint detection
│   ├── useBowTieCalculations.js   # Score calculations and bottleneck detection
│   ├── useFilters.js              # Filter logic, auto-init with active sprint
│   ├── useSorting.js              # Table sorting logic with multi-type support
│   └── useRecommendedActions.js   # Recommended actions prioritization (top 5)
├── styles/
│   └── n8n-chat-custom.css        # Chat widget customization (brand colors, textarea fix)
├── services/
│   ├── apiService.js              # API calls for BowTie data
│   └── sprintsService.js          # API calls for sprints data
└── utils/
    ├── constants.js               # Configuration (weights, status, categories)
    ├── calculations.js            # Pure functions for score calculations
    └── dataTransformer.js         # API data transformation and normalization
```

**Data Flow:**
1. `useBowTieData()` → provides stages, actions, and `refetch()` function
2. `useSprintsData()` → provides sprints list and active sprint object
3. `useFilters()` → manages sprint/micro-step filters, auto-initializes with active sprint
4. `useBowTieCalculations()` → computes scores and identifies bottleneck
5. `useRecommendedActions()` → calculates top 5 prioritized backlog actions
6. `N8nChat` → detects completion, triggers `refetch()`, preserves chat context
7. Components receive processed data via props

**Chat Auto-Refresh Flow:**
1. User sends problem via chat → n8n processes and responds
2. MutationObserver detects "Registro concluído!" message
3. Triggers `onRegistrationComplete()` callback → calls `refetch()`
4. `refetch()` bypasses cache and fetches fresh data from API
5. React re-renders with new data → table updates, chat stays open

## Critical Business Logic

### Impact Score Calculation
- **Weights**: High=3, Medium=2, Low=1
- **Aggregation**: Sum of all action impacts per stage
- **Heatmap**: `intensity = stageImpactScore / maxImpactScore`
- Located in: `src/utils/calculations.js` and `src/hooks/useBowTieCalculations.js`

### Bottleneck (Trava) Detection
- Identifies the stage with **highest total impact score**
- **Tie-breaker rule**: When multiple stages have the same max score, the **rightmost stage** (closest to monetization) wins
- Implementation uses `>=` comparison to ensure last stage wins in ties
- Only considers actions that are NOT `done` or `cancelled` (in "all sprints" view)

### Filter Rules
- **Sprint Filter**: Shows only actions for selected sprint
  - **Auto-initialization**: Defaults to current active sprint on app load
  - Uses `activeSprint.name` (object property) to set initial value
  - Preserves user's manual filter changes via `useRef` flag
- **"Visão Geral" (All Sprints)**: Excludes `done` and `cancelled` actions from risk calculations (but they appear in table history)
- **Micro-step Filter**: Available only when a stage is active/expanded
- **Status Filter**: Filter by action status (backlog, todo, in_progress, done, cancelled)
- **Person Filter**: Filter by responsible person

## Key Patterns

### Adding New Components
- **Generic/reusable** → `src/components/common/`
- **Layout/structural** → `src/components/layout/`
- **BowTie-specific** → `src/components/bowtie/`

### Adding Business Logic
- **Data fetching** → modify `src/hooks/useBowTieData.js`
- **Calculations/metrics** → add to `src/hooks/useBowTieCalculations.js` or `src/utils/calculations.js`
- **Filtering/state** → extend `src/hooks/useFilters.js`

### Adding Constants
- **Status/categories/weights** → `src/utils/constants.js`
- **Import from utils**, not hardcode

## State Management

Uses **local React state** (useState, useMemo, useRef):
- `activeStage` - which stage is expanded (null = none)
- `selectedSprint` - current sprint filter
- `selectedMicroFilters` - array of active micro-step filters

All state lives in `index.jsx` and flows down via props.

## Data Structure

**Stage Object:**
```javascript
{
  id: string,              // e.g., 'prevenda', 'aquisicao'
  title: string,           // Display name
  height: string,          // Tailwind class (e.g., 'h-80')
  subtitle?: string,       // Optional subtitle
  isKnot?: boolean,        // Special styling flag
  microSteps: [{
    name: string,
    actions: Action[]
  }]
}
```

**Action Object:**
```javascript
{
  id: string,
  status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'cancelled',
  fact: string,            // Problem description
  cause: string,           // Root cause
  action: string,          // Action plan
  responsible: string,
  deadline: string,        // ISO date
  impact: 'Alto' | 'Médio' | 'Baixo',
  effort: 'Alto' | 'Médio' | 'Baixo',
  sprint: string | '',     // Empty string = backlog
  category: 'Pessoas' | 'Processos' | 'Tecnologia'
}
```

## Future Backend Integration

When replacing mocks with API:
1. Modify `src/hooks/useBowTieData.js`
2. Keep the same return structure
3. Use React Query or similar for caching/loading states
4. Backend schema is documented in `docs/dev-docs.md` (section 4)

## Styling

- **Framework**: Tailwind CSS (utility-first)
- **Brand Color**: `#E30613` (Ferraz Piai red)
- **Dark Theme**: Black backgrounds with gray borders
- **Icons**: Lucide React
- **Custom scrollbar**: Defined inline in index.jsx

## Project Documentation

All documentation is organized in the `/docs` folder:

**Active Documentation (docs/):**
- `docs/STAGES_AND_MICROSTEPS.md` - **Official reference** for all 8 stages and 41 micro-steps
- `docs/ARCHITECTURE.md` - Deep dive into patterns and design decisions
- `docs/QUICK_START.md` - Practical guide for adding features
- `docs/SORTING_FEATURE.md` - Table sorting and filter reset functionality guide
- `docs/CHAT_INTEGRATION.md` - n8n chat assistant integration guide (auto-refresh, customization)
- `docs/DEPLOY.md` - Production deployment guide (Easypanel, Docker, Build Arguments)
- `docs/dev-docs.md` - Original technical documentation, includes future backend schema
- `docs/INSTALL.md` - Installation and setup guide
- `docs/API_INTEGRATION.md` - API integration documentation

**AI Agents (agents/):**
- `agents/action-classifier-prompt.md` - GPT-4 system prompt to classify user input into structured BowTie actions
- `agents/README.md` - Index of available AI agents and usage guide

**Archived Documentation (docs/archive/):**
- Historical documentation and temporary debugging files
- `index.old.jsx` - Pre-refactoring backup (767 lines, single file)
- Migration changelogs and refactoring summaries

## Tech Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Chat**: @n8n/chat 1.9.0 (official n8n chat widget)
- **Language**: JavaScript (JSX)
- **Deployment**: Docker + nginx (multi-stage build)

## Notes

- This codebase was recently refactored from a monolithic 767-line file into the current modular structure
- All functionality preserved during refactoring - changes were purely structural
- Uses Vite as the build tool for fast development and HMR (Hot Module Replacement)
- All imports in `index.jsx` use `./src/` prefix since it's in the root directory
