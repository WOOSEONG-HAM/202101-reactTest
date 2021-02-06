import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdCreate,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style, updateCheck, onUpdate }) => {
  const { id, text, checked, update, userId } = todo;
  const [value, setValue] = useState(text);

  const onChange = e => {
    setValue(e.target.value);
    onUpdate(id, value);
  }

  const { loginData } = useSelector((state) => state.user);

  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className={cn('TodoListItem', { checked })}>
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          {update ? <input className="text" placeholder={text} onChange={onChange} /> : <div className="text">{text}</div>}
        </div>
        {loginData && loginData.data && loginData.data.userId && loginData.data.userId === userId ?
        (
          <>
            <div className="update" onClick={() => updateCheck(id)}>
              <MdCreate />
            </div>
            <div className="remove" onClick={() => onRemove(id)}>
              <MdRemoveCircleOutline />
            </div>
          </>
        )
        : null
        }
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
