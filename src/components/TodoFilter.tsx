import type { FilterType } from '../types/todo';

interface Props {
  filter: FilterType;
  activeCount: number;
  completedCount: number;
  onFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const labels: Record<FilterType, string> = {
  all: '전체',
  active: '진행 중',
  completed: '완료',
};

export function TodoFilter({ filter, activeCount, completedCount, onFilter, onClearCompleted }: Props) {
  return (
    <div className="todo-footer">
      <span className="todo-count">{activeCount}개 남음</span>
      <div className="filter-buttons">
        {(Object.keys(labels) as FilterType[]).map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => onFilter(f)}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          완료 삭제
        </button>
      )}
    </div>
  );
}
