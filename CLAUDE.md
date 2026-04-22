# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Type-check (tsc) then bundle for production
npm run preview  # Preview the production build locally
```

## Architecture

React 18 + TypeScript + Vite single-page TODO app. No routing, no backend — state is persisted to `localStorage`.

### State management

All todo state lives in `src/hooks/useTodos.ts`. It uses `useReducer` with a typed `Action` discriminated union, and syncs to `localStorage` via a `useEffect` on every state change. The hook returns derived values (`filteredTodos`, `activeCount`, `completedCount`) and action dispatchers — components receive only what they need.

### Component tree

```
App
├── TodoInput      — controlled input; calls onAdd on Enter or button click
├── TodoList       — maps filtered todos → TodoItem; shows context-aware empty state
│   └── TodoItem   — checkbox toggle, double-click inline edit, hover-reveal delete
└── TodoFilter     — filter pills (전체 / 진행 중 / 완료) + count + clear-completed
```

`TodoFilter` is only rendered when `totalCount > 0`.

### Types

`src/types/todo.ts` exports `Todo` (id, text, completed, createdAt) and `FilterType` (`'all' | 'active' | 'completed'`).

### Styling

Pure CSS in `src/App.css` — no CSS framework. All styles are global class selectors (`.todo-item`, `.delete-btn`, etc.). The delete button uses an opacity transition and is only visible on `.todo-item:hover`.
