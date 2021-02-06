import React, { useRef, useState, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
      update: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
      update: false,
    };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  const updateCheck = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, update: !todo.update } : todo,
      ),
    );
  }, []);
  
  const onUpdate = useCallback((id, value) => {
    // console.log('값: ', e.target.value);
    console.log('값: ', value);
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, text: value } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onUpdate={onUpdate} updateCheck={updateCheck} />
    </TodoTemplate>
  );
};

export default App;
