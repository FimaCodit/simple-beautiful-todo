import React, { Component } from "react";
import Header from "./Components/Header";
import { FormControl, Button } from "react-bootstrap";
import ListItem from "./Components/ListItem";
import "./App.css";
import axios from "axios";
import loader from "./loader.gif";

class App extends Component {
  constructor() {
    super();
    this.alert = this.alert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.apiUrl = "https://5b87daa335589600143c14a5.mockapi.io/todos";
  }
  state = {
    newTodo: "",
    editing: false,
    editingIndex: null,
    notification: null,
    loading: true,
    todos: []
  };

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}`);
    console.log(response);
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 1000);
  }

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  async addTodo() {
    const response = await axios.post(`${this.apiUrl}`, {
      name: this.state.newTodo
    });

    console.log(response);
    const todos = this.state.todos;

    todos.push(response.data);
    this.setState({
      todos: todos,
      newTodo: ""
    });
    this.alert("Todo added successfully");
  }
  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = this.state.todos[index];

    await axios.delete(`${this.apiUrl}/${todo.id}`);

    delete todos[index];
    this.setState({
      todos
    });
    this.alert("Todo deleted successfully");
  }
  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }
  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/${todo.id}`, {
      name: this.state.newTodo
    });
    todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({ todos, editing: false, editingIndex: null, newTodo: "" });
    this.alert("Todo updated successfully");
  }
  alert(notification) {
    this.setState({
      notification
    });
    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }
  render() {
    const { todos, newTodo, editing, notification, loading } = this.state;
    return (
      <div className="container">
        <div className="App">
          <Header />
          <div className="form-input">
            <FormControl
              type="text"
              placeholder="Enter text"
              onChange={this.handleChange}
              value={newTodo}
            />
            <br />
            {notification && (
              <div className="alert mt-3 alert-success">
                <p className="text-center">{notification}</p>
              </div>
            )}
            {loading && <img src={loader} alt="" />}
            <Button
              bsSize="large"
              bsStyle="success"
              onClick={!editing ? this.addTodo : this.updateTodo}
              disabled={this.state.newTodo.length < 3}
            >
              {editing ? "Update todo" : "Add todo"}
            </Button>
          </div>
          <br />
          {(!editing || loading) &&
            todos.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  index={index}
                  item={item}
                  todos={todos}
                  editTodo={() => this.editTodo(index)}
                  deleteTodo={() => this.deleteTodo(index)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
