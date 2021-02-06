import React from 'react';
import { useDispatch } from 'react-redux';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  
  const dispatch = useDispatch();
  
  const onClick = () => {
    dispatch({
        type: 'LOG_OUT_REQUEST',
    });
  }
  return (
    <div className="TodoTemplate">
      <div><button onClick={onClick}>로그아웃</button></div>
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
