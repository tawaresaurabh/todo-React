import React from 'react';

import CounterButton from './counterButton';
import TodoInputBox from './todoInputBox';


let id = 0


function TodoItem(props) {
  return (
    <tr>
      <td>{props.todoitem.todoText}</td>
      <td>          
        <span>
        { props.todoitem.status === 'notDone' 
        ?<button className='btn btn-success' onClick={props.onCompleteHandler} >Done</button>
        :<button className='btn btn-warning' onClick={props.onInCompleteHandler}>Not Done</button>
        }          
          <label>/</label>
          <button className='btn btn-danger' onClick={props.onRemovehandler}>Remove</button>
        </span>
      </td>
    </tr>
  )

}



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      sorted : false

    }

    this.addTodoItem = this.addTodoItem.bind(this);
    this.clearAllTodos = this.clearAllTodos.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.sortTodo = this.sortTodo.bind(this);

  }


  addTodoItem(valueFromInputBox, status) {


    this.setState({
      todos: [
        ...this.state.todos, //copies all existing todos to new todo - react paradigm
        { id: id++, todoText: valueFromInputBox, status: status }, //new object added here.
      ]
    })
  }

  removeTodoItem(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    })
  }

  updateTodoItem(id, updatedObject) {
    let index = this.state.todos.findIndex((todo) => todo.id === id)
    this.setState({
      todos: [
        ...this.state.todos.slice(0, index),
        Object.assign({}, this.state.todos[index], updatedObject),
        ...this.state.todos.slice(index + 1)
      ]
    })
  }

  clearAllTodos() {
    console.log('clearing total - ' + this.state.todos.length + ' items')
    this.setState({
      todos: []
    })

  }

  sortTodo() {

    this.setState({
      todos: [...this.state.todos].sort((todoItem1, todoItem2) => {
        let todoItemText1 = todoItem1.todoText.toUpperCase()
        let todoItemText2 = todoItem2.todoText.toUpperCase()

        if (this.state.sorted) {
          if (todoItemText1 > todoItemText2) {
            return -1
          }
          if (todoItemText1 < todoItemText2) {
            return 1
          }        
        } else {
          if (todoItemText1 < todoItemText2) {
            return -1
          }
          if (todoItemText1 > todoItemText2) {
            return 1
          }        
        }
        return 0      
      }),
      sorted: !this.state.sorted,
    }
    )
    
  }


  render() {
    return (
      <div className="container">
        <h2 className="text-center">Todo List</h2>
        <TodoInputBox parentCallbackForAdd={this.addTodoItem} parentCallbackForClear={this.clearAllTodos}></TodoInputBox>
        <CounterButton  buttonText="Todo Count" count={this.state.todos.length} ></CounterButton>	&nbsp;
        <CounterButton buttonText="Open Todo Count" count={this.state.todos.filter(todo => todo.status === 'notDone').length}></CounterButton>	&nbsp;
        <CounterButton  buttonText="Done Todo Count" count={this.state.todos.filter(todo => todo.status === 'done').length}></CounterButton>	&nbsp;


        <div>
          <table className="table table-hover table-fixed" id="todoTableId">
            <thead>
              <tr>
                <th id="todoItemsHeaderId">
                  <button type="button" className="btn btn-link" onClick={this.sortTodo}><b>TodoItems</b></button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="todoTableBodyId">

              {this.state.todos.map(todoItem => (
                <TodoItem key={todoItem.id}
                  todoitem={todoItem}
                  onRemovehandler={() => this.removeTodoItem(todoItem.id)}
                  onCompleteHandler={() => this.updateTodoItem(todoItem.id, { id: todoItem.id, todoText: todoItem.todoText, status: 'done' })}
                  onInCompleteHandler={() => this.updateTodoItem(todoItem.id, { id: todoItem.id, todoText: todoItem.todoText, status: 'notDone' })}
                />
              ))}

            </tbody>
          </table>

        </div>
      </div>

    )


  }
}


export default App;
