class project {
  todoList;
  constructor(projectName) {
    this.projectName = projectName;
    this.todoList = [];
  }

  // Adds a todo object to the todoList array
  addTodo(todoItem, index) {
    if (index) {
      this.todoList.splice(index, 1, todoItem);
    } else {
      this.todoList.push(todoItem);
    }
  }

  // Deletes a todo object from the todoList array
  deleteTodo(index) {
    this.todoList.splice(index, 1);
  }
}

export { project };
