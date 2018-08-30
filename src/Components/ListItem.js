import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";

const ListItem = props => {
  return (
    <ListGroupItem key={props.index}>
      <Button bsStyle="info" onClick={props.editTodo}>
        U
      </Button>
      {props.item.name}
      <Button className="ml-4" bsStyle="danger" onClick={props.deleteTodo}>
        X
      </Button>
    </ListGroupItem>
  );
};

export default ListItem;
