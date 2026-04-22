import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import './App.css';

function App() {
  const {
    todos,
    filter,
    totalCount,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  return (
    <div className="app">
      <div className="card">
        <h1>할 일 목록</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {totalCount > 0 && (
          <TodoFilter
            filter={filter}
            activeCount={activeCount}
            completedCount={completedCount}
            onFilter={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
