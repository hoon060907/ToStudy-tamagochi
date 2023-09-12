import React, { useRef } from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, levelUp }) => {
    const { id, text, checked } = todo;
    const item = useRef(null);

    return (
        <div className='TodoListItem'>
            <div className={cn('checkbox', { checked })} ref={item} onClick={() => {
                if(!item.current.classList.contains('checked')){
                    onToggle(id);
                    levelUp();
                }
            }}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className='text'><span>{text}</span></div>
            </div>
            <div className='remove' onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default TodoListItem;