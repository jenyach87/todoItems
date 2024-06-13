var ToDoItem = React.createClass({
  
  getInitialState: function() {
    return {
      todoItems: []
    };
  },
  
  componentWillMount: function() {
    console.log('componentWillMount' + this.props.todoItems);
  },
  
  componentDidMount: function() {
    console.log('componentDidMount' + this.props.todoItems);
  },
  
  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({ todoItems: nextProps.todoItems });
  },
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return nextState.todoItems.length != 9;
  },
  
  componentWillUpdate: function() {
    console.log('componentWillUpdate' + this.props.todoItems);
  },
  
  componentDidUpdate: function() {
    console.log('componentDidUpdate' + this.props.todoItems);
  },
  
  componentWillUnmount: function() {
    console.log('componentWillUnmount');
  },
  
  render: function() {
    var todoList = this.state.todoItems.map(function(row, i) {
      return (
        <tr key={i}>
          <td>{row.No}</td>
          <td>
            <img 
              className="img"
              src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/32x32/plain/checkbox.png" 
              alt="Checkbox Icon"
            />
            {row.todo}
          </td>
        </tr>  
      );
    });
      
    return <tbody>{todoList}</tbody>;
  }
});

var ToDoList = React.createClass({
  
  getInitialState: function() {
    return {
      todoItems: [],
      todoText: 'Enter todo text'
    }; 
  },
  
  componentDidMount: function() { 
    var $this = this;
    $.ajax({
      url: './ThingsToDo.json',
      type: 'GET',
      dataType: "json",
      success: function(data) {
        data.push({ No: 11, todo: "Hello Jeff", marked: "No" });
        $this.setState({ todoItems: data });
      },
      error: function(status, xhr, err) {
        console.log(err);
      }
    });
  },
  
  todoText: function(e) {
    this.setState({ todoText: e.target.value });
  },
  
  addTodo: function() {
    var todoItems = this.state.todoItems;
    todoItems.push({ No: this.state.todoItems.length + 1, todo: this.state.todoText });
    this.setState({ todoItems: todoItems });
  },
  
  render: function() {
    return (
      <div className="ToDoList">
        Hello, world! I am a ToDoList.
        <br/>
        <input type='text' value={this.state.todoText} onChange={this.todoText} />
        <input type='button' value='Submit' onClick={this.addTodo} />
      
        <table style={{ border: '1px solid black' }}>
          <ToDoItem todoItems={this.state.todoItems} />
        </table>
        Number of ToDos: {this.state.todoItems.length} 
      </div>
    );
  }
});  
  
ReactDOM.render(
  <ToDoList />,
  document.getElementById('example')
);
