import { useState, type KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('');

  const submit = () => {
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
        autoFocus
      />
      <button onClick={submit} aria-label="추가">
        +
      </button>
    </div>
  );
}
