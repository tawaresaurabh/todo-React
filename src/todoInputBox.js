import React from 'react';


class TodoInputBox extends React.Component {

    constructor() {
        super()
        this.state = {
            inputValue: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendDataToTodoList = this.sendDataToTodoList.bind(this)
        this.clearTodoList = this.clearTodoList.bind(this)
    }

    handleChange(event) {        
        this.setState({inputValue: event.target.value})
      }

      sendDataToTodoList(event){        
        //call parent call back funtion here & reset inputvalue.        
        this.props.parentCallbackForAdd(this.state.inputValue,'notDone')
        this.setState({
            inputValue : '',
        })        
        
      }

      clearTodoList(event){
         this.props.parentCallbackForClear()
      }

    


    render() {
        return (
            <div className="form-group">
                <label htmlFor="itemInput">Add Item</label>
                <input type="text" className="form-control"  value={this.state.inputValue} onChange={this.handleChange}/>
                <br></br>
                <button id="addButton" className="btn btn-primary" onClick={this.sendDataToTodoList}>Add</button>	&nbsp;
                <button id="clearButton" className="btn btn-danger" onClick={this.clearTodoList}>Clear List</button>
            </div>
        )

    }



}


export default TodoInputBox;