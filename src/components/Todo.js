import React from "react";

export default function Todo( props ) {

  return (
    <div className="list-item">
      <div className="list">
        <input
            className="checkbox"
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
      </div>  
      <button
        type="button"
        className="delete-button"
        onClick={() => props.deleteTask(props.id)}
      >
        Delete
      </button>
    </div>
  )
}