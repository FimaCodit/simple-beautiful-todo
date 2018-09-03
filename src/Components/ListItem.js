import React from "react";
import { ListGroupItem } from "react-bootstrap";
import "../App.css";

const ListItem = props => {
  return (
    <ListGroupItem className="todo-item" key={props.index}>
      <label>
        <input
          id="rInput"
          checked={props.item.isCompleted}
          type="checkbox"
          onChange={event => props.completeTodo(props.index, event)}
          className="regular-radio"
        />
        <span
          className="task-title"
          style={{
            textDecoration: props.item.isCompleted ? "line-through" : "none"
          }}
        >
          {props.item.name}
        </span>
      </label>

      <i
        class="fas fa-trash"
        className=" delete-btn"
        onClick={props.deleteTodo}
      />
      <i class="fas fa-edit" className="edit-btn" onClick={props.editTodo} />
    </ListGroupItem>
  );
};

export default ListItem;
