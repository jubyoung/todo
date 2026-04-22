import { useReducer, useEffect } from 'react';
import type { Todo, FilterType } from '../types/todo';

type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'EDIT'; id: string; text: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; filter: FilterType };

interface State {
  todos: Todo[];
  filter: FilterType;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            text: action.text.trim(),
            completed: false,
            createdAt: Date.now(),
          },
        ],
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id),
      };
    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, text: action.text.trim() } : t
        ),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
  }
}

const STORAGE_KEY = 'todo-app-state';

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    // ignore parse errors
  }
  return { todos: [], filter: 'all' };
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const filteredTodos = state.todos.filter(t => {
    if (state.filter === 'active') return !t.completed;
    if (state.filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = state.todos.filter(t => !t.completed).length;
  const completedCount = state.todos.filter(t => t.completed).length;

  return {
    todos: filteredTodos,
    filter: state.filter,
    totalCount: state.todos.length,
    activeCount,
    completedCount,
    addTodo: (text: string) => dispatch({ type: 'ADD', text }),
    toggleTodo: (id: string) => dispatch({ type: 'TOGGLE', id }),
    deleteTodo: (id: string) => dispatch({ type: 'DELETE', id }),
    editTodo: (id: string, text: string) => dispatch({ type: 'EDIT', id, text }),
    clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' }),
    setFilter: (filter: FilterType) => dispatch({ type: 'SET_FILTER', filter }),
  };
}
