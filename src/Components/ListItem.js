import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import "../App.css";

const ListItem = props => {
  return (
    <ListGroupItem className="todo-item" key={props.index}>
      <span
        style={{
          textDecoration: props.item.isCompleted ? "line-through" : "none"
        }}
      >
        {props.item.name}
      </span>
      <Button
        className="ml-4 delete-btn"
        bsStyle="danger"
        onClick={props.deleteTodo}
      />
      <Button bsStyle="info" className="edit-btn" onClick={props.editTodo} />
      <Button
        bsStyle="info"
        className="complete-btn"
        onClick={props.completeTodo}
      />
    </ListGroupItem>
  );
};

export default ListItem;
