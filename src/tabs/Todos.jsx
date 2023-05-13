import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todoList: [],
  };

  handleAddTodo = text => {
    const { todoList } = this.state;
    const todo = {
      id: nanoid(),
      text,
    };

    const isExist = todoList.find(todo => todo.text === text);

    if (isExist) {
      alert('Todo already exist');
      return;
    }

    this.setState(({ todoList }) => ({
      todoList: [...todoList, todo],
    }));
  };

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }));
  };

  render() {
    const { todoList } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleAddTodo} />
        <Grid>
          {todoList.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                id={id}
                text={text}
                counter={index + 1}
                onClick={this.onDeleteTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
