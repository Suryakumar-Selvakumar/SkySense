class todo {
  constructor(title, dueDate, priority, description, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completedStatus = false;
    this.project = project;
  }
}

export { todo };
