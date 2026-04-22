import type { Todo, FilterType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const emptyMessages: Record<FilterType, string> = {
  all: '할 일을 추가해 보세요!',
  active: '진행 중인 할 일이 없습니다.',
  completed: '완료된 할 일이 없습니다.',
};

export function TodoList({ todos, filter, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return <p className="empty-state">{emptyMessages[filter]}</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
