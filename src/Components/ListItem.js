import React from "react";
import { Button, ListGroupItem, Radio } from "react-bootstrap";
import "../App.css";

const ListItem = props => {
  return (
    <ListGroupItem className="todo-item" key={props.index}>
      <label>
        <input type="checkbox" className="regular-radio" />
        <span
          className="task-title"
          style={{
            textDecoration: props.item.isCompleted ? "line-through" : "none"
          }}
        >
          {props.item.name}
        </span>
      </label>
      <Button
        className="ml-4 delete-btn"
        bsStyle="danger"
        onClick={props.deleteTodo}
      />
      <Button bsStyle="info" className="edit-btn" onClick={props.editTodo} />
    </ListGroupItem>
  );
};

export default ListItem;
